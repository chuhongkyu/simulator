import { RoundedBox } from "@react-three/drei";

interface GroundAreaProps {
  position: [number, number, number];         // 중심 위치 (x, y, z)
  size: [number, number];                     // [widthX, depthZ]
  height?: number;                            // y축 높이
  radius?: number;
  color?: string;
}

const GroundArea = ({
  position,
  size,
  height = 0.02,
  radius = 0.05,
  color = "#223F60",
}: GroundAreaProps) => {
  const [x, z] = size;
  return (
    <RoundedBox
      position={position}
      args={[x, height, z]}         // x, y, z
      radius={radius}
      smoothness={8}
    >
      <meshStandardMaterial color={color} />
    </RoundedBox>
  );
};

export default GroundArea;
