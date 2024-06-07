import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, BackSide } from 'three'

function Cube() {
  const mesh = useRef();
  const texture = new TextureLoader().load("https://as1.ftcdn.net/v2/jpg/06/46/73/62/1000_F_646736257_hgOnuDzkNjt631zGyeofvTJBvwCS8LWR.jpg")

  useFrame(({ mouse }) => {
    if (mesh.current) {
      // mesh.current.rotation.x = mouse.y * Math.PI;
      // mesh.current.rotation.y = mouse.x * Math.PI;// 角度制限 (5度)
      const maxRotation = Math.PI / 36; // 5度
      // 回転速度を遅くするための係数
      const rotationSpeed = 0.8;

      // マウス位置に応じた回転角度
      const targetRotationX = mouse.y * maxRotation * rotationSpeed;
      const targetRotationY = mouse.x * maxRotation * rotationSpeed;

      // 回転を適用
      mesh.current.rotation.x = Math.max(-maxRotation, Math.min(maxRotation, targetRotationX));
      mesh.current.rotation.y = Math.max(-maxRotation, Math.min(maxRotation, targetRotationY));
    }
  })
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
}

function CameraController() {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 0.2); // 立方体の中心にカメラを配置
    camera.lookAt(1, 1, 1); // 外側を向くように設定
    camera.zoom = 1;
    camera.updateProjectionMatrix(); // 変更を適用
  }, [camera, gl]);
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
        {/* <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2 - 0.0873} // 上の動きを5度に制限
          maxPolarAngle={Math.PI / 2 + 0.0873} // 下の動きを5度に制限
          minAzimuthAngle={-0.0873} // 左右の動きを5度に制限
          maxAzimuthAngle={0.0873}  // 左右の動きを5度に制限
          rotateSpeed={0.1}
          enableDamping={true}
          dampingFactor={0.2}
        /> */}
      </Canvas>
    </div>
  );
}

export default GridComponent;