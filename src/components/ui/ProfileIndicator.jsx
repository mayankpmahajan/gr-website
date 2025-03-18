"use client";

import React from "react";

const ProfileIndicator = ({ avatar, isActive, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md transition-all duration-300 ${
        isActive ? "scale-110 border-orange-500" : "scale-90 border-blue-500 opacity-70 hover:opacity-100"
      } ${className}`}
      aria-label="Profile Indicator"
    >
      <img src={avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
      {isActive && <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
    </button>
  );
};

export default ProfileIndicator;
