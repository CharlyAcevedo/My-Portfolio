import React, { useRef, useEffect } from "react";
import styles from "./styles/scene.module.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentMount = mountRef.current;

        //scene
        const scene = new THREE.Scene();

        //camera
        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4
        scene.add(camera);

        //renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(
            currentMount.clientWidth,
            currentMount.clientHeight
        )
        currentMount.appendChild(renderer.domElement);

        //Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        //Cube
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 0.3,
                wireframe: true,
            })
        )
        scene.add(cube)

        //render the scene
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate();

        //Clean up scene
        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    },[]);

    return (
        <div 
        className={styles.container3d}
        ref={mountRef}
        >
        </div>
    )
}

export default Scene