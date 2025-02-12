import React, { useEffect, useState } from 'react'
import '../index.css'
import { Canvas } from '@react-three/fiber'; // Import Canvas
import { OrbitControls } from '@react-three/drei';
import Spectacles from './Spectacles';




const Hero = () => {

  const [state, setState] = useState(0);

  useEffect(() => {
    // This effect runs once when the component mounts (on reload)
    setTimeout(() => {
      setState(1);
    }, 2000); // 5000 milliseconds = 5 seconds


  }, []); // Empty dependency array ensures it only runs on mount
  return (
    <main className='bg-[#121212] h-screen'>
      <section className='animate-wiggle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img src="./logo/transparent_geek_room_logo.svg" alt="logo" />
      </section>

      <section className='flex flex-col'>
        <div className="text-white flex mx-[2vw] items-center h-screen text-[13.5vw] font-satoshi-bold tracking-tight animate-fade-up">
          GEEK R

          <div className={`${state === 1 ? 'animate-appear' : 'hidden'} text-amber-500 absolute width-[100vw] top-[14vh] left-[48vw]`}>
            <Canvas
              camera={{ position: [0, -20, 10], fov: 100 }}
              style={{ height: '90vh', width: '40vw' }}
            >
              <ambientLight />
              <Spectacles />
              <OrbitControls
                maxPolarAngle={Math.PI / 2}  // Limits the downward rotation
                minPolarAngle={Math.PI / 2}  // Limits the upward rotation
                enableZoom={false}            // Optional: Disable zooming
              />
            </Canvas>
          </div>

          <div
            className={`${state === 1 ? 'animate-slide-right' : 'animate-none'}`}
          >
            M
          </div>
          {/* <div
            className="animate-appear"
          >
            OO
          </div> */}

        </div>

        <div className={`text-2xl absolute text-white font-satoshi-regular top-[62vh] right-[2.3vw] ${state === 1 ? 'animate-appear' : 'hidden'} `}>
          <p>A community dedicated to helping each other get better together</p>
        </div>



      </section>
    </main>


  )
}

export default Hero