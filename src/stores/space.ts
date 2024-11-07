import { datass } from '../modules/datass'
import identify from 'unique-string'

const items = datass.array([])
const selectedItemIds = datass.array<string>([])

const details = datass.object({
  id: '',
  name: '',
  about: '',
  thumbnail: '',
  artists: []
})

const addItem = (item: any) => {
  const id = identify()
  const newItem = { ...item, id }
  const currentItems = items.state
  const newItems = [...currentItems, newItem]
  items.set(newItems)
}

export const $space = {
  details,
  selectedItemIds,
  items,
  addItem
}
