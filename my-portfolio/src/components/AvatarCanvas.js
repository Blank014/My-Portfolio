import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function Avatar() {
    const { scene, animations } = useGLTF('/avatar.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const { camera } = useThree();
    const ref = useRef();

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


    useEffect(() => {
        if (ref.current) {
            // Camera settings
            camera.position.set(0.2, 0.5, 1); // Adjust the camera position as per setupScene
            camera.fov = 45; // Set field of view
            camera.updateProjectionMatrix();

            ref.current.add(camera);
            camera.lookAt(ref.current.position);

            // Apply scaling to the avatar to adjust its size
            /*  ref.current.scale.set(1.2, 1.2, 1.2);  */// Adjust the scale to make the avatar larger

        }

        // Handle window resize
        const handleResize = () => {
            const container = document.getElementById('avatar-container');
            if (container) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                gl.setSize(container.clientWidth, container.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            if (ref.current) {
                ref.current.remove(camera);
            }
        };
    }, [camera, ref]);

    return <primitive object={scene} ref={ref} />;
}


function Pedestal() {
    return (
        <mesh position={[0, -0.05, 0]} receiveShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 64]} />
            <meshStandardMaterial color="#808080" />
        </mesh>
    );
}

function Lighting() {
    return (
        <>
            {/* Ambient Light */}
            <ambientLight intensity={0.5} />

            {/* Spotlight */}
            <spotLight
                color={0xffffff}
                intensity={20}
                distance={8}
                angle={Math.PI / 4}
                penumbra={0.5}
                position={[0, 4, 2]}
                castShadow
            />

            {/* Directional Light */}
            <directionalLight
                color={0xffffff}
                intensity={2}
                position={[1, 1, 2]}
                castShadow
            />
        </>
    );
}

export default function AvatarCanvas() {
    return (
        <Canvas shadows>
            <Lighting />
            <Suspense fallback={null}>
                <Avatar />
                {/* <Pedestal /> */}
            </Suspense>
            <OrbitControls
                enableDamping={true}
                enablePan={false}
                enableZoom={false}
                minDistance={3}
                minPolarAngle={1.4}
                maxPolarAngle={1.4}
                target={[0, 0.75, 0]}
            />
        </Canvas>
    );
}
