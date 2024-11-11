import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeScene = ({
  numLeaves,
  angle,
}: {
  numLeaves: number;
  angle: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const drawLeaves = useCallback(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    Array.from(Array(numLeaves + 1), (_, i) => i).forEach((i) => {
      const theta = angle * i;
      const radius = (7.5 / numLeaves) * i;
      // line
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 10 - (10 / numLeaves) * i, 0),
          new THREE.Vector3(
            Math.cos(theta) * radius,
            10 - (10 / numLeaves) * i,
            Math.sin(theta) * radius
          ),
        ]),
        new THREE.LineBasicMaterial({ color: 0x808080 })
      );
      line.name = "line";
      scene.add(line);
      // leaf
      const leaf = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.25 * (i / numLeaves / 2 + 0.5),
          0.25 * (i / numLeaves / 2 + 0.5),
          0.1,
          32
        ),
        new THREE.MeshStandardMaterial({
          color: "ForestGreen",
          name: "leaf",
        })
      );
      leaf.position.set(
        Math.cos(theta) * radius,
        10 - (10 / numLeaves) * i,
        Math.sin(theta) * radius
      );
      leaf.name = "leaf";
      scene.add(leaf);
    });
  }, [numLeaves, angle]);
  useEffect(() => {
    if (!containerRef.current) return;

    // scene, camera, renderer
    const scene = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 0);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
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
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.0;
    // objects
    const cube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 11, 32),
      new THREE.MeshBasicMaterial({ color: "Burlywood" })
    );
    cube.position.set(0, 4.5, 0);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const current = containerRef.current;
    return () => {
      current.removeChild(renderer.domElement);
      renderer.dispose();
      sceneRef.current = new THREE.Scene();
    };
  }, []);
  useEffect(() => {
    if (!sceneRef.current) return;
    // remove previous leaves
    const prevs = sceneRef.current.children.filter(
      (child) => child.name === "line" || child.name === "leaf"
    );
    prevs.forEach((child) => {
      (child as THREE.Mesh).geometry.dispose();
      ((child as THREE.Mesh).material as THREE.Material).dispose();
    });
    sceneRef.current.remove(...prevs);
    // draw new leaves
    drawLeaves();
  }, [numLeaves, angle, drawLeaves]);
  return <div className="h-full w-full" ref={containerRef} />;
};

export default ThreeScene;
