import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Mesh, MeshStandardMaterial, Box3, Vector3, Object3D, PerspectiveCamera } from 'three';
import { useGLTF } from '@react-three/drei';

interface SpectaclesProps {
  onMagnify: (side: 'left' | 'right') => void;
  isMobile?: boolean;
}

const LENS_COLORS = {
  left: '#87CEEB',  // Blue
  right: '#f6916c'  // Pink/Red
} as const;

const Spectacles: React.FC<SpectaclesProps> = ({ onMagnify, isMobile = false }): JSX.Element => {
  const { camera, raycaster, gl, size } = useThree();
  const { scene: modelScene } = useGLTF('/3d_objects/gr_spectacles_ver_2.glb');
  const leftLensRef = useRef<Mesh | null>(null);
  const rightLensRef = useRef<Mesh | null>(null);
  const [isClickable, setIsClickable] = useState(true);
  
  const leftLensMeshes = useRef<Mesh[]>([]);
  const rightLensMeshes = useRef<Mesh[]>([]);

  const handlePointerEvent = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isClickable) return;

    event.preventDefault();

    const clientX = 'touches' in event && event.touches[0] 
      ? event.touches[0].clientX 
      : 'clientX' in event 
        ? event.clientX 
        : null;
    const clientY = 'touches' in event && event.touches[0] 
      ? event.touches[0].clientY 
      : 'clientY' in event 
        ? event.clientY 
        : null;

    if (clientX === null || clientY === null) return;

    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    
    const leftIntersects = raycaster.intersectObjects(leftLensMeshes.current);
    const rightIntersects = raycaster.intersectObjects(rightLensMeshes.current);

    if (isClickable) {
      if (leftIntersects.length > 0 && (!rightIntersects.length || leftIntersects[0].distance < rightIntersects[0].distance)) {
        onMagnify('left');
      } else if (rightIntersects.length > 0) {
        onMagnify('right');
      }

      setIsClickable(false);
      setTimeout(() => setIsClickable(true), 300);
    }
  }, [camera, raycaster, onMagnify, isClickable, gl]);

  useEffect(() => {
    const canvasElement = gl.domElement;
    const options: AddEventListenerOptions = { passive: false };
    
    canvasElement.addEventListener('click', handlePointerEvent, options);
    canvasElement.addEventListener('touchstart', handlePointerEvent, options);
    
    return () => {
      canvasElement.removeEventListener('click', handlePointerEvent, options);
      canvasElement.removeEventListener('touchstart', handlePointerEvent, options);
    };
  }, [handlePointerEvent, gl]);

  useEffect(() => {
    const handleResize = () => {
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera]);

  useEffect(() => {
    leftLensMeshes.current = [];
    rightLensMeshes.current = [];
  
    const setupLens = (object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      
      const isLeftLens = object.name.includes('polySurface2');
      const isRightLens = object.name.includes('polySurface3');
      
      if (!isLeftLens && !isRightLens) return;
    
      const material = new MeshStandardMaterial({
        transparent: true,
        opacity: 0.6,
        metalness: 0.5,
        roughness: 0.5,
        depthWrite: true,
        depthTest: true,
        side: 2,
      });
    
      if (!object.geometry.boundingBox) {
        object.geometry.computeBoundingBox();
        object.geometry.computeBoundingSphere();
      }
    
      // Adjusted expansion factor
      const expansionFactor = 1.0;  // Same for both mobile and desktop
      object.geometry.boundingBox?.expandByScalar(expansionFactor);
    
      if (isLeftLens) {
        material.color.setStyle(LENS_COLORS.left);
        leftLensRef.current = object;
        leftLensMeshes.current.push(object);
      } else {
        material.color.setStyle(LENS_COLORS.right);
        rightLensRef.current = object;
        rightLensMeshes.current.push(object);
      }
    
      object.material = material;
      object.userData.interactive = true;
      object.layers.enable(0);
      object.renderOrder = 1;
      object.frustumCulled = false;
      object.matrixAutoUpdate = true;
    };
  
    modelScene.traverse(setupLens);
  }, [modelScene, isMobile]);

  const spectaclesScale = isMobile ? [1, 3, 1] : [4, 4, 4];  // Adjusted scales
const spectaclesPosition = isMobile ? [0, -2.5, 0]: [0, -4, 0];

  return (
    <primitive 
      object={modelScene} 
      scale={spectaclesScale}
      position={spectaclesPosition}
      rotation={[0, 0, 0]}
    />
  );
};

useGLTF.preload('/3d_objects/gr_spectacles_ver_2.glb');

export default Spectacles;