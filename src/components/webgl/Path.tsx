import { useMemo } from 'react';
import * as THREE from 'three';

interface PathMeshProps {
  points: [number, number, number][];
  color?: string;
  width?: number;
  renderOrder?: number;
  posY?: number;
}

const PathMesh = ({
  points,
  color = '#009c8f',
  width = 0.6,
  renderOrder = 2,
  posY = -0.1,
}: PathMeshProps) => {
  const { geometry } = useMemo(() => {
    const vectorPoints = points.map(([x, y, z]) => new THREE.Vector3(x, y, z));

    const curve = new THREE.CatmullRomCurve3(vectorPoints);
    const geometry = new THREE.TubeGeometry(curve, 100, width, 12, false);

    return { geometry };
  }, [points, width]);

  return (
    <mesh position={[0, posY, 0]} scale={[1, 0.1, 1]} geometry={geometry} renderOrder={renderOrder}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.8} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
};

export default PathMesh;
