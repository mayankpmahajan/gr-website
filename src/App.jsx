import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Hero from "./components/Hero.jsx";
import Partners from "./components/Partners.jsx";
import FAQPage from "./components/Faq.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hero/>
    },
    {
      path: "/partners",
      element: <Partners/>
    },
    {
      path: "/faqs",
      element: <FAQPage/>
    }
  ]);

  return (
   <>
    <RouterProvider router={router}/>
   </>
  )
}

export default App;