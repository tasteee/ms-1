import { SearchIcon, XIcon } from 'lucide-react'
import './SideBarPanels.styles.css'
import { $sidebar } from './SideBar.state'
import { Flow } from './Flow'
import { ModelPreview } from './ModelPreview'
import styled from '@emotion/styled'

export const SideBarPanel = (props) => {
  const isOpen = $sidebar.isOpen.use()
  if (!isOpen) return null

  const closeSideBar = () => {
    $sidebar.isOpen.toggle()
    $sidebar.activeMenuName.set('')
  }

  return (
    <Flow isColumn width="300px" className="SideBarPanel">
      <Flow isColumn>
        <Flow isRow justify="between" width="100%">
          <h4>{props.title}</h4>
          <Flow auto scale={0.5} onClick={closeSideBar} icon={<XIcon />} />
        </Flow>
        {props.headerAccessory}
      </Flow>
      <Flow isColumn>{props.children}</Flow>
    </Flow>
  )
}

export const SideBarAccountPanel = (props) => {
  const isActive = $sidebar.activeMenuName.use() === 'account'
  if (!isActive) return null
  return <SideBarPanel title="Account" />
}

export const SideBarSettingsPanel = (props) => {
  const isActive = $sidebar.activeMenuName.use() === 'settings'
  if (!isActive) return null
  return <SideBarPanel title="Settings" />
}

export const SideBarSpacePanel = (props) => {
  const isActive = $sidebar.activeMenuName.use() === 'space'
  if (!isActive) return null
  return <SideBarPanel title="Space" />
}

export const SideBarVisitorsPanel = (props) => {
  const isActive = $sidebar.activeMenuName.use() === 'visitors'
  if (!isActive) return null
  return <SideBarPanel title="Visitors" />
}
