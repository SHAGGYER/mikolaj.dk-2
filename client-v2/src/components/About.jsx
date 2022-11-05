import React, { useContext, useEffect } from "react";
import { Container } from "./UI/Container";
import styled from "styled-components";
import Mikolaj from "../assets/mikolaj.jpg";
import { Wrapper } from "./UI/Wrapper";
import useElementOnScreen from "../hooks/UseElementOnScreen";
import { AppContext } from "../AppContext";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "/assets/mikolaj.jpg",
  },
  {
    original: "/assets/mikolaj2.jpg",
  },
  {
    original: "/assets/mikolaj3.jpg",
  },
  {
    original: "/assets/mikolaj4.jpg",
  },
  {
    original: "/assets/mikolaj5.jpg",
  },
  {
    original: "/assets/mikolaj6.jpg",
  },
  {
    original: "/assets/mikolaj7.jpg",
  },
];

const AboutWrapper = styled(Wrapper)`
  grid-template-columns: 150px 1fr 1fr;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  p {
    line-height: 2;
    margin-bottom: 2rem;
  }
`;

function About(props) {
  const { setCurrentComponent } = useContext(AppContext);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  useEffect(() => {
    if (isVisible) {
      setCurrentComponent("about");
    }
  }, [isVisible]);

  return (
    <Container ref={containerRef}>
      <AboutWrapper id="about">
        <h3>About Me</h3>
        <ImageGallery items={images} showThumbnails={false} showBullets />
        <article>
          <h2>Interesting Me</h2>
          <hr />
          <p>
            I'm a Full Stack Developer from Poland, born in June 1991 and no
            siblings. I really love what I do and I'm sure we will have a great
            time working together, whether you have a job for me or you wish to
            learn. In my free time, I love making great food, for example
            lasagne or indian food. I also like reading books and going for a
            walk while listening to music. I share my love of games (mostly
            World of Warcraft) with my friends and I play as often as I can.
          </p>
        </article>
      </AboutWrapper>
    </Container>
  );
}

export default About;
