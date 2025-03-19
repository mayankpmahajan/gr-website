import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import Spectacles from './Spectacles';

const LENS_COLORS = {
  left: '#87CEEB',
  right: '#ffb3b3'
};

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

const imageData = [
  {
    id: 1,
    src: "./cc.png",
    alt: "Image 1"
  },
  {
    id: 2,
    src: "./pears.png",
    alt: "Image 2"
  },
  {
    id: 3,
    src: "./cubicle.png",
    alt: "Image 3"
  },
  {
    id: 4,
    src: "./seva.png",
    alt: "Image 4"
  }
];

const Hero = () => {
  const [state, setState] = useState(1);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [activeLens, setActiveLens] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scrollSection, setScrollSection] = useState(0);
  const [showFinalLogo, setShowFinalLogo] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  
  const mainContainerRef = useRef(null);
  const orangeScreenRef = useRef(null);
  const orangeBallRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const logoSectionRef = useRef(null);

  const [mSlideComplete, setMSlideComplete] = useState(false);
  const [spectaclesVisible, setSpectaclesVisible] = useState(false);
  
  const LENS_SIZE = useMemo(() => isMobile ? 100 : 150, [isMobile]);
  const hiddenTexts = useMemo(() => getHiddenTexts(isMobile), [isMobile]);

  const logElementState = (ref, name) => {
    if (!ref.current) return;
    const computedStyle = window.getComputedStyle(ref.current);
    console.log(`${name} state:`, {
      opacity: computedStyle.opacity,
      visibility: computedStyle.visibility,
      scale: computedStyle.transform,
      zIndex: computedStyle.zIndex
    });
  };

  useEffect(() => {
    // First animation: Slide in the M
    const slideTimer = setTimeout(() => {
      setMSlideComplete(true);
    }, 800);
    
    // Second animation: Show spectacles after M has slid in
    const spectaclesTimer = setTimeout(() => {
      setSpectaclesVisible(true);
    }, 1600);
    
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(spectaclesTimer);
    };
  }, []);

  useEffect(() => {
    let logoTimeout;
    
    if (scrollSection === 3) {
      logoTimeout = setTimeout(() => {
        setShowFinalLogo(true);
        console.log("Setting final logo state to TRUE");
      }, 200);
    } else {
      setShowFinalLogo(false);
    }
    
    return () => clearTimeout(logoTimeout);
  }, [scrollSection]);

  useEffect(() => {
    const updateViewportDimensions = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    
    updateViewportDimensions();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewportDimensions, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      const navbarHeight = window.innerWidth < 768 ? 80 : 60;
      document.documentElement.style.setProperty('--navbar-offset', `${navbarHeight}px`);
    };
    checkMobile();
    
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

  const debugElements = () => {
    if (orangeBallRef.current) {
      console.log("Orange Ball:", {
        opacity: orangeBallRef.current.style.opacity,
        visibility: orangeBallRef.current.style.visibility,
        transform: orangeBallRef.current.style.transform,
        zIndex: orangeBallRef.current.style.zIndex
      });
    }
    
    if (logoSectionRef.current) {
      const logoStyles = window.getComputedStyle(logoSectionRef.current);
      console.log("Logo Section:", {
        opacity: logoStyles.opacity,
        visibility: logoStyles.visibility,
        transform: logoStyles.transform,
        zIndex: logoStyles.zIndex
      });
    }

    console.log("Viewport:", {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollY: window.scrollY
    });
  };

  useEffect(() => {
    if (!mainContainerRef.current) return;

    let lastScrollPosition = 0;
    let scrollDirection = 'down';

    const sectionHeight = viewportHeight;
    const sections = 4;
    
    mainContainerRef.current.style.height = `${sections * sectionHeight}px`;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      scrollDirection = scrollPosition > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = scrollPosition;
      const effectiveHeight = window.innerHeight - 80;
      const totalHeight = sections * effectiveHeight;
      
      const currentSectionFloat = scrollPosition / sectionHeight;
      
      const windowHeight = window.innerHeight;
      const currentSection = Math.min(Math.floor(scrollPosition / windowHeight), sections - 1);
      setScrollSection(currentSection);
      
      const sectionProgress = (scrollPosition - (currentSection * windowHeight)) / windowHeight;
      if (currentSection === 3 || (currentSection === 2 && sectionProgress > 0.8)) {
        setShowFinalLogo(true);
      } else {
        setShowFinalLogo(false);
      }

      if (currentSection === 2 || currentSection === 3) {
        logElementState(orangeBallRef, 'Orange Ball');
        logElementState(logoSectionRef, 'Logo Section');
      }
      
      if (currentSection === 0) {
        if (orangeScreenRef.current) {
          gsap.to(orangeScreenRef.current, {
            scale: sectionProgress * 20,
            opacity: sectionProgress,
            duration: 0.1,
            ease: "none",
            visibility: sectionProgress > 0 ? 'visible' : 'hidden'
          });
        }
      } 
      
      else if (currentSection === 1) {
        if (orangeScreenRef.current) {
          gsap.to(orangeScreenRef.current, {
            scale: 20,
            opacity: 1,
            visibility: 'visible',
            duration: 0.1
          });
        }
        
        if (cardsContainerRef.current) {
          if (sectionProgress < 0.5) {
            gsap.to(cardsContainerRef.current, {
              opacity: sectionProgress * 2,
              x: (0.5 - sectionProgress) * 200,
              duration: 0.1,
              ease: "none"
            });
          } else {
            gsap.to(cardsContainerRef.current, {
              opacity: 2 - sectionProgress * 2,
              x: (sectionProgress - 0.5) * -200,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      }
      
      else if (currentSection === 2) {
        if (orangeBallRef.current) {
          orangeBallRef.current.style.width = '120px';
          orangeBallRef.current.style.height = '120px';
          orangeBallRef.current.style.top = '50%';
          orangeBallRef.current.style.left = '50%';
          orangeBallRef.current.style.transform = `translate(-50%, -50%) scale(${sectionProgress})`;
          orangeBallRef.current.style.borderRadius = '50%';
          orangeBallRef.current.style.opacity = String(sectionProgress);
          orangeBallRef.current.style.visibility = 'visible';
        }
        
        if (orangeScreenRef.current) {
          const progress = Math.min(sectionProgress * 1.2, 1);
          const size = Math.max(10, 100 - (progress * 90));
          const borderRadius = Math.min(50, progress * 50); 
          
          gsap.to(orangeScreenRef.current, {
            width: `${size}vmin`,
            height: `${size}vmin`,
            borderRadius: `${borderRadius}%`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            duration: 0.2,
            ease: "power2.out"
          });
          
          if (progress > 0.8) {
            const fadeOutProgress = (progress - 0.8) * 8;
            gsap.to(orangeScreenRef.current, {
              opacity: 1 - fadeOutProgress,
              duration: 0.2,
              ease: "power1.inOut"
            });
            
            if (orangeBallRef.current) {
              gsap.to(orangeBallRef.current, {
                opacity: fadeOutProgress,
                scale: fadeOutProgress,
                visibility: 'visible',
                duration: 0.2,
                ease: "power1.out"
              });
            }
          }
        }
      }
      
      else if (currentSection === 3) {
        debugElements();
        const smoothProgress = Math.min(1, sectionProgress * 1.2);
        const slowProgress = Math.min(1, sectionProgress * 0.8);
    
        if (orangeBallRef.current) {
          const ballOpacity = slowProgress < 0.4 ? 1 : Math.max(0, 1 - ((slowProgress - 0.4) * 1.7));
          
          orangeBallRef.current.style.opacity = String(ballOpacity);
          orangeBallRef.current.style.visibility = smoothProgress > 0.7 ? 'hidden' : 'visible';
          
          const pulseEffect = 1 + Math.sin(slowProgress * Math.PI * 4) * 0.05;
          const ballScale = slowProgress < 0.4 ? 
            1 * pulseEffect :
            Math.max(0.2, 1 - ((slowProgress - 0.4) * 1.2)) * pulseEffect;
          
          orangeBallRef.current.style.transform = `translate(-50%, -50%) scale(${ballScale * pulseEffect})`;
          gsap.to(orangeBallRef.current, {
            opacity: ballOpacity,
            scale: ballScale,
            duration: 0.25,
            ease: "power2.inOut",
            visibility: ballOpacity < 0.1 ? 'hidden' : 'visible'
          });
        }
    
        if (logoSectionRef.current) {
          const logoOpacity = slowProgress < 0.4 ? 0 : Math.min(1, (slowProgress - 0.4) * 1.7);
          const logoScale = slowProgress < 0.4 ? 
            0.3 :
            0.3 + ((slowProgress - 0.4) * 1.2); 
          gsap.to(logoSectionRef.current, {
            opacity: logoOpacity,
            scale: logoScale,
            visibility: logoOpacity > 0 ? 'visible' : 'hidden',
            duration: 0.3,
            ease: "power1.out"
          });

          logoSectionRef.current.style.opacity = String(logoOpacity);
          logoSectionRef.current.style.visibility = 'visible';
          
          logoSectionRef.current.style.transform = `scale(${logoScale})`;
          logoSectionRef.current.style.zIndex = '100';

          const textElements = logoSectionRef.current.querySelectorAll('.logo-text');
          textElements.forEach((element, index) => {
            const staggerDelay = index * 0.05;
            const textProgress = slowProgress < 0.6 ? 0 : 
              Math.max(0, Math.min(1, (slowProgress - 0.6 - staggerDelay) * 2.5));
              gsap.to(element, {
                opacity: textProgress,
                y: (1 - textProgress) * 15,
                duration: 0.25,
                ease: "power2.out"
              });
            
          });
        }
      }
    };

    gsap.set(orangeScreenRef.current, { 
      opacity: 0, 
      scale: 0, 
      visibility: 'hidden',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      borderRadius: '0%',
      transform: 'none'
    });
    gsap.set(orangeBallRef.current, { opacity: 0, scale: 0, visibility: 'hidden', transformOrigin: 'center center'});
    gsap.set(logoSectionRef.current, { 
      opacity: 0, 
      scale: 0.3,
      visibility: 'hidden',
      zIndex: 100,
      transformOrigin: 'center center'
    });
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewportHeight]);

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
      position: isMobile ? [0, 0, 30] : [0, 0, 27],
      fov: isMobile ? 20 : 25,
      up: [0, 1, 0]
    },
    style: isMobile ? {
      width: '25vw',
      height: '15vw',
      margin: '0 2vw',
    } : {
      width: '25vw',
      height: '15vw',
      margin: '0 2.5vw',
    }
  }), [isMobile]);

  const LogoWithText = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <img 
        src="./gr.svg" 
        alt="Geek Room Logo"
        className={isMobile ? "w-[70vw] max-w-[250px]" : "w-[30vw] max-w-[400px]"}
      />
      
      <div className="absolute top-16 left-16 md:top-24 md:left-24 text-right text-2xl md:text-4xl font-bold text-white">
        <div className="logo-text">400+</div>
        <div className="logo-text">Members</div>
      </div>
      
      <div className="absolute top-16 right-16 md:top-24 md:right-24 text-left text-2xl md:text-4xl font-bold text-white">
        <div className="logo-text">20+ events</div>
        <div className="logo-text">organised</div>
      </div>
      
      <div className="absolute bottom-16 left-16 md:bottom-24 md:left-24 text-right text-2xl md:text-4xl font-bold text-white">
        <div className="logo-text">25k+</div>
        <div className="logo-text">active members</div>
      </div>
      
      <div className="absolute bottom-16 right-16 md:bottom-24 md:right-24 text-left text-2xl md:text-4xl font-bold text-white">
        <div className="logo-text">5</div>
        <div className="logo-text">Chapters</div>
      </div>
    </div>
  );

  return (
    <div 
      ref={mainContainerRef}
      className="relative"
      style={{ overflowX: 'hidden' }}
    >
      <main 
        className="bg-[#121212] h-screen fixed w-full top-0 left-0 overflow-hidden"
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        style={{ 
          cursor: isMagnifying && !isMobile ? 'none' : 'default',
          opacity: scrollSection === 0 ? 1 : 0,
          visibility: scrollSection === 0 ? 'visible' : 'hidden',
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
          zIndex: 40,
        }}
      >
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
        <section className="animate-wiggle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img 
            src="./gr.svg" 
            alt="logo"
            className={isMobile ? "w-[80vw] max-w-[300px]" : "w-[80vw] max-w-[300px]"}
          />
        </section>
        <section className="flex flex-col">
          {!isMobile ? (
            <DesktopLayout 
              state={state} 
              canvasProps={canvasProps}
              handleMagnify={handleMagnify}
              isMobile={isMobile}
              mSlideComplete={mSlideComplete}
              spectaclesVisible={spectaclesVisible}
            />
          ) : (
            <MobileLayout 
              state={state}
              canvasProps={canvasProps}
              handleMagnify={handleMagnify}
              isMobile={isMobile}
              mSlideComplete={mSlideComplete}
              spectaclesVisible={spectaclesVisible}
            />
          )}

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

      <div 
        ref={orangeScreenRef}
        className="fixed inset-0 bg-orange-500 flex items-center justify-center transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: 0,
          zIndex: 30,
          width: '100vw',
          height: '100vh',
          transformOrigin: 'center center'
        }}
      >
        <div 
          ref={cardsContainerRef}
          className="flex flex-row items-center justify-center gap-4 md:gap-6 w-full px-4 overflow-x-auto"
          style={{ opacity: 0 }}
        >
          {imageData.map((image) => (
            <div 
              key={image.id} 
              className="flex-shrink-0 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="h-3 md:h-4 w-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div 
        className="fixed inset-0 bg-[#121212]"
        style={{ 
          opacity: scrollSection === 2 ? 1 : 0,
          zIndex: 15,
          transition: 'opacity 0.3s ease-in-out',
          visibility: scrollSection === 2 ? 'visible' : 'hidden'
        }}
      />

      <div 
        ref={orangeBallRef}
        className="fixed bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ 
          opacity: 0,
          zIndex: 20,
          width: "120px",
          height: "120px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: '0 0 100px 50px rgba(0, 0, 0, 0.5)',
          visibility: 'hidden'
        }}
      />

      <div 
        ref={logoSectionRef}
        className="fixed inset-0 bg-[#121212] flex items-center justify-center"
        style={{ 
          opacity: 0,
          visibility: 'hidden',
          zIndex: 100,
        }}
      >
        <div className="absolute top-4 left-4 text-white text-4xl">DEBUG MARKER</div>
        <LogoWithText />
      </div>

      {showFinalLogo && (
        <div 
          className="fixed inset-0 bg-[#121212] flex items-center justify-center z-[999]"
          style={{
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center pb-24">
            <img 
              src="./gr.svg" 
              alt="Geek Room Logo"
              className={isMobile ? "w-[50vw] max-w-[200px]" : "w-[20vw] max-w-[300px]"}
              style={{ objectFit: 'contain' }}
            />
            
            <div className="absolute top-16 left-16 md:top-24 md:left-24 text-right text-xl md:text-3xl font-satoshi-medium text-white">
            <div className="logo-text font-satoshi-medium">400+</div>
            <div className="logo-text font-satoshi-medium">Members</div>
            </div>
            
            <div className="absolute top-16 right-16 md:top-24 md:right-24 text-left text-xl md:text-3xl font-satoshi-medium text-white">
            <div className="logo-text font-satoshi-medium">20+ events</div>
            <div className="logo-text font-satoshi-medium">organised</div>
            </div>
            
            <div className="absolute bottom-16 left-16 md:bottom-24 md:left-24 text-right text-xl md:text-3xl font-satoshi-medium text-white">
            <div className="logo-text font-satoshi-medium">25k+</div>
            <div className="logo-text font-satoshi-medium">active members</div>
            </div>
            
            <div className="absolute bottom-16 right-16 md:bottom-24 md:right-24 text-left text-xl md:text-3xl font-satoshi-medium text-white">
            <div className="logo-text font-satoshi-medium">5</div>
            <div className="logo-text font-satoshi-medium">Chapters</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DesktopLayout = ({ state, canvasProps, handleMagnify, isMobile, mSlideComplete, spectaclesVisible }) => (
  <div className="text-white flex mx-[2vw] items-center justify-center h-screen text-[13.5vw] font-satoshi-bold tracking-tight animate-fade-up">
    <span className="mr-4">GEEK R</span>
    
    <div 
    className="relative inline-flex items-center justify-center transition-all duration-500"
    style={{ 
        opacity: spectaclesVisible ? 1 : 0,
        transform: spectaclesVisible ? 'translateX(0)' : 'translateX(-20px)',
        width: spectaclesVisible ? 'auto' : '0px',
        overflow: 'hidden'
      }}
    >
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
    
    <span 
      className="ml-4 transition-all duration-700 ease-out"
      style={{ 
        transform: mSlideComplete ? 'translateX(0)' : 'translateX(-100vw)',
        opacity: mSlideComplete ? 1 : 0
      }}
    >
      M
    </span>
  </div>
);

const MobileLayout = ({ state, canvasProps, handleMagnify, isMobile, mSlideComplete, spectaclesVisible }) => (
  <div className="text-white flex flex-col mx-[2vw] justify-center h-screen text-[15vw] font-satoshi-bold tracking-tight animate-fade-up">
    <div className="flex items-center justify-center">
      GEEK
    </div>
    
    <div className="flex items-center justify-center">
      <span className="mr-2">R</span>
      <div 
      className="relative inline-flex items-center justify-center transition-all duration-500"
      style={{ 
          opacity: spectaclesVisible ? 1 : 0,
          transform: spectaclesVisible ? 'translateX(0)' : 'translateX(-20px)',
          width: spectaclesVisible ? 'auto' : '0px', 
          overflow: 'hidden'
        }}
      >
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
      <span 
        className="ml-2 transition-all duration-700 ease-out"
        style={{ 
          transform: mSlideComplete ? 'translateX(0)' : 'translateX(-100vw)',
          opacity: mSlideComplete ? 1 : 0
        }}
      >
        M
      </span>
    </div>
  </div>
);

export default Hero;