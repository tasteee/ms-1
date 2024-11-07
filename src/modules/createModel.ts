interface InputData {
  id: string
  name: string
  modelName: string
  localPos: string
  localSize: string
  scale: number
  color: string
  size: { x: number; y: number; z: number }
  renderSpec: {
    glowThresh: number
    glowIntensity: number
  }
}

interface ModelInsert {
  id?: string
  name: string
  about: string
  thumbnail?: string
  file: string
  artist?: string
  artist_ids: string[]
  is_glowing: boolean
  glow_color: string
  glow_intensity: number
  glow_radius: number
  glow_position_x: number
  glow_position_y: number
  glow_position_z: number
  size_x: number
  size_y: number
  size_z: number
  scale_x: number
  scale_y: number
  scale_z: number
  colors: string[]
  categories: string[]
  tags: string[]
  mass?: number
  instance_count?: number
  deleted_instance_count?: number
  is_obstructive: boolean
}

export function createModel(inputData: InputData): ModelInsert {
  // const [size_x, size_y, size_z] = inputData.localSize.split(', ').map(Number)
  const renderSpec = inputData.renderSpec || { glowThresh: 0, glowIntensity: 0 }
  const isGlowing = renderSpec.glowIntensity > 0

  return {
    id: inputData.id,
    name: inputData.name.slice(0, 32), // Ensure name is not longer than 32 characters
    about: '',
    file: inputData.modelName,
    artist_ids: ['386e8700-6a42-4e03-be15-c9b6624a4f91'],
    is_glowing: isGlowing,
    glow_color: '#ffffff',
    glow_intensity: renderSpec.glowIntensity,
    glow_radius: 100,
    glow_position_x: 50,
    glow_position_y: 50,
    glow_position_z: 50,
    size_x: inputData.size.x,
    size_y: inputData.size.z,
    size_z: inputData.size.y,
    scale_x: inputData.scale,
    scale_y: inputData.scale,
    scale_z: inputData.scale,
    colors: [inputData.color],
    categories: [],
    tags: [],
    is_obstructive: false
  }
}
