'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, BackSide } from 'three';

function Cube() {
  const mesh = useRef();
  const texture = new TextureLoader().load("https://as1.ftcdn.net/v2/jpg/06/46/73/62/1000_F_646736257_hgOnuDzkNjt631zGyeofvTJBvwCS8LWR.jpg");

  useFrame(({ mouse }) => {
    if (mesh.current) {
      const maxRotation = Math.PI / 36; // 5度
      const rotationSpeed = 0.8;
      const targetRotationX = mouse.y * maxRotation * rotationSpeed;
      const targetRotationY = mouse.x * maxRotation * rotationSpeed;
      mesh.current.rotation.x = Math.max(-maxRotation, Math.min(maxRotation, targetRotationX));
      mesh.current.rotation.y = Math.max(-maxRotation, Math.min(maxRotation, targetRotationY));
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[10, 10, 10, 10, 10, 10]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
}

function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    let aspect = size.width / size.height;
    let distance = 3

    camera.position.set(0, 0, distance / aspect); // カメラの位置を調整
    camera.lookAt(0, 0, 0); // 立方体の中心を見るように設定
    camera.updateProjectionMatrix(); // 変更を適用
  }, [camera, size]);

  return null;
}

function GridComponent() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cube />
        <CameraController />
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

export default GridComponent;