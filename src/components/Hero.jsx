import React, { useEffect, useState } from 'react'



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

          <div className={`${state === 1 ? 'animate-appear' : 'hidden'} text-amber-500 absolute right-[22vw]`}>
            OO
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