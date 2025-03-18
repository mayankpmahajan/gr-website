import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const WhatWeDo = () => {
  return (
    <div>
        <h1 className="text-[3.2rem] text-[#F2F2F2] md:text-[7rem] font-satoshi-bold tracking-tighter text-center ">
        WHAT WE DO
      </h1>
      <div className=""><HorizontalScrollCarousel /> </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] md:h-[300vh]">
      <div className="sticky top-0  flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10">
          {cards.map((card, index) => {
            return <Card card={card} key={card.id} index={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, index }) => {
  return (
    <div
      className={`relative h-[300px] w-[450px] md:h-[400px] md:w-[900px] overflow-hidden p-3 md:p-10 rounded-4xl flex  items-center text-center shadow-lg transition-all duration-300 ${card.color}`}
      style={{ transform: `rotate(${card.rotate})` }}
    >
      <div
        className=" w-1/3 inset-0 z-0 transition-transform duration-300 "
      ><img src={card.image} alt="" srcset="" /></div>
      
      <div className=" w-2/3 inset-0 z-10  place-content-center">
        <h2 className="text-[2rem] md:text-[4rem] font-satoshi-bold mb-2 text-white">
          {card.title}
        </h2>
        <p className="text-lg md:text-2xl font-satoshi max-w-lg text-white">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default WhatWeDo;

const cards = [
  {
    title: "Hirethons",
    description:
      "Hirethons are a great way to get hired by top companies. They are like hackathons but instead of building projects, you solve problems and get hired.",
    image: "/logo/hirethon.png",
    color: "bg-[#FF7F50]",
    rotate: "-2deg",
    id: 1,
  },
  {
    title: "Hackathons",
    description:
      "Hackathons are a great way to build projects and learn new technologies. They are a great way to get started in the tech industry.",
    image: "/logo/hackathon.png",
    color: "bg-[#00EBF6]",
    rotate: "3deg",
    id: 2,
  },
  {
    title: "Job",
    description:
      "We provide job opportunities to our members. We have a dedicated team that helps our members get hired by top companies.",
    image: "/logo/mentorship.png",
    color: "bg-[#FB3748]",
    rotate: "-4deg",
    id: 3,
  },
  {
    title: "Mentorship",
    description:
      "We provide mentorship to our members. We have a team of experienced developers who help our members learn new technologies.",
    image: "/logo/job.png",
    color: "bg-[#FFDB43]",
    rotate: "2deg",
    id: 4,
  },
];
