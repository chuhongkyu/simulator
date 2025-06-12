const Floor = () => {
  return (
    <mesh castShadow receiveShadow rotation-x={-Math.PI / 2}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#ececec" />
    </mesh>
  );
};

export default Floor;