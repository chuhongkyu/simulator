const Floor = () => {
  return (
    <mesh position={[0, -0.2, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial color="#0F2139" />
    </mesh>
  );
};

export default Floor;