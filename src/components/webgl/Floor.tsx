const Floor = () => {
  return (
    <mesh position={[0, 0, 0]}  rotation-x={-Math.PI / 2}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial transparent opacity={0} color="#0F2139" />
    </mesh>
  );
};

export default Floor;