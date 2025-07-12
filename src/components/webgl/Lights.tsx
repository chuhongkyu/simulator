const Lights = () => {
  return (
    <group>
        <ambientLight intensity={1.5} />
        <directionalLight 
            position={[10, 10, 10]} 
            intensity={2} 
            // castShadow 
            // shadow-mapSize={[1024, 1024]}
            // shadow-camera-left={-10}
            // shadow-camera-right={10}
            // shadow-camera-top={10}
            // shadow-camera-bottom={-10}
        />
    </group>
  );
};

export default Lights;