import React, { useContext, useEffect } from "react";
import AboutPlatform from "components/Home/AboutPlatform";
import Hire from "components/Home/Hire";
import PublicContext from "contexts/PublicContext";
import Skills from "./about/skills";
import { Header2 } from "components/Home/Header2";
import ActivityTimeline from "components/Home/ActivityTimeline";
import Meta from "components/Meta";
import Projects from "components/Home/Projects";

export default function Home() {
  const { setMeta } = useContext(PublicContext);

  useEffect(() => {
    setMeta({
      title: "Home",
      description: "Welcome to my platform, that is my personal business card.",
    });
  }, []);

  return (
    <>
      <Meta
        title="Home"
        description="Welcome to my platform, that is my personal business card."
        url="/"
      />
      <Header2 />
      <AboutPlatform />
      <Hire />
      <Skills />
      <ActivityTimeline />
    </>
  );
}
