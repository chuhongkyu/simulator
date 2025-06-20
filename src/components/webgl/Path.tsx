import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

interface PathProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  width?: number;
  posY?: number;
  renderOrder?: number;
}

const Path = ({ 
  start, 
  end, 
  color = '#01BBAB', 
  width = 60,
  posY = -0.5,
  renderOrder = 2,
}: PathProps) => {
  const { points, colors } = useMemo(() => {
    const [sx, sy, sz] = start;
    const [ex, ey, ez] = end;

    const isSame = sx === ex && sy === ey && sz === ez;

    // x 기준으로 살짝 앞쪽으로 control point를 이동
    const offset = 2; // 앞쪽 이동 정도 조절
    const dx = ex - sx;
    const dz = ez - sz;

    const mid: [number, number, number] = isSame
    ? [sx, sy, sz]
    : [
        (sx + ex) / 2 - (dx === 0 ? 0 : offset * Math.sign(dx)),
        sy,
        (sz + ez) / 2 - (dz === 0 ? 0 : offset * Math.sign(dz)),
      ];

    const segments = 50;
    const points: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mid[0] + t * t * ex;
      const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * mid[1] + t * t * ey;
      const z = (1 - t) * (1 - t) * sz + 2 * (1 - t) * t * mid[2] + t * t * ez;

      points.push(new THREE.Vector3(x, y, z));

      const colorObj = new THREE.Color(color);
      colorObj.multiplyScalar(1 - t * 0.6);
      colors.push(colorObj);
    }

    return { points, colors };
  }, [start, end, color]);

  return (
    <group position={[0, posY, 0]}>
      <Line
        renderOrder={renderOrder}
        points={points}
        color={color}
        lineWidth={width}
        transparent={true}
        opacity={0.8}
        vertexColors={colors}
        dashed={false}
      />
    </group>
  );
};


export default Path;