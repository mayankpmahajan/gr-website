
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import Hero from "./pages/Hero";
import FAQPage from "./components/Faq";
import Partners from "./components/Partners";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OurTeam from "./pages/OurTeam";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/ourTeam" element={<OurTeam />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
