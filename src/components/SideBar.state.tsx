import { useRef } from 'react'
import { datass } from '../modules/datass'
import React from 'react'

// all datass stores are reactive for components/hooks.
// they come with .use(selector?), .set(value) and .state
// which returns the current value.

const activeMenuName = datass.string('home')
const isOpen = datass.boolean(true)
// datass.boolean stores have a .toggle() method
// built in.

export const $sidebar = {
  activeMenuName,
  isOpen
}
