import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

const getArtistByAuthId = async (authId: string) => {
  const { data, error } = await supabase.from('artists').select().eq('aio', authId).single()
  return [error, data]
}

export const getArtist = async (artistId: string) => {
  const { data, error } = await supabase.from('artists').select().eq('id', artistId).single()
  return [error, data]
}

export const getArtists = async (artistIds: string[]) => {
  const { data, error } = await supabase.from('artists').select().in('id', artistIds)

  return [error, data]
}

export const searchModels = async (params: { query?: string; category?: string; tags?: string[] }) => {
  let query = supabase.from('models').select()

  if (params.query) {
    query = query.ilike('name', `%${params.query}%`)
  }

  if (params.category) {
    query = query.contains('categories', [params.category])
  }

  if (params.tags && params.tags.length > 0) {
    query = query.contains('tags', params.tags)
  }

  const { data, error } = await query
  return [error, data]
}

export const getSpace = async (spaceId: string) => {
  const { data, error } = await supabase.from('spaces').select().eq('id', spaceId).single()
  return [error, data]
}

export const getSpaceItems = async (spaceId: string) => {
  const { data, error } = await supabase.from('items').select().eq('space_id', spaceId)
  return [error, data]
}

export const uploadModel = async (id: string, file: File) => {
  const { data, error } = await supabase.storage.from('models').upload(`${id}.gltf`, file)
  return [error, data]
}

type ModelDataT = Database['public']['Tables']['models']['Insert']

export const createModel = async (modelData: ModelDataT) => {
  const { data, error } = await supabase.from('models').insert(modelData).select().single()
  return [error, data]
}

const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const batchInsertModels = async (modelsData: ModelDataT[], batchSize: number = 100) => {
  for (let i = 0; i < modelsData.length; i += batchSize) {
    const batch = modelsData.slice(i, i + batchSize)
    const { data, error } = await supabase.from('models').insert(batch)
    await wait(1000)
    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
      throw error
    } else {
      console.log(`Successfully inserted batch ${i / batchSize + 1}`)
      console.log({ data })
    }
  }
}

type ItemDataT = Database['public']['Tables']['items']['Insert']

export const createItem = async (itemData: ItemDataT) => {
  const { data, error } = await supabase.from('items').insert(itemData).select().single()
  return [error, data]
}

// Additional useful functions for your game

export const getModelById = async (modelId: string) => {
  const { data, error } = await supabase.from('models').select().eq('id', modelId).single()
  return [error, data]
}

export const deleteItem = async (itemId: string) => {
  const { data, error } = await supabase.from('items').delete().eq('id', itemId)
  return [error, data]
}

export const getModelFileUrl = (fileName: string) => {
  const { data } = supabase.storage.from('models').getPublicUrl(fileName)
  return data.publicUrl
}

export const updateItemPosition = async (itemId: string, position: { x: number; y: number; z: number }) => {
  const { data, error } = await supabase
    .from('items')
    .update({
      position_x: position.x,
      position_y: position.y,
      position_z: position.z
    })
    .eq('id', itemId)
    .select()
    .single()
  return [error, data]
}

export const createArtist = async (artistData: { name: string; aio: string; avatar?: string; about?: string }) => {
  const { data, error } = await supabase.from('artists').insert(artistData).select().single()
  return [error, data]
}

export const updateArtist = async (
  artistId: string,
  updates: {
    name?: string
    avatar?: string
    about?: string
  }
) => {
  const { data, error } = await supabase.from('artists').update(updates).eq('id', artistId).select().single()
  return [error, data]
}

export const updateItem = async (itemId: string, updates: Partial<Database['public']['Tables']['items']['Update']>) => {
  const { data, error } = await supabase.from('items').update(updates).eq('id', itemId).select().single()
  return [error, data]
}

export const updateSpace = async (
  spaceId: string,
  updates: {
    name?: string
    about?: string
    thumbnail?: string
  }
) => {
  const { data, error } = await supabase.from('spaces').update(updates).eq('id', spaceId).select().single()
  return [error, data]
}

export const tempDeleteModelFromBucket = async (id: string) => {
  try {
    // Assuming the file name in the bucket is "{id}.gltf"
    const fileName = `${id}.gltf`

    const { data, error } = await supabase.storage.from('models').remove([fileName])

    if (error) {
      throw error
    }

    console.log(`File ${fileName} successfully deleted from the models bucket.`)
    return { success: true, data }
  } catch (error) {
    console.error('Error deleting file from models bucket:', error)
    return { success: false, error }
  }
}

export const api = {
  tempDeleteModelFromBucket,
  getArtistByAuthId,
  getArtist,
  getArtists,
  searchModels,
  getSpace,
  getSpaceItems,
  uploadModel,
  createModel,
  createItem,
  getModelById,
  deleteItem,
  getModelFileUrl,
  updateItemPosition,
  batchInsertModels,
  createArtist,
  updateArtist,
  updateItem,
  updateSpace
}
