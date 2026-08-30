import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<{
    particleMat?: THREE.PointsMaterial;
    icoMat?: THREE.MeshBasicMaterial;
    coreMat?: THREE.MeshBasicMaterial;
    torusMat?: THREE.MeshBasicMaterial;
  }>({});

  // Dynamic Theme Material Color Updates
  useEffect(() => {
    const isDark = theme === 'dark';
    if (sceneRef.current) {
      sceneRef.current.fog = new THREE.FogExp2(
        isDark ? 0x070a12 : 0xf8fafc,
        isDark ? 0.0018 : 0.0012
      );
    }
    if (materialRef.current.particleMat) {
      materialRef.current.particleMat.opacity = isDark ? 0.65 : 0.45;
      materialRef.current.particleMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    }
    if (materialRef.current.icoMat) {
      materialRef.current.icoMat.color.setHex(isDark ? 0x3b82f6 : 0x2563eb);
      materialRef.current.icoMat.opacity = isDark ? 0.18 : 0.12;
    }
    if (materialRef.current.coreMat) {
      materialRef.current.coreMat.color.setHex(isDark ? 0x06b6d4 : 0x0284c7);
      materialRef.current.coreMat.opacity = isDark ? 0.35 : 0.22;
    }
    if (materialRef.current.torusMat) {
      materialRef.current.torusMat.color.setHex(isDark ? 0x6366f1 : 0x4f46e5);
      materialRef.current.torusMat.opacity = isDark ? 0.14 : 0.1;
    }
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const isDark = theme === 'dark';
    scene.fog = new THREE.FogExp2(isDark ? 0x070a12 : 0xf8fafc, isDark ? 0.0018 : 0.0012);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 85;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle Cloud (Constellation nodes)
    const particleCount = 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x2563eb); // electric blue
    const color2 = new THREE.Color(0x06b6d4); // cyan
    const color3 = new THREE.Color(0x6366f1); // indigo

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 160;
      positions[i3 + 1] = (Math.random() - 0.5) * 120;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      const randColor = Math.random();
      const mixedColor = randColor < 0.4 ? color1 : randColor < 0.8 ? color2 : color3;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture / material
    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    materialRef.current.particleMat = particleMaterial;

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Floating 3D Geometric Wireframe Crystals
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Main icosahedron wireframe
    const icoGeo = new THREE.IcosahedronGeometry(14, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
    });
    materialRef.current.icoMat = icoMat;
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(38, 12, -15);
    crystalGroup.add(icoMesh);

    // Inner glowing core
    const coreGeo = new THREE.OctahedronGeometry(6, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x06b6d4 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    });
    materialRef.current.coreMat = coreMat;
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.copy(icoMesh.position);
    crystalGroup.add(coreMesh);

    // Secondary Torus knot on the left
    const torusGeo = new THREE.TorusGeometry(10, 2.5, 12, 36);
    const torusMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x6366f1 : 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.1,
    });
    materialRef.current.torusMat = torusMat;
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-42, -14, -20);
    crystalGroup.add(torusMesh);

    // Mouse tracking & smooth parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.04;
      mouseY = (e.clientY - windowHalfY) * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      icoMesh.rotation.x = elapsedTime * 0.18;
      icoMesh.rotation.y = elapsedTime * 0.22;
      coreMesh.rotation.x = -elapsedTime * 0.3;
      coreMesh.rotation.z = elapsedTime * 0.25;

      torusMesh.rotation.x = elapsedTime * 0.15;
      torusMesh.rotation.y = elapsedTime * 0.18;

      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-75 dark:opacity-80 transition-opacity"
      aria-hidden="true"
    />
  );
};
