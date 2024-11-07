import { $sidebar } from './SideBar.state'
import { $auth } from '../stores/auth'
import './SideBar.styles.css'
import Spacer from 'react-spacer'
import { Earth, Settings, ShoppingCart, Users, User2Icon } from 'lucide-react'
import { SideBarSettingsPanel, SideBarVisitorsPanel, SideBarSpacePanel, SideBarAccountPanel } from './SideBarPanels'
import { SideBarShopPanel } from './SideBarShopPanel'
import { Flow } from './Flow'

export const SideBar = () => {
  const isOpen = $sidebar.isOpen.use()

  return (
    <Flow isRow className="SideBar">
      <Flow isColumn gap="24px" className="IconBar">
        <Flow isColumn gap="8px" className="Section">
          <SectionItem name="space" />
          <SectionItem name="shop" />
          <SectionItem name="visitors" />
        </Flow>
        <Spacer grow={1} />
        <Flow isColumn className="Section" wrap="wrap">
          <SectionItem name="settings" />
          <SectionItem name="account" />
        </Flow>
      </Flow>
      {isOpen && (
        <>
          <SideBarShopPanel />
          <SideBarAccountPanel />
          <SideBarSettingsPanel />
          <SideBarSpacePanel />
          <SideBarVisitorsPanel />
        </>
      )}
    </Flow>
  )
}

const onIconClick = (name) => {
  return () => {
    const isOpen = $sidebar.isOpen.state
    const isNameActive = $sidebar.activeMenuName.state === name

    if (isOpen && isNameActive) {
      $sidebar.isOpen.set(false)
      $sidebar.activeMenuName.set('')
      return
    }

    if (isOpen && !isNameActive) {
      $sidebar.isOpen.set(true)
      $sidebar.activeMenuName.set(name)
      return
    }

    $sidebar.isOpen.set(true)
    $sidebar.activeMenuName.set(name)
  }
}

const ICONS_MAP = {
  space: () => <Earth className="SideBarIcon" />,
  shop: () => <ShoppingCart className="SideBarIcon" />,
  visitors: () => <Users className="SideBarIcon" />,
  settings: () => <Settings className="SideBarIcon" />,
  account: () => <User2Icon className="SideBarIcon" />
}

const SectionItem = (props) => {
  const activeMenuName = $sidebar.activeMenuName.use()
  const isActive = activeMenuName === props.name
  const Icon = ICONS_MAP[props.name]
  const handleIconClick = onIconClick(props.name)
  const isActiveClass = isActive ? 'active' : ''
  const className = `SectionItem ${props.name} ${isActiveClass}`
  const color = isActive ? '#12211a' : '#2b262d'

  return (
    <Flow
      iconRight={Icon}
      auto
      scale={0.7}
      className={className}
      onClick={handleIconClick}
      style={{ color: color, width: 48, height: 48 }}
    >
      <Icon />
    </Flow>
  )
}
