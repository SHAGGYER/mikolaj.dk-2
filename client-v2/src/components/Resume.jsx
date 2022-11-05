import React from "react";
import { Container } from "./UI/Container";
import Timeline from "./UI/Timeline";
import { PrimaryButton } from "./UI/PrimaryButton";
import { Wrapper } from "./UI/Wrapper";

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
    description: "Web Developer education",
  },
  {
    title: "August 2017 - June 2018",
    description: "Data Technician education",
  },
];

function Resume(props) {
  return (
    <Container>
      <Wrapper id="resume">
        <h3>Resume</h3>
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
