import React, { useEffect, useState } from 'react'
import { ContactShadows, useGLTF } from '@react-three/drei'
import Badge from './2d/Badge';

export function Car({ name = "car" }: { name?: string }) {
  const { scene } = useGLTF('/assets/model/car.glb');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <group rotation={[0, Math.PI, 0]}>
      <primitive name={name} object={scene.clone()} scale={0.5} />
      {ready && <Badge name={name} />}
    </group>
  );
}

useGLTF.preload('/assets/model/car.glb');
