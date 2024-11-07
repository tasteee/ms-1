import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Effects } from './Effects'

export const onCreated = (state) => {
  state.camera.position.set(-20, 22, 20)
  state.camera.rotation.order = 'YXZ'
  state.camera.rotation.y = -Math.PI / 4
  state.camera.rotation.x = Math.atan(-1 / Math.sqrt(2))
  state.camera.zoom = 100
  state.camera.near = 0.1
  state.camera.far = 2000
  state.camera.updateProjectionMatrix()
}

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0
}

export const Canvas = (props) => {
  return (
    <ThreeCanvas orthographic shadows frameloop="demand" onCreated={onCreated} style={style}>
      {props.children}
      <OrbitControls />
      <directionalLight
        position={[100, 100, 100]}
        intensity={0.25}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <directionalLight
        position={[0, 100, -100]}
        intensity={0.25}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <directionalLight
        position={[0, 100, 0]}
        intensity={0.525}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <ambientLight intensity={0.35} />
      <Effects />
    </ThreeCanvas>
  )
}
