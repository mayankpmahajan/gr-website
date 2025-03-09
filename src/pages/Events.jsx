/* eslint-disable react/prop-types */
import { IoShareSocial } from "react-icons/io5";

const upcomingEvents = [
  {
    name: "Code With DCG",
    date: "March 18, 2025",
    venue: "New Delhi",
    details:
      "🚀 Code With DCG – Where Innovation Meets Impact! 🚀Where geeks build, innovators rise, and code shapes the future!Are you ready to push the boundaries of technology, fuel your brain with caffeine, and bring your wildest ideas to life? Code With DCG isn’t just a hackathon—it’s a 24-hour adrenaline rush of coding, creativity, and problem-solving, brought to you by Geek Room & DCG at Delhi Technological University.",
    social: "https://code-with-dcg.devfolio.co/",
    image: "/public/DGC.jpg",
  },
  {
    name: "Code-ए-Manipal",
    date: "March 21 - 22, 2025",
    venue: "Jaipur",
    social: "https://codemanipal.devfolio.co/",
    details:
      "🌟 Code-ए-Manipal: Where Innovation Meets Scarcity of Water 🌟Are you ready to unleash your inner tech wizard, survive on caffeine, and redefine what it means to innovate?Code-ए-Manipal isn’t just a hackathon – it’s a 36-hour rollercoaster of creativity, chaos, and cutting-edge ideas, hosted by LearnIT MUJ and the tech rebels at Geek Room.",
    image: "/public/ab2.jpg",
  },
  {
    name: "Code Nakshatra",
    date: "March 21 - 22, 2025",
    venue: "Greater Noida",
    social: "https://code-nakshatra.devfolio.co/",
    details:
      "Where Innovators Collide and Code Takes Flight🌟Code Nakshatra: Where Ideas Shine and Dreams Soar🌟Get ready to unlock your coding superpowers, fuel up on ideas (and maybe some coffee), and experience a hackathon like never before. Code Nakshatra isn’t just another tech event – it’s a 24-hour adventure in innovation, collaboration, and fierce competition, hosted by Code Rangers and Geek Room TIIPS.",
    link: "https://code-nakshatra.xyz/",
    image: "/public/Nakshatra.jpg",
  },
];

const pastEvents = [
  {
    name: "Code Cubicle 3.0",
    date: "May 15-19, 2024",
    venue: "Noida, India",
    details:
      "🌟 Introducing Code Cubicle: Unlocking Collaboration & Innovation, One Cubicle at a Time!🚀 Join us for an unparalleled tech adventure at Code Cubicle, the ultimate hackathon brought to you by Geek Room. Dive into the heart of innovation and creativity as we redefine the essence of technology-driven solutions.",
    social: "https://code-cubicle.devfolio.co/",
    image: "/public/CC3.0.jpg",
  },
  {
    name: "Code Kshetra 2.0",
    date: "February 21 - 23, 2025",
    venue: "New Delhi",
    social: "https://code-kshetra-2.devfolio.co/",
    details:
      "🌟 Code Kshetra 2.0: Where Innovation Meets Madness🌟Are you ready to unleash your inner tech wizard, survive on caffeine, and redefine what it means to innovate?Code Kshetra isn’t just a hackathon – it’s a 36-hour rollercoaster of creativity, chaos, and cutting-edge ideas, hosted by JIMS Sector-5 Rohini and the tech rebels at Geek Room.",
    link: "https://codekshetra2.geekroom.in/",
    image: "/public/ab7.jpg",
  },
  {
    name: "Code Kshetra 1.0",
    date: "February 05 - 06, 2024",
    venue: "New Delhi",
    social: "https://code-kshetra.devfolio.co/",
    details:
      "🚀 Code Kshetra: Where Geeks Battle with Code & Innovation📌 Welcome to Code Kshetra, a groundbreaking hackathon jointly organised by JIMS Sector-5 Rohini and Geek Room. Immerse yourself in the heart of tech innovation as we present a unique experience, to redefine the boundaries of creativity and technology.",
    image: "/public/CK1.0.jpg",
  },
  {
    name: "TechMinds",
    date: "March 15 - 17, 2025",
    venue: "New Delhi",
    social: "https://techminds.devfolio.co/",
    details:
      "Join TechMinds, an exhilarating hackathon co-organized by Geek Room and the Artificial Intelligence Experience Centre, IITM Janakpuri. This event invites tech enthusiasts and innovators to push the boundaries of creativity and technology. Scheduled for 15th and 16th March 2024, this 30-hour offline event in Delhi will feature live project presentations, idea pitching sessions, and judging by an esteemed panel",
    image: "public/TechMinds.jpg",
  },
];

