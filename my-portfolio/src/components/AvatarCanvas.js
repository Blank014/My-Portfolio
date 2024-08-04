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

    /* useFrame(() => {
        if (ref.current) {
            const box = new THREE.Box3().setFromObject(ref.current);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Adjust the camera position based on the bounding box
            camera.position.set(center.x, center.y + size.y * 0.5, center.z + size.z * 2.5);
            camera.lookAt(center);
        }
    }); */

    useEffect(() => {
        if (ref.current) {
            ref.current.add(camera);
            camera.position.set(0, 1.5, 3); // Adjust the camera position relative to the avatar
            camera.lookAt(ref.current.position);
        }

        // Cleanup on unmount
        return () => {
            if (ref.current) {
                ref.current.remove(camera);
            }
        };
    }, [camera, ref]);

    return <primitive object={scene} />;
}

export default function AvatarCanvas() {
    return (
        <Canvas camera={{
            position: [0, 1.5, 3], fov: 35
        }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Avatar />
            </Suspense>
            <OrbitControls enableZoom={false} target={[0, 1, 0.2]} />
        </Canvas>
    );
}
