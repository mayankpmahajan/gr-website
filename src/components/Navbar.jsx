import React from "react";
import { Link } from "react-router-dom";
import DecryptedText from "./DecryptedText";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="fixed bottom-6 sm:bottom-12 bg-[#242424] z-10 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/3 flex justify-between py-2 rounded-full items-center shadow-lg">
        <Link to="/">
          <button className="cursor-pointer text-white text-sm sm:text-base px-2 pl-8">
          <DecryptedText text="Home" />
          </button>
        </Link>
        <Link to="/events">
          <button className="cursor-pointer text-white text-sm sm:text-base px-2">
          <DecryptedText text="Events" />
          </button>
        </Link>
        <Link to="/career">
          <button className="cursor-pointer text-white text-sm sm:text-base px-2">
          <DecryptedText text="Career" />
          </button>
        </Link>

        <Link to="/ourteam">
          <button className="cursor-pointer text-white text-sm sm:text-base px-2">
          <DecryptedText text="Our Team" />
          </button>
        </Link>

        <Link to="/contactus" className="flex items-center px-2">
          <button className="cursor-pointer text-[#f15a22] text-sm sm:text-base">
          <DecryptedText text="Contact Us" />
          </button>
          <button className="cursor-pointer ml-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f15a22] rounded-full"></div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;