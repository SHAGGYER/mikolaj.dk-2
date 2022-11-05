import React, { useContext, useEffect } from "react";
import { Container } from "./UI/Container";
import Timeline from "./UI/Timeline";
import { PrimaryButton } from "./UI/PrimaryButton";
import { Wrapper } from "./UI/Wrapper";
import useElementOnScreen from "../hooks/UseElementOnScreen";
import { AppContext } from "../AppContext";
import { SectionTitle } from "./UI/Title";

const items = [
  {
    title: "January 2016 - Now",
    description: "YouTuber",
    extra: (
      <PrimaryButton
        onClick={() => window.open(import.meta.env.VITE_YOUTUBE_URL, "_blank")}
        $filled
      >
        Check me out
      </PrimaryButton>
    ),
  },
  {
    title: "June - August 2022",
    description: "Web Developer at Servicepos",
  },
  {
    title: "May - September 2021",
    description: "Web Developer at G4me Time",
  },

  {
    title: "November 2020 - February 2021",
    description: "Web Developer at Sometic",
  },
  {
    title: "August 2019 - October 2020",
    description: "Finished Web Developer education",
    extra: (
      <PrimaryButton
        $filled
        onClick={() =>
          window.open("/assets/certificates/uddbevis.pdf", "_blank")
        }
      >
        See certificate
      </PrimaryButton>
    ),
  },
  {
    title: "December 2017",
    description: "Microsoft Technology Associate Certificate - C#",
    extra: (
      <PrimaryButton
        $filled
        onClick={() =>
          window.open(
            "/assets/certificates/Microsoft_Certified_Professional_Certificate_1.pdf",
            "_blank"
          )
        }
      >
        See certificate
      </PrimaryButton>
    ),
  },
  {
    title: "November 2017",
    description: "Microsoft Technology Associate Certificate - Java",
    extra: (
      <PrimaryButton
        $filled
        onClick={() =>
          window.open(
            "/assets/certificates/Microsoft_Certified_Professional_Certificate_0.pdf",
            "_blank"
          )
        }
      >
        See certificate
      </PrimaryButton>
    ),
  },
  {
    title: "August 2017 - June 2018",
    description: "Data Technician education",
  },
];

function Resume(props) {
  const { setCurrentComponent } = useContext(AppContext);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  useEffect(() => {
    if (isVisible) {
      setCurrentComponent("resume");
    }
  }, [isVisible]);
  return (
    <Container ref={containerRef}>
      <Wrapper id="resume">
        <SectionTitle>Resume</SectionTitle>
        <div className="content">
          <h2>Here's my full resume</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            corporis nesciunt veritatis! Ad eum eveniet iure nulla quisquam
            velit vero?
          </p>
          <Timeline items={items} />
        </div>
      </Wrapper>
    </Container>
  );
}

export default Resume;
