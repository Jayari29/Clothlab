import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';

const GarmentMesh = ({ color }: { color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1.2, 0.35, 200, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.5}
                    clearcoat={0.8}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
};

interface EditorCanvasProps {
    activeColor: string;
    activeTool: string;
}

const EditorCanvas = ({ activeColor, activeTool }: EditorCanvasProps) => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <spotLight position={[-10, 8, 8]} intensity={1.2} angle={0.3} penumbra={1} />
            <Environment preset="studio" />
            <GarmentMesh color={activeColor} />
            <OrbitControls
                enableZoom={activeTool === 'Zoom'}
                enablePan={activeTool === 'Pan'}
                enableRotate={activeTool === 'Orbit'}
                autoRotate
                autoRotateSpeed={1}
            />
            <Preload all />
        </Canvas>
    );
};

export default EditorCanvas;
