"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

const teamMembers = [
  {
    id: 1,
    name: "George Washington",
    image: "/placeholder.svg?height=400&width=300",
    linkedin: "https://linkedin.com/in/example1",
  },
  {
    id: 2,
    name: "Abraham Lincoln",
    image: "/placeholder.svg?height=400&width=300",
    linkedin: "https://linkedin.com/in/example2",
  },
  {
    id: 3,
    name: "Thomas Jefferson",
    image: "/placeholder.svg?height=400&width=300",
    linkedin: "https://linkedin.com/in/example3",
  },
  {
    id: 4,
    name: "Theodore Roosevelt",
    image: "/placeholder.svg?height=400&width=300",
    linkedin: "https://linkedin.com/in/example4",
  },
  {
    id: 5,
    name: "Franklin D. Roosevelt",
    image: "/placeholder.svg?height=400&width=300",
    linkedin: "https://linkedin.com/in/example5",
  },
]

export default function TeamCarousel() {
  const [api, setApi] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  useEffect(() => {
    if (!api) return

    const handleScroll = () => {
      setActiveIndex(api.selectedScrollSnap() % teamMembers.length)
    }

    api.on("select", handleScroll)
    api.scrollTo(teamMembers.length)

    return () => {
      api.off("select", handleScroll)
    }
  }, [api])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white py-12 px-4 relative">
      <h1 className="md:text-9xl text-5xl font-bold text-center mb-32">THE PRESIDENTS</h1>

      <div className="relative w-full max-w-6xl mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[autoplayPlugin.current]}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
          }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <button
              onClick={() => api && api.scrollPrev()}
              className="bg-gray-800/70 p-3 rounded-full hover:bg-gray-700 transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={member.id}
                className="pl-4 md:basis-1/3 basis-full"
              >
                <div className="h-[30rem] flex items-center justify-center">
                  <Card
                    className={`relative overflow-hidden border-2 transition-all duration-700 ease-in-out transform 
                    ${index === activeIndex ? "border-[#232323] scale-105" : "border-[#232323] scale-85"}
                    bg-[#232323] h-[28rem] w-[80%] mx-auto`}
                  >
                    <CardContent className="p-0 relative w-full h-full">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#3b3b3b] p-4 flex items-center justify-between">
                        <h3 className="text-white text-lg font-semibold">{member.name}</h3>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-6 h-6 text-[#121212] hover:text-blue-500 transition" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <button
              onClick={() => api && api.scrollNext()}
              className="bg-gray-800/70 p-3 rounded-full hover:bg-gray-700 transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </Carousel>
      </div>
    </div>
  )
}

