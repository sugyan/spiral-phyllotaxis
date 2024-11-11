import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    // scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / ref.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 0);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    ref.current.appendChild(renderer.domElement);
    // light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 100.0, 0);
    pointLight.position.set(0, 15, 0);
    scene.add(pointLight);
    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2.0;
    // objects
    {
      const geometry = new THREE.CylinderGeometry(0.05, 0.05, 11, 32);
      const material = new THREE.MeshBasicMaterial({ color: "Burlywood" });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 4, 0);
      scene.add(cube);
    }
    {
      const num = 150;
      Array.from(Array(num + 1), (_, i) => i).forEach((i) => {
        const angle = ((1 + Math.sqrt(5)) / 2) * 2.0 * Math.PI * i;
        const radius = (7.5 / num) * i;
        // line
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 10 - (10 / num) * i, 0),
            new THREE.Vector3(
              Math.cos(angle) * radius,
              10 - (10 / num) * i,
              Math.sin(angle) * radius
            ),
          ]),
          new THREE.LineBasicMaterial({ color: 0x808080 })
        );
        scene.add(line);
        // leaf
        const leaf = new THREE.Mesh(
          new THREE.CylinderGeometry(
            0.25 * (i / num / 2 + 0.5),
            0.25 * (i / num / 2 + 0.5),
            0.1,
            32
          ),
          new THREE.MeshStandardMaterial({
            color: "ForestGreen",
          })
        );
        leaf.position.set(
          Math.cos(angle) * radius,
          10 - (10 / num) * i,
          Math.sin(angle) * radius
        );
        scene.add(leaf);
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return <div className="h-full w-full" ref={ref} />;
};

export default ThreeScene;
