import { Plane } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'

export const GRID_WIDTH = 50
export const GRID_HEIGHT = 50

export function Floor(props) {
  const mesh = useRef()
  const floorColor = '#2b262d'
  const hasShadow = true
  const gridPositionX = 0 // Math.ceil(GRID_WIDTH / 50)
  const gridPositionZ = 0 //Math.ceil(GRID_HEIGHT / 2)
  const gridPosition = [gridPositionX, -0.49, gridPositionZ]

  return (
    <>
      <mesh ref={mesh} position={gridPosition} {...props}>
        <gridHelper args={[GRID_WIDTH, GRID_HEIGHT, '#3e3841', '#3e3841']} />
      </mesh>

      <Plane
        args={[GRID_WIDTH - 0.01, GRID_HEIGHT - 0.01]}
        position={gridPosition}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={hasShadow}
      >
        <meshStandardMaterial attach="material" color={floorColor} />
      </Plane>
    </>
  )
}
