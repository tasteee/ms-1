type DocumentId = string // 32 characters
type NameT = string // 3-32 characters, always required.
type DescriptionT = string // 0-1024 characters, defaults to ''
type PercentageT = number
type UnitT = number // 1 unit = 3 feet (36 inches)
type UrlT = string

export type ArtistT = {
  id: DocumentId
  name: NameT
  about: string
  avatar: UrlT
  aio: string
  recentSpaces?: SpaceT[]
}

type SpaceT = {
  id: DocumentId
  name: NameT
  about?: string
  thumbnail?: UrlT
  artists: ArtistT[]
  color: string // default #16f1a1
  tags: string[] // default []
  categories: string[] // default []
  spawnPositionX: number // default 64
  spawnPositionY: number // default 0
  spawnPositionZ: number // default 64
  width: number // min 32, max 256, default 128
  height: number // min 12, max 64, default 32
  depth: number // min 32, max 256, default 128
  visitorCount: number // default 0
  gravity: number // min 1 max 100, default 50
}

type ModelT = {
  id: DocumentId
  name: NameT
  about: string
  thumbnail?: UrlT
  file: UrlT
  artists: ArtistT[]
  isGlowing: boolean
  glowColor: string // default #ffffff
  glowIntensity: number // default 1
  glowRadius: number // default 1
  glowPositionX: number // default 0
  glowPositionY: number // default 0
  glowPositionZ: number // default 0
  sizeX: UnitT
  sizeY: UnitT
  sizeZ: UnitT
  scaleX: number
  scaleY: number
  scaleZ: number
  colors: string[]
  categories: string[]
  tags: string[]
  mass: number
  instanceCount: number
  deletedInstanceCount: number
  isObstructive: boolean
}

type Item = {
  id: DocumentId
  name: NameT
  about: string
  origin: ModelT
  file: UrlT
  space: SpaceT
  sizeX: UnitT
  sizeY: UnitT
  sizeZ: UnitT
  positionX: number
  positionY: number
  positionZ: number
  rotationX: PercentageT
  rotationY: PercentageT
  rotationZ: PercentageT
  scaleX: number
  scaleY: number
  scaleZ: number
  isGlowing: boolean
  glowColor: string
  glowIntensity: number
  glowRadius: number
  glowPositionX: number
  glowPositionY: number
  glowPositionZ: number
  colors: string[]
  isObstructive: boolean
}
