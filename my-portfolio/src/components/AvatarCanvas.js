import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Avatar() {
    const { scene, animations } = useGLTF('/avatar.glb');
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
        if (actions) {
            const greetingAction = actions['Greeting'];
            const sittingAction = actions['Sitting'];

            // Reset and play the greeting animation
            greetingAction.reset().fadeIn(0.5).play();

            // Set the loop mode and clamp when finished for the greeting animation
            greetingAction.setLoop(THREE.LoopOnce);
            greetingAction.clampWhenFinished = true;

            // Function to start sitting animation after greeting finishes
            const startSittingAnimation = () => {
                greetingAction.fadeOut(0.5);
                sittingAction.reset().fadeIn(0.5).play();
            };

            // Listen for the finished event on the mixer
            mixer.addEventListener('finished', (event) => {
                if (event.action === greetingAction) {
                    startSittingAnimation();
                }
            });

            // Cleanup event listener on unmount
            return () => {
                mixer.removeEventListener('finished', startSittingAnimation);
            };
        }
    }, [actions, mixer]);

    return <primitive object={scene} />;
}

export default function AvatarCanvas() {
    return (
        <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Avatar />
            </Suspense>
            <OrbitControls enableZoom={false} target={[0, 1, 0]} />
        </Canvas>
    );
}
