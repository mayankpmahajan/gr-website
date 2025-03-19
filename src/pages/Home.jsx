import React from 'react'
import Hero from '../components/Hero'
import Chapters from '../components/Chapters'
import Socials from '../components/Socials'
import WhatWeDo from '../components/WhatWeDo'

export default function Home() {
  return (
    <div className='bg-[#121212]'>
        <Hero />
        <WhatWeDo/>
        <Chapters />
        <Socials />
    </div>
  )
}
