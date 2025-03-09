export default function Events() {
  return (
    <div className="h-full relative bg-[#121212]">
      {/* Events Page Banner */}
      <section className="max-h-screen md:mb-5 bg-[#121212] flex flex-col items-center justify-center text-[#F2F2F2] px-4">
        <img
          src="./logo/transparent_geek_room_logo.svg"
          alt="Logo"
          className="w-20 h-20 md:w-32 md:h-32 md:mb-4 mt-[6rem] mb-[5.5rem] md:my-4"
        />
        <h1 className="text-[2.3rem] md:text-[8rem] font-satoshi-bold text-center mb-3 md:mb-4">
          EVENTS
        </h1>
        <p className="text-lg md:text-xl font-satoshi-regular text-center mb-[6rem] md:mb-4">
          &apos;&apos;A community dedicated to helping each other get better at
          coding together&apos;&apos;
        </p>
      </section>

      {/* Ongoing Events */}
      <section className="md:mt-[5.7rem] mb-8 sm:mt-[1.5rem]">
        <div className="flex flex-col justify-center sm:py-[-4rem] items-center">
          <span className="flex flex-col md:flex-row md:gap-4 md:mb-1 mb-2">
            <h2 className="text-[#F2F2F2] text-center md:ml-8 font-satoshi-bold text-[1.9rem] md:text-[2.4rem] md:mb-6 mb-7">
              ONGOING EVENTS
            </h2>
          </span>

          {/* Mobile: Column-wise, Desktop: Row-wise */}
          <div className="flex flex-col md:flex-row justify-center items-center md:w-auto relative gap-4 md:gap-28">
            <div className="bg-[#F15A22] w-24 h-24 md:w-45 md:h-45 rounded-md transition-transform hover:scale-105"></div>
            <div className="bg-[#F2F2F2] w-56 h-56 md:w-[500px] md:h-[40rem] rounded-lg transition-transform hover:scale-105"></div>
            <div className="bg-[#00EBF6] w-24 h-24 md:w-45 md:h-45 rounded-md transition-transform hover:scale-105"></div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="text-[#F2F2F2] flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[7rem]">
        <h1 className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-10 tracking-tighter text-center">
          UPCOMING EVENTS
        </h1>

        {/* Grid for both Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <EventCard key={index} />
            ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="min-h-screen text-white flex flex-col items-center p-5 md:p-10 md:mt-[6rem] mt-[7rem]">
        <h1 className="text-[2.3rem] md:text-[6rem] font-satoshi-bold mb-5 md:mb-8 tracking-tighter text-center">
          PAST EVENTS
        </h1>

        {/* Grid for both Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full md:w-[80%]">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <EventCard key={index} />
            ))}
        </div>
      </section>
    </div>
  );
}

// Event Card Component
function EventCard() {
  return (
    <div className="bg-[#F2F2F2] p-6 rounded-lg flex flex-col gap-3 relative transition-transform hover:scale-105">
      {/* Profile + Event Name */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <h2 className="text-lg md:text-2xl md:py-3 font-semibold text-black">
            Event Name
          </h2>
          <p className="text-sm md:text-lg text-[#121212]">Date • Venue</p>
        </div>
      </div>

      {/* Details */}
      <p className="text-sm pt-3 text-[#121212]">Details Any Other</p>

      {/* Icons + Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
        </div>
        <button className="bg-[#F15A22] text-[#121212] px-4 py-2 rounded-lg font-semibold">
          View
        </button>
      </div>
    </div>
  );
}
