import React, { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector2, Object3D } from 'three';
import { useGLTF } from '@react-three/drei';

function Spectacles() {
  const { scene, camera } = useThree();
  const { scene: modelScene } = useGLTF('/3d_objects/gr_spectacles_ver_2.glb');
  const leftLensRef = useRef();
  const rightLensRef = useRef();
  const mousePosition = useRef(new Vector2());
  const raycaster = useRef(new Raycaster());
  
  // Store original colors to restore them when not hovering
  const [originalLeftColor, setOriginalLeftColor] = useState(null);
  const [originalRightColor, setOriginalRightColor] = useState(null);

  // Function to handle click on left lens
  const onLeftLensClick = () => {
    console.log("Left lens clicked!");
    if (leftLensRef.current) {
      leftLensRef.current.material.color.setHex(0xff0000);
    }
  };

  // Function to handle click on right lens
  const onRightLensClick = () => {
    console.log("Right lens clicked!");
    if (rightLensRef.current) {
      rightLensRef.current.material.color.setHex(0x0000ff);
    }
  };

  const handleMouseMove = (event) => {
    // Calculate mouse position in normalized device coordinates
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster's origin and direction based on the camera and mouse position
    raycaster.current.setFromCamera(mousePosition.current, camera);

    // Check for intersections with the lenses
    const intersects = raycaster.current.intersectObjects([
      leftLensRef.current,
      rightLensRef.current
    ], true);

    // Reset colors first
    if (leftLensRef.current && originalLeftColor) {
      leftLensRef.current.material.color.setHex(originalLeftColor);
    }
    if (rightLensRef.current && originalRightColor) {
      rightLensRef.current.material.color.setHex(originalRightColor);
    }

    // Apply hover color if intersecting
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      let currentObject = intersectedObject;
      
      while (currentObject) {
        if (currentObject === leftLensRef.current) {
          leftLensRef.current.material.color.setHex(0x00ff00); // Green for hover
          break;
        } else if (currentObject === rightLensRef.current) {
          rightLensRef.current.material.color.setHex(0x00ff00); // Green for hover
          break;
        }
        currentObject = currentObject.parent;
      }
    }
  };

  const handleClick = (event) => {
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mousePosition.current, camera);

    const intersects = raycaster.current.intersectObjects([
      leftLensRef.current,
      rightLensRef.current
    ], true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      console.log('Intersected object name:', intersectedObject.name);
      
      let currentObject = intersectedObject;
      while (currentObject) {
        if (currentObject === leftLensRef.current) {
          onLeftLensClick();
          break;
        } else if (currentObject === rightLensRef.current) {
          onRightLensClick();
          break;
        }
        currentObject = currentObject.parent;
      }
    }
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera]);

  // Initialize lens references when the model loads
  useEffect(() => {
    console.log('Model scene loaded, searching for lenses...');
    
    modelScene.traverse((object) => {
      if (object.isMesh) {
        console.log('Found mesh in scene:', object.name);
        if (object.material) {
          object.material.transparent = true;
          object.material.opacity = 0.6;
        }
      }
    });

    const leftLens = findMeshByNamePattern(modelScene, 'polySurface2_Glass_0');
    const rightLens = findMeshByNamePattern(modelScene, 'polySurface3_Glass_0');

    if (leftLens) {
      console.log('Left lens found:', leftLens.name);
      leftLensRef.current = leftLens;
      if (leftLens.material) {
        leftLens.material.transparent = true;
        leftLens.material.opacity = 0.5;
        leftLens.material.depthWrite = false;
        // Store original color
        setOriginalLeftColor(leftLens.material.color.getHex());
      }
    } else {
      console.warn('Left lens not found in the model');
    }

    if (rightLens) {
      console.log('Right lens found:', rightLens.name);
      rightLensRef.current = rightLens;
      if (rightLens.material) {
        rightLens.material.transparent = true;
        rightLens.material.opacity = 0.5;
        rightLens.material.depthWrite = false;
        // Store original color
        setOriginalRightColor(rightLens.material.color.getHex());
      }
    } else {
      console.warn('Right lens not found in the model');
    }
  }, [modelScene]);

  // Function to find meshes by name pattern
  const findMeshByNamePattern = (scene: Object3D, pattern: string) => {
    let found = null;
    scene.traverse((object) => {
      if (object.isMesh && object.name.includes(pattern)) {
        console.log('Found mesh:', object.name);
        found = object;
      }
    });
    return found;
  };

  return (
    <primitive object={modelScene} scale={[5, 5, 5]} />
  );
}

export default Spectacles;