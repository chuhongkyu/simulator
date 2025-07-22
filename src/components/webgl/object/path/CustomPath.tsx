import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { IPath } from './PathTypes';

interface CustomPathProps {
  position: THREE.Vector3Tuple;
  line: IPath
}

const CustomPath = ({
  position, 
  line,
}: CustomPathProps) => {

  return (
    <group position={position}>
        <Line
            points={line.points}
            color={line.color}
            lineWidth={10}
            dashed={false}
            transparent
            opacity={0.7}
        />
    </group>
  );
};

export default CustomPath;
