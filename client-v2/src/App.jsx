import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import { AppContext } from "./AppContext";
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import CodeSchool from "./components/CodeSchool";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const handler = (e) => setIsMobile(e.matches);
    window.matchMedia("(max-width: 767px)").addEventListener("change", handler);
  }, []);

  const handleScroll = (event) => {
    setScrollY(window.scrollY);
  };

  return (
    <AppContext.Provider
      value={{
        scrollY,
        setScrollY,
        navbarOpen,
        setNavbarOpen,
        isMobile,
      }}
    >
      {scrollY >= 100 && <Navbar fixed />}
      <Header />
      <About />
      <Resume />
      <CodeSchool />
      <Contact />
    </AppContext.Provider>
  );
}

export default App;
