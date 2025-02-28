import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import Hero from "./pages/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinUs from "./pages/JoinUs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/events" element={<Events />} />
        <Route path="/joinus" element={<JoinUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
