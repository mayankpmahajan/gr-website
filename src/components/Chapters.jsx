"use client"

import { useEffect, useRef } from "react"

// Sample chapter data - replace with your actual data
const chapters = [
  {
    id: 1,
    title: "Indo Global Group of Colleges",
    image: "/chapters/krm.png",
  },
  {
    id: 2,
    title: "Maharaja Surajmal Institute of Technology",
    image: "/chapters/msit.png",
  },
  {
    id: 3,
    title: "Jagan Institute of Management Studies",
    image: "/chapters/jims.png",
  },
  {
    id: 4,
    title: "Jagan Institute of Management Studies Engineering Management Technical Campus",
    image: "/chapters/jimsemtc.png",
  },
  {
    id: 5,
    title: "Guru Tegh Bahadur Institute of Technology",
    image: "/chapters/gtbit.png",
  },
  {
    id: 6,
    title: "Dr. Akhilesh Das Gupta Institute of Professional Studies",
    image: "/chapters/adgips.png",
  },
  {
    id: 7,
    title: "Trinity Institute of Innovations in Professional Studies",
    image: "/chapters/tiips.png",
  },
  {
    id: 8,
    title: "Dronacharya College Of Engineering",
    image: "/chapters/dce.png",
  },
  {
    id: 9,
    title: "Plaksha University",
    image: "/chapters/plaksha.png",
  },
  {
    id: 10,
    title: "HMR Institute of Technology and Management",
    image: "/chapters/hmritm.png",
  },
]

// Split chapters into two arrays for the two carousels
const topChapters = chapters.slice(0, chapters.length / 2)
const bottomChapters = chapters.slice(chapters.length / 2)

export default function ChaptersSection() {
  const topCarouselRef = useRef(null)
  const bottomCarouselRef = useRef(null)

  useEffect(() => {
    const topCarousel = topCarouselRef.current
    const bottomCarousel = bottomCarouselRef.current

    if (!topCarousel || !bottomCarousel) return

    // Function to create a chapter card element
    const createChapterCard = (chapter) => {
      const div = document.createElement("div")
      div.className = "carousel-item flex-shrink-0 px-2 md:w-[40%] w-full"
      div.dataset.id = String(chapter.id)

      div.innerHTML = `
        <div class="h-full rounded-lg overflow-hidden shadow-md bg-[#232323]">
          <div class="flex items-center h-full min-h-[220px]">
            <div class="flex items-center justify-center w-2/5 h-full min-h-[220px]">
              <img 
                src="${chapter.image}" 
                alt="${chapter.title}" 
                class="h-auto w-32 object-cover"
              />
            </div>
            <div class="w-3/5 p-4">
              <h3 class="font-medium text-[#fff] text-lg">${chapter.title}</h3>
            </div>
          </div>
        </div>
      `

      return div
    }

    // Setup carousel with items and duplicates for seamless looping
    const setupCarousel = (carousel, items) => {
      // Clear existing content
      carousel.innerHTML = ""

      // Add original items
      items.forEach((chapter) => {
        carousel.appendChild(createChapterCard(chapter))
      })

      // Add duplicates for seamless looping
      items.forEach((chapter) => {
        carousel.appendChild(createChapterCard(chapter))
      })

      // Add more duplicates to ensure we have enough items for wider screens
      items.forEach((chapter) => {
        carousel.appendChild(createChapterCard(chapter))
      })
    }

    setupCarousel(topCarousel, topChapters)
    setupCarousel(bottomCarousel, bottomChapters)

    // Animation for top carousel (moving right)
    const animateTopCarousel = () => {
      if (!topCarousel) return

      const speed = 0.5 // Pixels per frame - adjust for desired speed
      const items = topCarousel.querySelectorAll(".carousel-item")
      if (items.length === 0) return

      const itemWidth = items[0].clientWidth
      const totalOriginalWidth = itemWidth * topChapters.length

      let position = 0
      let lastTimestamp = 0

      const moveRight = (timestamp) => {
        // Calculate time elapsed since last frame
        const elapsed = lastTimestamp ? timestamp - lastTimestamp : 16.67 // Default to ~60fps
        lastTimestamp = timestamp

        // Adjust speed to be time-based for consistent movement
        const frameSpeed = speed * (elapsed / 16.67)

        position -= frameSpeed

        // When we've scrolled past the first set of items, reset to beginning
        // This creates a seamless loop with consistent speed
        if (Math.abs(position) >= totalOriginalWidth) {
          position += totalOriginalWidth
        }

        topCarousel.style.transform = `translateX(${position}px)`
        requestAnimationFrame(moveRight)
      }

      requestAnimationFrame(moveRight)
    }

    // Animation for bottom carousel (moving left)
    const animateBottomCarousel = () => {
      if (!bottomCarousel) return

      const speed = 0.7 // Pixels per frame - adjust for desired speed
      const items = bottomCarousel.querySelectorAll(".carousel-item")
      if (items.length === 0) return

      const itemWidth = items[0].clientWidth
      const totalOriginalWidth = itemWidth * bottomChapters.length

      let position = -totalOriginalWidth
      let lastTimestamp = 0

      const moveLeft = (timestamp) => {
        const elapsed = lastTimestamp ? timestamp - lastTimestamp : 16.67 // Default to ~60fps
        lastTimestamp = timestamp

        // Adjust speed to be time-based for consistent movement
        const frameSpeed = speed * (elapsed / 16.67)

        position += frameSpeed

        // When we've scrolled past the middle set of items, reset to beginning of middle set
        // This creates a seamless loop with consistent speed
        if (position >= 0) {
          position -= totalOriginalWidth
        }

        bottomCarousel.style.transform = `translateX(${position}px)`
        requestAnimationFrame(moveLeft)
      }

      requestAnimationFrame(moveLeft)
    }

    const handleResize = () => {
      if (topCarousel && bottomCarousel) {
        setupCarousel(topCarousel, topChapters)
        setupCarousel(bottomCarousel, bottomChapters)
      }
    }

    window.addEventListener("resize", handleResize)

    // Start animations
    const topAnimation = requestAnimationFrame(animateTopCarousel)
    const bottomAnimation = requestAnimationFrame(animateBottomCarousel)

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(topAnimation)
      cancelAnimationFrame(bottomAnimation)
    }
  }, [])

  return (
    <section className="py-12 px-4 bg-background overflow-hidden">
      <div className="container mx-auto">
        <h2 className="md:text-9xl text-5xl font-bold mb-20 text-[#fff] text-center">CHAPTERS</h2>

        {/* Top carousel - moves right */}
        <div className="overflow-hidden mb-12">
          <div ref={topCarouselRef} className="flex transition-transform" style={{ willChange: "transform" }}>
          </div>
        </div>

        {/* Bottom carousel - moves left */}
        <div className="overflow-hidden">
          <div ref={bottomCarouselRef} className="flex transition-transform" style={{ willChange: "transform" }}>
          </div>
        </div>
      </div>
    </section>
  )
}

