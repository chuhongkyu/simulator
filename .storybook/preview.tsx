import { Grid, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Preview } from '@storybook/nextjs-vite';
import React from 'react';

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "100%", height: "60vh",}}>
            <Canvas camera={{ position: [0, 5, 5], fov: 40 }}>
              <color attach="background" args={["#333"]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <OrbitControls target={[0, 5, 0]} />
              <Story />
            </Canvas>
        </div>
      );
    },
  ],
};

export default preview;