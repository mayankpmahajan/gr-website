
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import Home from "./pages/Home";
import FAQPage from "./components/Faq";
import Partners from "./components/Partners";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OurTeam from "./pages/OurTeam";
import Career from "./pages/Career";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/ourTeam" element={<OurTeam />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/career" element={<Career />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
