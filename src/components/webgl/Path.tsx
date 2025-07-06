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
    const curve = new THREE.CatmullRomCurve3(vectorPoints, false, 'catmullrom', 0.5);
    
    // TubeGeometry로 실제 두께를 가진 선 생성
    const geometry = new THREE.TubeGeometry(curve, 500, width, 8, false);
    
    return { geometry };
  }, [points, width]);

  return (
    <mesh geometry={geometry} renderOrder={renderOrder} scale={[1,0.1,1]}>
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

export default PathMesh;
