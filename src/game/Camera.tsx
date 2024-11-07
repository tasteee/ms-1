import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useState } from 'react'

export function IsometricCamera() {
  const { camera } = useThree()
  const [, forceUpdate] = useState(0)

  const [
    {
      near,
      far,
      zoom,
      camera: { x, y, z }
    }
  ] = useControls(() => ({
    near: { value: 0.1, min: 0.001, max: 3 },
    far: { value: 2000, min: 1, max: 10000 },
    zoom: { value: 100, min: 1, max: 100 },
    camera: { x: -20, y: 22, z: 20 }
  }))

  useEffect(() => {
    camera.position.set(x, y, z)
    camera.rotation.order = 'YXZ'
    camera.rotation.y = -Math.PI / 4
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2))
    camera.zoom = zoom
    camera.near = near
    camera.far = far
    camera.updateProjectionMatrix()
    forceUpdate((prev) => prev + 1)
  }, [camera, zoom, x, y, z])

  return null
}
