import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Avatar() {
    const { scene, animations } = useGLTF('/avatar.glb');
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
        if (actions) {
            actions[Object.keys(actions)[0]].play();
        }
    }, [actions]);

    return <primitive object={scene} />;
}

export default function AvatarCanvas() {
    return (
        <Canvas camera={{ position: [-4, 1, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Avatar />
            </Suspense>
            <OrbitControls enableZoom={true} target={[0, 1, 0]} />
        </Canvas>
    );
}
