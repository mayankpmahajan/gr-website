import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileIndicator from "./profile-indicator";

const carouselData = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=500&width=300",
    user: {
      name: "Hame",
      position: "Position",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=500&width=300",
    user: {
      name: "Alex",
      position: "Designer",
      avatar: "/placeholder.svg?height=40&width=40&text=A",
    },
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=500&width=300",
    user: {
      name: "Maria",
      position: "Developer",
      avatar: "/placeholder.svg?height=40&width=40&text=M",
    },
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=500&width=300",
    user: {
      name: "John",
      position: "Marketer",
      avatar: "/placeholder.svg?height=40&width=40&text=J",
    },
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder.svg?height=500&width=300",
    user: {
      name: "John",
      position: "Marketer",
      avatar: "/placeholder.svg?height=40&width=40&text=J",
    },
  },
];

export default function CoreTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);
  const itemsPerView = 4;
  const totalItems = carouselData.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleProfileClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const activeItem = carouselData[activeIndex];

  return (
    <>
      <h1 className="md:text-6xl mt-20 text-5xl text-white font-bold text-center mb-32">
        THE CORE
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-6 justify-between pb-20 items-center w-full max-w-screen-xl mx-auto px-4">
        {/* Left Side - Image Carousel (BIG SIZE) */}
        <div className="relative w-full lg:w-2/5 max-w-lg">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video relative shadow-md">
            <img
              src={activeItem.image}
              alt={`Slide ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 gap-2 sm:gap-3">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-colors ${
                  index === activeIndex ? "bg-orange-600" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Middle Section - Video and User Info (SHIFTED RIGHT) */}
        <div className="relative w-full lg:w-1/4 max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-300 bg-white">
          <div className="bg-white p-3 flex items-center gap-2 border-b border-gray-300">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm">
              <img
                src={activeItem.user.avatar}
                alt={activeItem.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-gray-800">
              <div className="text-sm font-semibold">
                {activeItem.user.name}
              </div>
              <div className="text-xs text-gray-500">
                {activeItem.user.position}
              </div>
            </div>
          </div>

          <div className="aspect-[9/16] relative group w-full">
            <img
              ref={videoRef}
              src={activeItem.video}
              alt={`Video ${activeIndex + 1}`}
              className="w-full h-full object-cover brightness-95 group-hover:brightness-110 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Side - Profile Indicators + Arrows (COMPACT) */}
        <div className="flex flex-col lg:items-end gap-4 relative w-full lg:w-1/10 md:pr-10  max-w-xs">
          <div className="flex overflow-hidden lg:h-60 lg:flex-col flex-row items-center justify-center">
            {Array.from({ length: itemsPerView }).map((_, i) => {
              const index = (activeIndex + i) % totalItems;
              return (
                <ProfileIndicator
                  key={carouselData[index].id}
                  avatar={carouselData[index].user.avatar}
                  isActive={i === 0}
                  onClick={() => setActiveIndex(index)}
                  className="mx-1 lg:mx-0"
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex lg:flex-col items-center justify-center gap-2 mt-2">
            <button
              onClick={handlePrev}
              className="bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="lg:rotate-90" />
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="lg:rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
