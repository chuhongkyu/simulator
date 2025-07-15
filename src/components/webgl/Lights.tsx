const Lights = () => {
  return (
    <group>
        <ambientLight intensity={1.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={2} 
        />
    </group>
  );
};

export default Lights;