"use client";

import { cn } from "../lib/utils";

export default function ProfileIndicator({ avatar, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden transition-all duration-300",
        isActive ? "w-12 h-12 ring-2 ring-offset-2 ring-orange-500" : "opacity-80 hover:opacity-100"
      )}
    >
      <img src={avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
    </button>
  );
}
