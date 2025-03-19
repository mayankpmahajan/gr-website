import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DecryptedText from "./DecryptedText";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/career", label: "Career" },
    { path: "/ourteam", label: "Our Team" },
    { path: "/contactus", label: "Contact Us", special: true },
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev < navItems.length - 1) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 90);
      return () => clearInterval(timer);
    } else {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  return (
    <div className="w-full flex items-center justify-center px-4">
      {/* Mobile Navigation (Top) */}
      <div className="sm:hidden fixed top-0 right-0  bg-transparent z-50 flex justify-between items-center p-4 shadow-lg">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-white p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex fixed bottom-6 sm:bottom-12 bg-[#242424] z-50 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/3 justify-between py-2 rounded-full items-center shadow-lg">
        {navItems.map((item, index) => (
          <Link key={item.path} to={item.path} className="flex items-center px-2">
            <button
              className={`cursor-pointer text-sm sm:text-base px-2 ${
                item.special ? "text-[#f15a22]" : "text-white"
              }`}
            >
              <DecryptedText text={item.label} />
            </button>
            {item.special && (
              <button className="cursor-pointer ml-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f15a22] rounded-full"></div>
              </button>
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-full bg-black/50 z-40">
          <div className="absolute top-0 right-0 h-full flex flex-col items-end pt-24 pr-6 space-y-4">
            {navItems.map((item, index) => (
              <div
                key={item.path}
                className={`transform transition-all duration-100 ${
                  index <= activeIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 0.02}s`,
                }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`bg-[#1a1d24]  px-6 py-2 rounded-full ${
                item.special ? "text-[#f15a22]" : "text-white"
              }  transition-colors inline-block`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
