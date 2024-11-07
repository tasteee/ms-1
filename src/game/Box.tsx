import React, { useMemo, useRef, useState } from 'react'
import './styles.css'

const colors = ['#D44F37', '#E6B142', '#2765A9', '#222222']

export const Box = (props) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1 + Math.random() / 100 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#aaa' : props.color || 'tomato'} />
    </mesh>
  )
}
