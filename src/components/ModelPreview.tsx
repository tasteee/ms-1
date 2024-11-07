import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { PreviewLoop } from '../components/ui/main-loop'

// https://yqfoayndexaqqmvcuwjs.supabase.co/storage/v1/object/public/gltf/01871hflhyenzu06.gltf
const BASE_URL = 'https://yqfoayndexaqqmvcuwjs.supabase.co/storage/v1/object/public'
const BUCKET_NAME = 'gltf'

const getFixedUrl = (url: string) => {
  const urlll = url.replace('{BASE_URL}', BASE_URL).replace('{BUCKET_NAME}', BUCKET_NAME)
  console.log({ urlll })
  return urlll
}

export const ModelPreview = (props) => {
  const groupRef = useRef(null)
  const model = useGLTF(getFixedUrl(props.file))
  console.log({ model, props })
  if (!model.scene) return null

  return (
    <Canvas frameloop="demand" orthographic camera={{ position: [10, 10, 10], zoom: 40 }}>
      <color attach="background" args={['#101010']} />
      <PreviewLoop target={groupRef} />
      <group ref={groupRef} castShadow receiveShadow name="player" position={[0, 0, 0]}>
        <primitive object={model.scene} />
      </group>
      <ambientLight intensity={5} />
      <Environment preset="studio" />
      <directionalLight position={[10, 10, 10]} intensity={1} />
    </Canvas>
  )
}
