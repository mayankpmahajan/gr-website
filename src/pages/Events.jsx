export default function Events() {
  return (
    <div className="h-full relative mb:mb-[4rem] bg-[#121212]">
      {/*Events page Banner Section :*/}
      <section className="min-h-screen md:mb-8 bg-[#121212]">
        <div className="flex flex-col items-center justify-center text-white">
          <img
            src="./logo/transparent_geek_room_logo.svg"
            alt="Logo"
            className="md:w-32 md:h-32 md:mb-4"
          />
          <h1 className="text-[8rem] font-satoshi-bold md:mb-[3rem]">EVENTS</h1>
          <p className="text-md font-satoshi-regular">Subline</p>
        </div>
      </section>

      {/*Ongoing Events*/}
      <section className="md:mt-[-11.4rem]">
        <div className="flex flex-col justify-center items-center">
          <span className="flex flex-row md:gap-4 md:mb-1">
            <h2 className="text-white text-center md:ml-5 font-satoshi-regular text-2xl font-light mb-2">
              Ongoing Events
            </h2>
            <img className="size={10} md:pb-4 text-white " src="./Frame.svg" />
          </span>

          <div className="h-screen flex justify-center items-center md:w-auto relative ">
            {/* Main Container */}
            <div className="flex justify-between items-center md:w-full md:gap-28">
              {/* Left Box (Orange) */}
              <div className="bg-[#F15A22] w-45 h-45 rounded-md absolute left-[-18rem] top-[9rem]"></div>

              {/* Center Box (Large Gray Box) */}
              <div className="bg-[#F2F2F2] w-[500px] md:h-[40rem] rounded-lg"></div>

              {/* Right Box (Cyan) */}
              <div className="bg-[#00EBF6] w-45 h-45 rounded-md absolute right-[-18rem] bottom-[9rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events*/}
      <section>
        <div className="h-screen text-[#F2F2F2] flex flex-col md:mt-14 items-center p-10">
          {/* Title */}
          <h1 className="md:text-[6rem] font-satoshi-bold mb-10 tracking-tighter">
            UPCOMING EVENTS
          </h1>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-2 gap-8 w-[80%]">
            {/* Event Card (Highlighted) */}
            <div className="bg-[#F2F2F2] p-6 rounded-lg flex flex-col gap-3 relative">
              {/* Profile + Event Name */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F2F2F2] rounded-full"></div>
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    Event Name
                  </h2>
                  <p className="text-sm text-gray-600">Date • Venue</p>
                </div>
              </div>

              {/* Details */}
              <p className="text-sm text-gray-600">Details Any Other</p>

              {/* Icons + Button */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full"></div>
                  <div className="w-6 h-6 rounded-full"></div>
                </div>
                <button className="bg-[#F15A22] text-black px-4 py-2 rounded-lg font-semibold">
                  View
                </button>
              </div>
            </div>

            {/* Other Event Cards (Empty) */}
            <div className="bg-[#F2F2F2] p-6 rounded-lg h-[16rem]"></div>
            <div className="bg-[#F2F2F2] p-6 rounded-lg h-[16rem]"></div>
            <div className="bg-[#F2F2F2] p-6 rounded-lg h-[16rem]"></div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <div className="min-h-screen text-white flex flex-col md:mt-[9rem] items-center p-10 ">
        {/* Title */}
        <h1 className="md:text-[6rem] font-satoshi-bold mb-8 tracking-tight">
          PAST EVENTS
        </h1>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-2 gap-8 w-[80%] md:mb-[6rem]">
          {/* Event Cards (Empty Placeholder) */}
          <div className="bg-[#F2F2F2] p-7 rounded-lg h-[16rem]"></div>
          <div className="bg-[#F2F2F2] p-7 rounded-lg h-[16rem]"></div>
          <div className="bg-[#F2F2F2] p-7 rounded-lg h-[16rem]"></div>
          <div className="bg-[#F2F2F2] p-7 rounded-lg h-[16rem]"></div>
        </div>
      </div>
    </div>
  );
}
