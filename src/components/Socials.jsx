import React, { useState } from "react";
import insta from "/logo/insta.png";
import linkedIn from "/logo/linkedIn.png";

const Socials = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="flex flex-col md:mt-20 items-center justify-center h-screen text-white">
      {/* Heading */}
      <h2 className="md:text-9xl text-5xl font-bold mb-12 text-[#fff] text-center">
        Our Socials
      </h2>

      {/* Social Icons */}
      <div className="relative w-[80vw] max-w-[32rem] flex justify-center mb-4">
        <a href="https://www.instagram.com/_geek.room">
          <img
            src={insta}
            alt="Instagram"
            className="absolute md:top-[-10rem] md:right-[-50%] top-[-8rem] right-[-5%] md:w-16 md:h-16 w-12 h-12"
          />
        </a>
        <a href="https://www.linkedin.com/company/geekr00m">
          <img
            src={linkedIn}
            alt="LinkedIn"
            className="absolute md:top-[-5rem] md:right-[-35%] top-[-2rem] right-[85%] md:w-20 md:h-20 w-16 h-16"
          />
        </a>
      </div>

      {/* Video Container */}
      <div className="bg-[#232323] rounded-lg p-4 w-[80vw] max-w-[50rem] h-[60vh] flex items-center justify-center shadow-lg">
        {videoLoaded ? (
          <video
            controls
            className="w-full h-full rounded-lg"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full rounded-lg bg-black"></div>
        )}
      </div>
    </div>
  );
};

export default Socials;
