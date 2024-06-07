import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import { TextureLoader, BoxGeometry, MeshBasicMaterial } from 'three';
import { OrbitControls } from '@react-three/drei';

extend({ BoxGeometry, MeshBasicMaterial });

const RectangularPrism = ({ canvasSize, textureUrl, thickness }) => {
  const texture = useLoader(TextureLoader, textureUrl)
  const meshRef = useRef();
  const [scale, setScale] = useState([canvasSize.width / 200, canvasSize.width / 400, thickness])

  // useFrame(({ mouse }) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x = mouse.y * Math.PI;
  //     meshRef.current.rotation.y = mouse.x * Math.PI;
  //   }
  // });

  useEffect(() => {
    console.log([canvasSize.width / 200, canvasSize.width / 400, thickness])
    setScale([canvasSize.width / 200, canvasSize.width / 400, thickness])
  }, [canvasSize, thickness])

  return (
    <mesh ref={meshRef} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material-0" color="white" />
      <meshBasicMaterial attach="material-1" color="white" />
      <meshBasicMaterial attach="material-2" color="white" />
      <meshBasicMaterial attach="material-3" color="white" />
      <meshBasicMaterial attach="material-4" map={texture} />
      <meshBasicMaterial attach="material-5" color="white" />
    </mesh>
  );
};

function MaterialComponent({textureUrl, thickness}) {
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const canvasRef = useRef();

  const handleResize = () => {
    if (canvasRef.current) {
      const { clientWidth, clientHeight } = canvasRef.current;
      setCanvasSize({ width: clientWidth, height: clientHeight });
      console.log(clientWidth, clientHeight)
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // 初回レンダリング時にサイズを取得

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight />
        <RectangularPrism canvasSize={canvasSize} textureUrl={textureUrl} thickness={thickness} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default MaterialComponent;