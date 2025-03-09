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
        {/* Image Carousel */}
        <div className="relative w-full lg:w-2/5 max-w-lg">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video relative shadow-md">
            <img
              src={activeItem.image}
              alt={`Slide ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 gap-1 sm:gap-2 relative">
            {carouselData.map((_, index) => {
              const totalVisibleDots = 5;
              const midPoint = Math.floor(totalVisibleDots / 2);
              let scaleClass = "scale-75 opacity-50";

              if (
                index === activeIndex ||
                (totalItems > totalVisibleDots &&
                  index >= activeIndex - midPoint &&
                  index <= activeIndex + midPoint)
              ) {
                scaleClass =
                  index === activeIndex
                    ? "scale-110 opacity-100"
                    : "scale-90 opacity-80";
              }

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${scaleClass} ${
                    index === activeIndex ? "bg-orange-600" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Middle Section - Video */}
        <div className="relative w-full lg:w-1/4 max-w-sm rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
          {/* Profile Section */}
          <div className="bg-white p-4 flex items-center gap-3 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
              <img
                src={activeItem.user.avatar}
                alt={activeItem.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-gray-900">
              <div className="text-base font-bold">{activeItem.user.name}</div>
              <div className="text-sm text-gray-500">
                {activeItem.user.position}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative aspect-[9/16] group w-full bg-gray-100">
            <img
              ref={videoRef}
              src={activeItem.video}
              alt={`Video ${activeIndex + 1}`}
              className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-300"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10"></div>

            {/* Hover Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-12 h-12 bg-black/30 rounded-full p-2 shadow-xl hover:bg-black/50 transition-all duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5L18.75 12 5.25 5.25z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Profile Indicators + Arrows */}
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
