import { Session, User, SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { useEffect, useRef } from 'react'
import { datass } from '../modules/datass'
import { api, supabase } from './supabase'
import { ArtistT } from '@/types/global'

const artist = datass.object<ArtistT>({ id: '', name: '', about: '', avatar: '', aio: '' })
const user = datass.object<User | null>(null)
const session = datass.object<Session | null>(null)
const isAuthenticated = datass.boolean(false)

type SignUpOptionsT = {
  email: string
  password: string
  name: string
  about: string
  avatar: string
}

// { email: "foo@bar.com", password: "Yellow12293!", name: 'sarri', about: "its me, sarri!", avatar: "https://livewiredemos.com/images/avatar.png"}

async function signUp(options: SignUpOptionsT) {
  const { data, error } = await supabase.auth.signUp({
    email: options.email,
    password: options.password
  })

  if (error) throw error
  user.set(data.user)
  isAuthenticated.set(!!data.user)

  const [createError, createData] = await api.createArtist({
    name: options.name,
    about: options.about,
    avatar: options.avatar,
    aio: data.user?.id
  })

  console.log({ createError, createData })
  if (createError) throw createError
  artist.set(createData)
}

async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error
  user.set(data.user)
  isAuthenticated.set(!!data.user)
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  user.set(null)
  isAuthenticated.set(false)
}

async function handleSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    session.set(data.session)
    user.set(data.session?.user ?? null)
    isAuthenticated.set(!!data.session)

    const [getError, getData] = await api.getArtistByAuthId(data.session?.user?.id)
    console.log({ getError, getData })
    if (getError) throw getError
    artist.set(getData)

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.set(_session)
      user.set(_session?.user ?? null)
      isAuthenticated.set(!!_session)
    })
  } catch (error) {
    console.error('Error handling session:', error)
  }
}

function useSession() {
  const hasDone = useRef(false)

  useEffect(() => {
    if (hasDone.current) return
    handleSession()
    hasDone.current = true
  }, [])
}

export const $auth = {
  isAuthenticated,
  session,
  user,
  artist,
  signUp,
  signIn,
  signOut,
  useSession
}

globalThis.auth = $auth
