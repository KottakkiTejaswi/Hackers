import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Grid } from "@react-three/drei";


const Globe = () => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.005; // Rotate the globe
  });

  return (
    <Sphere ref={meshRef} args={[2.2, 32, 32]}>
      <meshStandardMaterial
        color="#00ff00"
        wireframe
        emissive="#00ff00"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
};

const ThreeScene = () => {
  return (
    <>
    <Canvas
      style={{ display: "flex",position: "absolute", justifyContent: "center", alignItems: "center",  zIndex: -1, width: "100%", height: "100%" , left:0}}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {/* <Grid args={[10, 10]} cellColor="#00ff00" /> */}

      <Globe />
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    </>

  );
};



export default ThreeScene;