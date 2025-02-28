import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 py-4 md:py-6">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-white text-base sm:text-lg md:text-xl font-medium pr-4">{question}</h3>
        <button 
          className={`p-1 sm:p-2 rounded-full bg-orange-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDown size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" color="white" />
        </button>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-3 md:mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300 text-sm sm:text-base">{answer}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What is Geek Room?",
      answer: "Geek Room is a widespread coding community with over 7500+ active coders nationwide. It was started by three 1st year coding enthusiasts with the main objective to create a transparent community where sharing of ideas and helping other people is the main goal . Geek Room boasts of various hackathon winning teams , 6 independent institutes with Geek Room chapters and so much more."
    },
    {
      question: "How to become Community Partner for Geek Room events",
      answer: "To become a community partner for Geek Room , one will only need to fill up a Google form without any charging fee . Since we at Geek Room are committed to build a transparent and free community , community partnerships are greatly appreciated and one can expect the best experience."
    },
    {
      question: "How do I connect with Geek Room? Do I need to pany any fees?",
      answer: "You can connect with Geek Room via our social media handles (Instagram , LinkedIn , Email , WhatsApp) etc . No , you dont need any fees to join Geek Room . You simply fill the google form , give the interview and if considered applicable , you shall be selected in a free and fair manner."
    },
    {
      question: "What makes Geek Room unique?",
      answer: "Our vast connections , a widespread community of over 7500+ coders nationwide , conduction of successful hackathons and events , boasting multi hackathon winning teams comprised purely of Geek Room members , a philosophy of a community of the coders , for the coders and by the coders and a transparent community where anyone can start coding easily , Geek Room is a unique trendsetter that is built for the upliftment of the Indian coding community."
    },
    {
      question: "What is Code Kshetra and what makes it unique?",
      answer: "Simple the greatest event of all time!! Yay!! XD"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="flex justify-end mb-8 md:mb-16">
          <h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
            style={{ 
              fontSize: 'clamp(3rem, 10vw, 110px)',
              fontWeight: '900' 
            }}
          >
            FAQs
          </h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;