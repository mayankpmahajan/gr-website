import React, { useState, useEffect } from 'react';

function Partners() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isDesktop = viewportWidth >= 1024;

  const partnerLogos = [
    { 
      id: 1, 
      logo: 'aihello.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 4, 
      aspectRatio: '7/5',
      offsetX: 0,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 2, 
      logo: 'groq.jpeg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 3, 
      aspectRatio: '1/1',
      offsetX: 4,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 3, 
      logo: 'involead.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 3, 
      aspectRatio: '1/1',
      offsetX: 0,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 4, 
      logo: 'mastercard.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 4, 
      aspectRatio: '8/3',
      offsetX: 0,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 5, 
      logo: 'microsoft.png', 
      colspan: isMobile ? 12 : isTablet ? 6 : 3, 
      aspectRatio: '5/4',
      offsetX: 2,
      offsetY: 1,
      customPosition: true,
      gridColumnStart: 6,
      gridRowStart: 2
    },
    { 
      id: 6, 
      logo: 'neoapps.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 2, 
      aspectRatio: '4/5',
      offsetX: 0,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 7, 
      logo: 'pathway.png', 
      colspan: isMobile ? 12 : isTablet ? 6 : 5, 
      aspectRatio: '5/2',
      offsetX: 0,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 8, 
      logo: 'pears.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 3, 
      aspectRatio: '5/5',
      offsetX: 4,
      offsetY: 0,
      customPosition: false
    },
    { 
      id: 9, 
      logo: 'reactive.jpg', 
      colspan: isMobile ? 12 : isTablet ? 6 : 4, 
      aspectRatio: '7/4',
      offsetX: 0,
      offsetY: -8,
      customPosition: false
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 sm:px-8 py-8 sm:py-16">
      <h1 
        className="text-white mb-6 sm:mb-12 font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        OUR PARTNERS
      </h1>
      
      <div className="grid grid-cols-12 gap-4 relative" style={{ gridAutoRows: 'minmax(100px, auto)' }}>
        {partnerLogos.map((item) => {
          const positionStyle = {};
          
          if (item.customPosition) {
            positionStyle.gridColumnStart = item.gridColumnStart;
            positionStyle.gridColumnEnd = `span ${item.colspan}`;
            positionStyle.gridRowStart = item.gridRowStart;
          } else {
            positionStyle.gridColumn = `${item.offsetX > 0 ? item.offsetX + 1 : 'auto'} / span ${item.colspan}`;
            positionStyle.marginTop = item.offsetY !== 0 ? `${item.offsetY * 1.5}rem` : '0';
            positionStyle.zIndex = item.offsetY < 0 ? 10 : 'auto';
          }
          
          positionStyle.aspectRatio = item.aspectRatio;
          
          return (
            <div
              key={item.id}
              className="border-2 border-gray-500 hover:border-white transition-colors duration-300 rounded-xl overflow-hidden"
              style={positionStyle}
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <img 
                    src={`/${item.logo}`} 
                    alt={`Partner ${item.id}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Partners;
