import { useControls } from 'leva'
import { BlendFunction } from 'postprocessing'
import { EffectComposer, SSAO } from '@react-three/postprocessing'

export function Effects() {
  const { isEnabled, samples, scale, rings, bias, luminanceInfluence, distanceFalloff, radius, intensity } = useControls(
    'SSAO Effect',
    {
      isEnabled: true,
      samples: 200,
      scale: 0.01,
      rings: 20,
      bias: 0.0092,
      luminanceInfluence: 0.4,
      distanceFalloff: 230,
      radius: 10,
      intensity: 50
    },
    { collapsed: true }
  )
  if (!isEnabled) return null
  return (
    <EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
        samples={samples}
        scale={scale}
        rings={rings}
        bias={bias}
        luminanceInfluence={luminanceInfluence}
        distanceFalloff={distanceFalloff}
        radius={radius}
        intensity={intensity}
      />
    </EffectComposer>
  )
}
