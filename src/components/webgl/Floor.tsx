interface FloorProps {
  color?: string;
}

const Floor = ({color = "#C9D7E4"}: FloorProps) => {
  return (
    <mesh position={[0, -0.2, -100]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[600, 600]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Floor;