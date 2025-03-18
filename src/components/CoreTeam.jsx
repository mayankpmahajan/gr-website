"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProfileIndicator from "./ui/ProfileIndicator"

const carouselData = [
  {
    id: 1,
    image: "/core/image/manasChopra.jpg",
    video: "/core/video/manas.mp4",
    user: {
      name: "Manas Chopra",
      position: "Co - Founder",
      avatar: "/core/image/manasChopra.jpg",
      description:
        "Manas is a visionary leader with a passion for innovation. With extensive experience in the industry, he drives our team forward with strategic insights and creative solutions.",
      instagram: "https://instagram.com/manaschopra",
      linkedin: "https://linkedin.com/in/manaschopra",
      github: "https://github.com/manaschopra",
    },
  },
  {
    id: 2,
    image: "/core/image/prathamBatra.jpg",
    video: "/core/video/pratham.mp4",
    user: {
      name: "Pratham Batra",
      position: "Co - Founder",
      avatar: "/core/image/prathamBatra.jpg",
      description:
        "Pratham is a dynamic entrepreneur with a knack for problem-solving. His expertise in technology and business strategy makes him an invaluable asset to our team.",
      instagram: "https://instagram.com/prathambatra",
      linkedin: "https://linkedin.com/in/prathambatra",
      github: "https://github.com/prathambatra",
    },
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=500",
    video: "/core/video/garima.mp4",
    user: {
      name: "Garima",
      position: "Developer",
      avatar: "/placeholder.svg?height=40&width=40&text=M",
      description:
        "Maria is a skilled developer with a passion for creating innovative and user-friendly applications. Her expertise in front-end and back-end development makes her a valuable asset to our team.",
      instagram: "https://instagram.com/maria",
      linkedin: "https://linkedin.com/in/maria",
      github: "https://github.com/maria",
    },
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=500",
    video: "/core/video/akshay.mp4",
    user: {
      name: "Akshay Kumar Sharma",
      position: "Marketer",
      avatar: "/placeholder.svg?height=40&width=40&text=J",
      description:
        "John is a creative marketer with a passion for building brands and driving growth. His expertise in digital marketing and social media makes him an invaluable asset to our team.",
      instagram: "https://instagram.com/john",
      linkedin: "https://linkedin.com/in/john",
      github: "https://github.com/john",
    },
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=500",
    video: "/core/video/mayank.mp4",
    user: {
      name: "Mayank Mahajan",
      position: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=S",
      description:
        "Sarah is a detail-oriented product manager with a passion for creating innovative and user-friendly products. Her expertise in product development and market research makes her an invaluable asset to our team.",
      instagram: "https://instagram.com/sarah",
      linkedin: "https://linkedin.com/in/sarah",
      github: "https://github.com/sarah",
    },
  },
  {
    id: 6,
    image: "/core/image/manasChopra.jpg",
    video: "/core/video/manas.mp4",
    user: {
      name: "Manas Chopra",
      position: "Co - Founder",
      avatar: "/core/image/manasChopra.jpg",
      description:
        "Manas is a visionary leader with a passion for innovation. With extensive experience in the industry, he drives our team forward with strategic insights and creative solutions.",
      instagram: "https://instagram.com/manaschopra",
      linkedin: "https://linkedin.com/in/manaschopra",
      github: "https://github.com/manaschopra",
    },
  },
  {
    id: 7,
    image: "/core/image/prathamBatra.jpg",
    video: "/core/video/pratham.mp4",
    user: {
      name: "Pratham Batra",
      position: "Co - Founder",
      avatar: "/core/image/prathamBatra.jpg",
      description:
        "Pratham is a dynamic entrepreneur with a knack for problem-solving. His expertise in technology and business strategy makes him an invaluable asset to our team.",
      instagram: "https://instagram.com/prathambatra",
      linkedin: "https://linkedin.com/in/prathambatra",
      github: "https://github.com/prathambatra",
    },
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=500",
    video: "/core/video/garima.mp4",
    user: {
      name: "Garima",
      position: "Developer",
      avatar: "/placeholder.svg?height=40&width=40&text=M",
      description:
        "Maria is a skilled developer with a passion for creating innovative and user-friendly applications. Her expertise in front-end and back-end development makes her a valuable asset to our team.",
      instagram: "https://instagram.com/maria",
      linkedin: "https://linkedin.com/in/maria",
      github: "https://github.com/maria",
    },
  },
]

