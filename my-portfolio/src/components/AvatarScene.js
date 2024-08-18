import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Avatar() {
    const containerRef = useRef();
    const { scene, animations } = useGLTF('/avatar.glb');
    const { actions, mixer } = useAnimations(animations, scene);
    const { camera } = useThree();

    useEffect(() => {
        const container = containerRef.current;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0.2, 0.5, 1);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.minDistance = 3;
        controls.minPolarAngle = 1.4;
        controls.maxPolarAngle = 1.4;
        controls.target = new THREE.Vector3(0, 0.75, 0);
        controls.update();

        const scene = new THREE.Scene();

        // Lighting setup
        scene.add(new THREE.AmbientLight());

        const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
        spotlight.penumbra = 0.5;
        spotlight.position.set(0, 4, 2);
        spotlight.castShadow = true;
        scene.add(spotlight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2);
        keyLight.position.set(1, 1, 2);
        keyLight.lookAt(new THREE.Vector3());
        scene.add(keyLight);

        // Load GLTF model
        const loader = new GLTFLoader();
        loader.load('/avatar.glb', (gltf) => {
            const avatar = gltf.scene;
            avatar.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(avatar);

            // Create pedestal
            const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
            const groundMaterial = new THREE.MeshStandardMaterial();
            const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            groundMesh.castShadow = false;
            groundMesh.receiveShadow = true;
            groundMesh.position.y -= 0.05;
            scene.add(groundMesh);

            // Animation setup
            const mixer = new THREE.AnimationMixer(avatar);
            const clips = gltf.animations;
            const waveClip = THREE.AnimationClip.findByName(clips, 'Greeting');
            const stumbleClip = THREE.AnimationClip.findByName(clips, 'Sitting');
            const waveAction = mixer.clipAction(waveClip);
            const stumbleAction = mixer.clipAction(stumbleClip);

            let isStumbling = false;
            const raycaster = new THREE.Raycaster();
            container.addEventListener('mousedown', (ev) => {
                const coords = {
                    x: (ev.offsetX / container.clientWidth) * 2 - 1,
                    y: -(ev.offsetY / container.clientHeight) * 2 + 1,
                };

                raycaster.setFromCamera(coords, camera);
                const intersections = raycaster.intersectObject(avatar);

                if (intersections.length > 0) {
                    if (isStumbling) return;

                    isStumbling = true;
                    stumbleAction.reset();
                    stumbleAction.play();
                    waveAction.crossFadeTo(stumbleAction, 0.3);

                    setTimeout(() => {
                        waveAction.reset();
                        waveAction.play();
                        stumbleAction.crossFadeTo(waveAction, 1);
                        setTimeout(() => (isStumbling = false), 1000);
                    }, 4000);
                }
            });

            const clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                mixer.update(clock.getDelta());
                renderer.render(scene, camera);
            }

            animate();
            waveAction.play();
        });

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        return () => {
            window.removeEventListener('resize', () => { });
            container.removeChild(renderer.domElement);
        };
    }, []);

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

    return <div id="avatar-container" ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
export default function AvatarScene() {
    return (
        <Canvas camera={{
            position: [0, 1.5, 3], fov: 35
        }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Avatar />
            </Suspense>

        </Canvas>
    );
}
