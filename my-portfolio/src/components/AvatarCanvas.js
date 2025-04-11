import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

// Particle field that will surround the avatar
function ParticleField({ count = 2000, color = '#a388ee' }) {
    const points = useRef();

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.x -= delta / 10;
            points.current.rotation.y -= delta / 15;
        }
    });

    // Generate random sphere of points
    const sphere = random.inSphere(new Float32Array(count * 3), { radius: 3 });

    return (
        <group>
            <Points ref={points} positions={sphere} stride={30} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.7} // Increased opacity for better visibility
                />
            </Points>
        </group>
    );
}

function Avatar() {
    const { scene, animations } = useGLTF('/avatar.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const { camera } = useThree();
    const ref = useRef();

    useEffect(() => {
        if (actions) {
            const greetingAction = actions['Greeting'];
            const sittingAction = actions['Sitting'];

            // Play greeting animation if available
            if (greetingAction) {
                greetingAction.reset().fadeIn(0.5).play();
                greetingAction.setLoop(THREE.LoopOnce);
                greetingAction.clampWhenFinished = true;

                const startSittingAnimation = () => {
                    if (greetingAction && sittingAction) {
                        greetingAction.fadeOut(0.5);
                        sittingAction.reset().fadeIn(0.5).play();
                    }
                };

                mixer.addEventListener('finished', (event) => {
                    if (event.action === greetingAction) {
                        startSittingAnimation();
                    }
                });

                return () => {
                    mixer.removeEventListener('finished', startSittingAnimation);
                };
            }

            // Fall back to sitting animation if greeting doesn't exist
            else if (sittingAction) {
                sittingAction.reset().fadeIn(0.5).play();
            }

            // If no specific animations found, try playing the first available animation
            else if (Object.keys(actions).length > 0) {
                const firstAction = actions[Object.keys(actions)[0]];
                firstAction.reset().fadeIn(0.5).play();
            }
        }
    }, [actions, mixer]);

    useEffect(() => {
        if (ref.current) {
            // Camera positioning for better view
            camera.position.set(0, 0.5, 1.5);
            camera.fov = 65;
            camera.updateProjectionMatrix();

            ref.current.add(camera);
            camera.lookAt(new THREE.Vector3(0, 0.8, 0));
        }

        return () => {
            if (ref.current) {
                ref.current.remove(camera);
            }
        };
    }, [camera, ref]);

    return <primitive object={scene} ref={ref} scale={1.2} position={[0, -0.7, 0]} />;
}

// Modern lighting setup
function Lighting() {
    return (
        <>
            <ambientLight intensity={1.2} /> {/* Increased intensity for better visibility */}
            <spotLight
                color="#ffffff"
                intensity={12} /* Increased intensity */
                position={[10, 10, 5]}
                angle={0.5}
                penumbra={1}
                castShadow
            />
            <pointLight position={[-10, 0, -10]} intensity={2.5} color="#a388ee" /> {/* Enhanced purple light */}
            <pointLight position={[5, -5, 5]} intensity={1.5} /> {/* Increased intensity */}
        </>
    );
}

export default function AvatarCanvas() {
    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
        >
            {/* Removed color background and fog for better blending */}
            <Suspense fallback={null}>
                <Avatar />
                <ParticleField />
            </Suspense>
            <Lighting />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
                dampingFactor={0.05}
            />
        </Canvas>
    );
}
