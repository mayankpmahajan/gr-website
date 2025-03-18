import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import Spectacles from './Spectacles';

const LENS_COLORS = {
  left: '#87CEEB',  // Blue
  right: '#ffb3b3'  // Pink/Red
};

// Move hidden texts configuration outside component
const getHiddenTexts = (isMobile) => [
  { 
    id: 1, 
    text: '400+ Members.', 
    top: isMobile ? '5%' : '10%', 
    left: isMobile ? '5%' : '8%',
    className: `font-[Satoshi] font-normal ${isMobile ? 'text-[24px] leading-[40px]' : 'text-[45px] leading-[86px]'} tracking-[-6%]`
  },
  { 
    id: 2, 
    text: '25k+ active members', 
    top: isMobile ? '85%' : '80%', 
    left: isMobile ? '45%' : '60%',
    className: `font-[Satoshi] font-normal ${isMobile ? 'text-[24px] leading-[40px]' : 'text-[45px] leading-[86px]'} tracking-[-6%]`
  },
  { 
    id: 3, 
    text: '20+ Events organised', 
    top: isMobile ? '75%' : '72%', 
    left: isMobile ? '8%' : '12%',
    className: `font-[Satoshi] font-normal ${isMobile ? 'text-[24px] leading-[40px]' : 'text-[45px] leading-[86px]'} tracking-[-6%]`
  },
  {
    id: 4,
    text: '5 chapters',
    top: isMobile ? '15%' : '20%',
    left: isMobile ? '70%' : '72%',
    className: `font-[Satoshi] font-normal ${isMobile ? 'text-[24px] leading-[40px]' : 'text-[45px] leading-[86px]'} tracking-[-6%]`
  }
];

const Hero = () => {
  const [state, setState] = useState(1);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [activeLens, setActiveLens] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const LENS_SIZE = useMemo(() => isMobile ? 100 : 150, [isMobile]);
  const hiddenTexts = useMemo(() => getHiddenTexts(isMobile), [isMobile]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Debounced resize handler
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMagnify = useCallback((side) => {
    if (!isMobile) {
      setIsMagnifying(true);
      setActiveLens(side);
    }
  }, [isMobile]);

  const handlePointerMove = useCallback((event) => {
    if (!isMagnifying || isMobile) return;

    const clientX = event.clientX || (event.touches?.[0]?.clientX ?? 0);
    const clientY = event.clientY || (event.touches?.[0]?.clientY ?? 0);
    
    setCursorPosition({ x: clientX, y: clientY });

    hiddenTexts.forEach(({ id }) => {
      const element = document.querySelector(`#text-${id}`);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const textCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const distance = Math.hypot(
        clientX - textCenter.x,
        clientY - textCenter.y
      );

      gsap.to(element, {
        opacity: distance < LENS_SIZE / 2 ? 1 : 0,
        scale: distance < LENS_SIZE / 2 ? 1 : 0.95,
        duration: distance < LENS_SIZE / 2 ? 0.4 : 0.3,
        ease: distance < LENS_SIZE / 2 ? "power2.out" : "power2.inOut",
        overwrite: true
      });
    });
  }, [isMagnifying, LENS_SIZE, isMobile, hiddenTexts]);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsMagnifying(false);
      setActiveLens(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    const timer = setTimeout(() => setState(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getLensStyle = useCallback(() => {
    const color = activeLens ? LENS_COLORS[activeLens] : null;
    if (!color) return {};
    
    return {
      background: `radial-gradient(circle at center, 
        ${color}88 0%, 
        ${color}66 50%, 
        ${color}00 100%)`,
      border: `2px solid ${color}88`,
      mixBlendMode: 'normal',
      pointerEvents: 'none',
      boxShadow: `0 0 20px ${color}44`,
    };
  }, [activeLens]);

  const canvasProps = useMemo(() => ({
    camera: { 
      position: isMobile ? [0, 0, 30] : [0, 0, 27],  // Moved camera back for better view
      fov: isMobile ? 20 : 25,
      up: [0, 1, 0]              // Consistent FOV for both views
    },
    style: isMobile ? {
      width: '25vw',      // Reduced width for mobile
      height: '15vw',     // Maintain square aspect
      margin: '0 2vw',    // Mobile spacing
    } : {
      width: '25vw',      // Slightly larger for desktop
      height: '15vw',     // Maintain square aspect
      margin: '0 2.5vw',  // Increased desktop spacing
    }
  }), [isMobile]);

  return (
    <main 
      className="bg-[#121212] h-screen relative overflow-hidden"
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      style={{ cursor: isMagnifying && !isMobile ? 'none' : 'default' }}
    >
      {/* Hidden Texts - Only shown on desktop with lens effect */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {hiddenTexts.map((item) => (
            <div
              key={item.id}
              id={`text-${item.id}`}
              className={`absolute ${item.className}`}
              style={{
                top: item.top,
                left: item.left,
                opacity: 0,
                color: 'white',
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}

      {/* Logo */}
      <section className="animate-wiggle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img 
          src="./logo/transparent_geek_room_logo.svg" 
          alt="logo"
          className={isMobile ? "w-[80vw] max-w-[300px]" : ""}
        />
      </section>

      {/* Main Text */}
      <section className="flex flex-col">
        {!isMobile ? (
          <DesktopLayout 
            state={state} 
            canvasProps={canvasProps}
            handleMagnify={handleMagnify}
            isMobile={isMobile}
          />
        ) : (
          <MobileLayout 
            state={state}
            canvasProps={canvasProps}
            handleMagnify={handleMagnify}
            isMobile={isMobile}
          />
        )}

        {/* Magnifying Lens - Only show on desktop */}
        {isMagnifying && activeLens && !isMobile && (
          <div
            style={{
              position: 'fixed',
              left: cursorPosition.x,
              top: cursorPosition.y,
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              zIndex: 1000,
              ...getLensStyle(),
            }}
          />
        )}
      </section>
    </main>
  );
};

// Separate components for desktop and mobile layouts
const DesktopLayout = ({ state, canvasProps, handleMagnify, isMobile }) => (
  <div className="text-white flex mx-[2vw] items-center justify-center h-screen text-[13.5vw] font-satoshi-bold tracking-tight animate-fade-up">
    <span className="mr-4">GEEK R</span>
    
    <div className="relative inline-flex items-center justify-center">
      <Canvas {...canvasProps}>
        <ambientLight intensity={1.5} />
        <Spectacles onMagnify={handleMagnify} isMobile={isMobile} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minPolarAngle={0}           // Allow full vertical rotation
          maxPolarAngle={Math.PI}     // Allow full vertical rotation
          minAzimuthAngle={-Infinity} // Allow full horizontal rotation
          maxAzimuthAngle={Infinity}  // Allow full horizontal rotation
        />
      </Canvas>
    </div>
    
    <span className="ml-4">M</span>
  </div>
);

// Update MobileLayout with the same OrbitControls settings:
const MobileLayout = ({ state, canvasProps, handleMagnify, isMobile }) => (
  <div className="text-white flex flex-col mx-[2vw] justify-center h-screen text-[15vw] font-satoshi-bold tracking-tight animate-fade-up">
    <div className="flex items-center justify-center">
      GEEK
    </div>
    
    <div className="flex items-center justify-center">
      <span className="mr-2">R</span>
      <div className="relative inline-flex items-center justify-center">
        <Canvas {...canvasProps}>
          <ambientLight intensity={1.5} />
          <Spectacles onMagnify={handleMagnify} isMobile={isMobile} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
          />
        </Canvas>
      </div>
      <span className="ml-2">M</span>
    </div>
  </div>
);

export default Hero;