const ongoingEvents = [
  {
    name: "Pears Global Hackathon",
    date: "Feb 28 - March 11 , 2025",
    venue: "Global - Online",
    social: "https://lu.ma/9mqll98a",
    details:
      "Welcome to Pears Hackathon 2025, hosted in collaboration with Geek Room and Pears Technology! This global online hackathon invites participants from all over the world to innovate, collaborate, and build cutting-edge projects using Pears Technology.Whether you're a student, professional, or coding enthusiast, this is your chance to showcase your creativity, solve real-world problems, and compete for exciting rewards. With expert mentorship, challenging problem statements, and a collaborative innovation space, we aim to provide an unforgettable hackathon experience.",
    link: "https://pearshack.geekroom.in/",
    image: "public/pears.jpg",
  },
];

//Main Body :
export default function Events() {
  return (
    <div className="h-full relative bg-[#121212]">
      {/* Events Page Banner */}
      <section className="max-h-screen md:mb-5 bg-[#121212] flex flex-col items-center justify-center text-[#F2F2F2] px-4">
        <img
          src="./logo/transparent_geek_room_logo.svg"
          alt="Logo"
          className="w-20 h-20 md:w-42 md:h-42 md:mb-4 mt-[6rem] mb-[5.5rem] md:my-4"
        />
        <h1 className="text-[2.3rem] md:text-[8rem] font-satoshi-bold text-center tracking-tight mb-3 md:mb-4">
          EVENTS
        </h1>
        <p className="text-lg md:text-xl font-satoshi text-center mb-[6rem] md:mb-4">
          &apos;&apos;A community dedicated to helping each other get better at
          coding together&apos;&apos;
        </p>
      </section>

      <section className="text-[#F2F2F2] flex flex-col items-center p-5 md:p-11 md:mt-[6rem] mt-[7rem]">
        <h1 className="text-[2.3rem] text-[#F2F2F2] md:ml-5 md:text-[6rem] font-satoshi-bold mb-5 md:mb-10 tracking-tighter text-center">
          ONGOING EVENTS 🔥
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5 md:gap-8 w-full mt-2 md:w-[36%]">
          {ongoingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="text-[#F2F2F2] flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[7rem]">
        <h1 className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-10 tracking-tighter text-center">
          UPCOMING EVENTS 🚀
        </h1>

        {/* Grid for both Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="min-h-screen text-white flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[7rem]">
        <h1 className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-8 tracking-tighter text-center">
          PAST EVENTS 🌟
        </h1>

        {/* Grid for both Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {pastEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Event Card Component
function EventCard({ event }) {
  return (
    <div className="bg-[#F2F2F2] p-6 rounded-lg flex flex-col gap-3 relative transition-transform hover:scale-105 shadow-lg shadow-[#F15A22]">
      {/* Profile + Event Name */}
      <div className="flex items-center gap-4">
        <div className="h-34 w-34 object-cover bg-gray-300 rounded-full">
          <img
            src={event.image}
            className="h-34 w-34 object-fit rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl md:py-3 font-semibold text-black">
            {event.name}
          </h2>
          <p className="text-sm md:text-lg text-[#F15A22]">
            {event.date} • {event.venue}
          </p>
        </div>
      </div>

      {/* Details */}
      <p className="text-md pt-3 text-[#121212]">{event.details}</p>

      {/* Icons + Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <div className="text-[#121212] rounded-full">
            <a href={event.link}>
              <IoShareSocial />
            </a>
          </div>
        </div>
        <button className="bg-[#F15A22] text-[#121212] px-4 py-2 rounded-lg font-semibold">
          <a href={event.social}>View</a>
        </button>
      </div>
    </div>
  );
}
