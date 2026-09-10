import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Book
    const bookGroup = new THREE.Group();

    // Book cover
    const coverGeo = new THREE.BoxGeometry(2.4, 3.2, 0.4);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.3,
      roughness: 0.2,
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    bookGroup.add(cover);

    // Book pages (inner block)
    const pagesGeo = new THREE.BoxGeometry(2.3, 3.1, 0.36);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.8,
    });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.x = 0.05;
    bookGroup.add(pages);

    // Book Spine Accent
    const spineGeo = new THREE.BoxGeometry(0.1, 3.22, 0.42);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.x = -1.2;
    bookGroup.add(spine);

    bookGroup.rotation.x = 0.3;
    bookGroup.rotation.y = -0.5;
    bookGroup.rotation.z = 0.15;
    mainGroup.add(bookGroup);

    // 2. Orbiting Geometric Shapes (Icosahedron & Torus)
    const icoGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(2.4, 1.4, 0.5);
    mainGroup.add(icosahedron);

    const torusGeo = new THREE.TorusGeometry(0.6, 0.12, 16, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: false,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-2.2, -1.2, 0.8);
    torus.rotation.x = 1.2;
    mainGroup.add(torus);

    // Octahedron for Maths/Science
    const octGeo = new THREE.OctahedronGeometry(0.4, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(-1.8, 1.6, -0.4);
    mainGroup.add(octahedron);

    // 3. Orbiting Study Particles
    const particlesCount = 80;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.7,
    });
    const particlePoints = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particlePoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 20);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.8;
      mouseY = -(y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and rotation
      bookGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15;
      bookGroup.rotation.y = -0.5 + Math.sin(elapsedTime * 0.8) * 0.1;
      bookGroup.rotation.x = 0.3 + Math.cos(elapsedTime * 0.6) * 0.05;

      icosahedron.rotation.x += 0.01;
      icosahedron.rotation.y += 0.015;
      icosahedron.position.y = 1.4 + Math.sin(elapsedTime * 1.5) * 0.12;

      torus.rotation.x += 0.008;
      torus.rotation.y += 0.012;
      torus.position.y = -1.2 + Math.cos(elapsedTime * 1.3) * 0.15;

      octahedron.rotation.y += 0.02;

      particlePoints.rotation.y = elapsedTime * 0.03;

      // Smooth mouse parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      mainGroup.rotation.y = targetX;
      mainGroup.rotation.x = -targetY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] md:h-[480px] lg:h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D RankRise visualization"
    />
  );
};
