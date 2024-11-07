import { Route, Switch } from 'wouter'
import { SideBar } from './components/SideBar'
import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Game } from './game/Game'
import { CreateModelButton } from './components/CreateModelButton'
import { Theme } from '@radix-ui/themes'
import { $auth } from './stores/auth'
import { batchInsertModels } from './stores/supabase'
import models from './models.json'
import { useEffect, useRef } from 'react'

console.log(batchInsertModels)
console.log($auth)
globalThis.batch = () => batchInsertModels(models, 45)

function App() {
  $auth.useSession()
  console.log('render App')

  return (
    <>
      <Game />
      <SideBar />
    </>
  )
}

export default App
