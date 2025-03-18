/* eslint-disable react/prop-types */
import { IoShareSocial } from "react-icons/io5";
import { motion } from "framer-motion";

const upcomingEvents = [
  {
    name: "Code With DCG",
    date: "March 18, 2025",
    venue: "New Delhi",
    details:
      "🚀 Code With DCG – Where Innovation Meets Impact! 🚀Where geeks build, innovators rise, and code shapes the future!Are you ready to push the boundaries of technology.",
    social: "https://code-with-dcg.devfolio.co/",
    image: "/DGC.jpg",
  },
  {
    name: "Code-ए-Manipal",
    date: "March 21 - 22, 2025",
    venue: "Jaipur",
    social: "https://codemanipal.devfolio.co/",
    details:
      "🌟 Code-ए-Manipal: Where Innovation Meets Scarcity of Water 🌟Are you ready to unleash your inner tech wizard, survive on caffeine, and redefine what it means to innovate? ",
    image: "/ab2.jpg",
  },
  {
    name: "Code Nakshatra",
    date: "March 21 - 22, 2025",
    venue: "Greater Noida",
    social: "https://code-nakshatra.devfolio.co/",
    details:
      "Where Innovators Collide and Code Takes Flight🌟Code Nakshatra: Where Ideas Shine and Dreams Soar🌟Get ready to unlock your coding superpowers, fuel up on ideas (and maybe some coffee), and experience a hackathon like never before. Code Nakshatra isn’t just another tech event.",
    image: "/Nakshatra.jpg",
  },
];

const pastEvents = [
  {
    name: "Code Cubicle 3.0",
    date: "May 15-19, 2024",
    venue: "Noida, India",
    details:
      "🌟 Introducing Code Cubicle: Unlocking Collaboration & Innovation, One Cubicle at a Time!🚀 Join us for an unparalleled tech adventure at Code Cubicle, the ultimate hackathon brought to you by Geek Room..",
    social: "https://code-cubicle.devfolio.co/",
    image: "/CC3.0.jpg",
  },
  {
    name: "Code Kshetra 2.0",
    date: "February 21 - 23, 2025",
    venue: "New Delhi",
    social: "https://code-kshetra-2.devfolio.co/",
    details:
      "🌟 Code Kshetra 2.0: Where Innovation Meets Madness🌟Are you ready to unleash your inner tech wizard, survive on caffeine, and redefine what it means to innovate?Code Kshetra isn’t just a hackathon.",
    link: "https://codekshetra2.geekroom.in/",
    image: "/ab7.jpg",
  },
  {
    name: "Code Kshetra 1.0",
    date: "February 05 - 06, 2024",
    venue: "New Delhi",
    social: "https://code-kshetra.devfolio.co/",
    details:
      "🚀 Code Kshetra: Where Geeks Battle with Code & Innovation📌 Welcome to Code Kshetra, a groundbreaking hackathon jointly organised by JIMS Sector-5 Rohini and Geek Room.",
    image: "/CK1.0.jpg",
  },
  {
    name: "TechMinds",
    date: "March 15 - 17, 2025",
    venue: "New Delhi",
    social: "https://techminds.devfolio.co/",
    details:
      "Join TechMinds, an exhilarating hackathon co-organized by Geek Room and the Artificial Intelligence Experience Centre, IITM Janakpuri. This event invites tech enthusiasts and innovators to push the boundaries of creativity and technology. ",
    image: "/TechMinds.jpg",
  },
];

//Main function
export default function Events() {
  return (
    <div className="h-full relative bg-[#121212] md:py-5">
      {/* Events Page Banner with Animation */}
      <motion.section
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.4 }}
        className="max-h-screen md:mb-8 flex flex-col items-center justify-center text-[#F2F2F2] px-4"
      >
        <img
          src="./logo/transparent_geek_room_logo.svg"
          alt="Logo"
          className="w-20 h-20 md:w-42 md:h-42 md:mb-1 mt-[7rem] mb-[5.5rem] md:my-14"
        />
        <h1 className="text-[2.3rem] md:text-[8rem] font-satoshi-bold text-center tracking-tight mb-3 md:mb-4 md:mt-[1rem]">
          EVENTS
        </h1>
        <p className="text-lg md:text-xl font-satoshi text-center mb-[6rem] md:mb-4">
          &apos;&apos;A community dedicated to helping each other get better at
          coding together&apos;&apos;
        </p>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-[#F2F2F2] flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[5rem]"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-10 tracking-tighter text-center"
        >
          UPCOMING EVENTS 🚀
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Past Events */}
      <motion.section
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-screen text-white flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[7rem]"
      >
        <motion.h1
          inital={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-8 tracking-tighter text-center"
        >
          PAST EVENTS 🌟
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {pastEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

// Event Card Component
function EventCard({ event }) {
  return (
    <div className="bg-[#242424] p-6 rounded-lg flex flex-col gap-3 relative">
      <div className="flex items-center gap-4">
        <div className="h-34 w-34 object-cover bg-gray-300 rounded-full">
          <img
            src={event.image}
            className="h-34 w-34 object-fit rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl md:py-3 font-semibold text-white">
            {event.name}
          </h2>
          <p className="text-sm md:text-lg text-[#F15A22]">
            {event.date} • {event.venue}
          </p>
        </div>
      </div>
      <p className="text-md pt-3 text-white">{event.details}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <div className="text-white rounded-full">
            <a href={event.link}>
              <IoShareSocial />
            </a>
          </div>
        </div>
        <button
          className="bg-[#F15A22] text-[#121212] px-4 py-2 rounded-lg font-semibold cursor-pointer"
          onClick={() => window.open(event.social, "_blank")}
        >
          <a href={event.social}>View</a>
        </button>
      </div>
    </div>
  );
}