export default function CoreTeam() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [direction, setDirection] = useState("next")
  const videoRefs = useRef([])
  const FACES = 4 // Number of faces in the cuboid
  const totalItems = carouselData.length
  const [visibleStartIndex, setVisibleStartIndex] = useState(0)

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, carouselData.length)
  }, [])

  // Calculate the current set (group of 4) and position within that set
  const currentSet = Math.floor(activeIndex / FACES)
  const positionInSet = activeIndex % FACES

  // Calculate the rotation angle for the cube based on position in the current set
  const cubeRotation = `rotateY(${positionInSet * -90}deg)`

  const handleNext = () => {
    if (isFlipping) return
    setDirection("next")
    setIsFlipping(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems)
      setVisibleStartIndex((prev) => (prev + 1) % totalItems)
      setTimeout(() => {
        setIsFlipping(false)
      }, 500)
    }, 500)
  }

  const handlePrev = () => {
    if (isFlipping) return
    setDirection("prev")
    setIsFlipping(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
      setVisibleStartIndex((prev) => (prev - 1 + totalItems) % totalItems)
      setTimeout(() => {
        setIsFlipping(false)
      }, 500)
    }, 500)
  }

  const handleProfileClick = (index) => {
    if (isFlipping || index === activeIndex) return
    setDirection(index > activeIndex ? "next" : "prev")
    setIsFlipping(true)
    setTimeout(() => {
      setActiveIndex(index)
      setVisibleStartIndex(index)
      setTimeout(() => {
        setIsFlipping(false)
      }, 500)
    }, 500)
  }

  // Play the active video and pause others
  useEffect(() => {
    if (isFlipping) return

    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === activeIndex) {
          videoRef.currentTime = 0
          const playPromise = videoRef.play()

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Auto-play was prevented:", error)
            })
          }
        } else {
          videoRef.pause()
        }
      }
    })
  }, [activeIndex, isFlipping])

  // Handle video end event to automatically move to next slide
  useEffect(() => {
    const videoElement = videoRefs.current[activeIndex]

    const handleVideoEnd = () => {
      handleNext()
    }

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd)
      }
    }
  }, [activeIndex, isFlipping])

  // Get the current set of 4 items for the cuboid faces
  const getCurrentSetItems = () => {
    const startIdx = currentSet * FACES
    const items = []

    // Add items from the current set
    for (let i = 0; i < FACES; i++) {
      const dataIndex = startIdx + i
      if (dataIndex < totalItems) {
        items.push({
          dataIndex,
          data: carouselData[dataIndex],
        })
      }
    }

    // If we don't have 4 items in the current set, wrap around to the beginning
    if (items.length < FACES) {
      for (let i = 0; i < FACES - items.length; i++) {
        items.push({
          dataIndex: i,
          data: carouselData[i],
        })
      }
    }

    return items
  }

  const currentSetItems = getCurrentSetItems()

  return (
    <>
      <h1 className="md:text-9xl mt-20 text-5xl text-white font-bold text-center mb-32">THE CORE</h1>

      <div className="flex flex-col lg:flex-row gap-6 justify-between pb-20 items-center w-full max-w-screen-xl mx-auto px-4">
        {/* Left Side - Team Member Info Card */}
        <div className="relative w-full lg:w-2/5 max-w-lg">
          <div className="bg-[#232323] text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 p-6 flex flex-col h-full min-h-[300px]">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">{carouselData[activeIndex].user.name}</h2>
              <p className="text-gray-400">{carouselData[activeIndex].user.position}</p>
            </div>

            <div className="flex-grow">
              <p className="text-gray-300 leading-relaxed">
                {carouselData[activeIndex].user.description ||
                  `${carouselData[activeIndex].user.name} is a talented professional with extensive experience in their field. They bring unique insights and valuable contributions to our team.`}
              </p>
            </div>

            <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-700">
              <a
                href={carouselData[activeIndex].user.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={carouselData[activeIndex].user.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href={carouselData[activeIndex].user.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-100 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 gap-1 sm:gap-2 relative">
            {carouselData.map((_, index) => {
              const totalVisibleDots = 5
              const midPoint = Math.floor(totalVisibleDots / 2)
              let scaleClass = "scale-75 opacity-50"

              if (
                index === activeIndex ||
                (totalItems > totalVisibleDots && index >= activeIndex - midPoint && index <= activeIndex + midPoint)
              ) {
                scaleClass = index === activeIndex ? "scale-110 opacity-100" : "scale-90 opacity-80"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleProfileClick(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${scaleClass} ${
                    index === activeIndex ? "bg-orange-600" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            })}
          </div>
        </div>

        {/* Middle Section - 3D Cube Animation */}
        <div className="relative w-full lg:w-1/4 max-w-sm" style={{ perspective: "1000px", height: "500px" }}>
          <div
            className="cube-container w-full h-full relative"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 1s ease",
              transform: cubeRotation,
              height: "100%",
            }}
          >
            {/* Create all 4 faces of the cube */}
            {currentSetItems.map((item, faceIndex) => {
              const rotation = faceIndex * 90

              return (
                <div
                  key={`face-${faceIndex}`}
                  className="cube-face absolute w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg) translateZ(${Math.min(150, window.innerWidth * 0.15)}px)`,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Profile Section */}
                  <div className="bg-[#232323] p-4 flex items-center gap-3 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                      <img
                        src={item.data.user.avatar || "/placeholder.svg"}
                        alt={item.data.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <div className="text-base font-bold">{item.data.user.name}</div>
                      <div className="text-sm text-white">{item.data.user.position}</div>
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="relative aspect-[9/16] group w-full bg-gray-100 h-[calc(100%-70px)]">
                    {/* Only create video element for the active face */}
                    {item.dataIndex === activeIndex ? (
                      <video
                        ref={(el) => (videoRefs.current[item.dataIndex] = el)}
                        src={item.data.video}
                        className="w-full h-full object-cover"
                        playsInline
                        muted={false}
                        loop={false}
                        controls={false}
                        style={{ display: "block" }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <img
                          src={item.data.image || "/placeholder.svg"}
                          alt={item.data.user.name}
                          className="w-full h-full object-cover opacity-50"
                        />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side - Profile Indicators + Arrows */}
        <div className="flex flex-col lg:items-end gap-4 relative w-full lg:w-1/10 md:pr-10 max-w-xs">
          <div className="flex overflow-hidden lg:h-auto lg:flex-col flex-row items-center justify-center">
            {Array.from({ length: 4 }).map((_, i) => {
              const indicatorIndex = (visibleStartIndex + i) % totalItems
              const item = carouselData[indicatorIndex]
              return (
                <ProfileIndicator
                  key={`visible-indicator-${indicatorIndex}`}
                  avatar={item.user.avatar}
                  isActive={indicatorIndex === activeIndex}
                  onClick={() => handleProfileClick(indicatorIndex)}
                  className="mx-1 lg:mx-0 my-1"
                />
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex lg:flex-col items-center justify-center gap-2 mt-2">
            <button
              onClick={handlePrev}
              className="bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Previous slide"
              disabled={isFlipping}
            >
              <ChevronLeft size={24} className="lg:rotate-90" />
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Next slide"
              disabled={isFlipping}
            >
              <ChevronRight size={24} className="lg:rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cube-container {
          transform-style: preserve-3d;
          position: relative;
        }
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  )
}

