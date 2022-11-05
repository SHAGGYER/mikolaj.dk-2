import React, { useContext, useEffect } from "react";
import { Container } from "./UI/Container";
import Beach from "../assets/beach.jpg";
import { Subtitle, Title } from "./UI/Title";
import styled from "styled-components";
import { PrimaryButton } from "./UI/PrimaryButton";
import Navbar from "./Navbar";
import { AppContext } from "../AppContext";
import useElementOnScreen from "../hooks/UseElementOnScreen";

const HeaderContainer = styled.section`
  display: flex;
  position: relative;
  z-index: 11;
  height: 100%;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 767px) {
    padding: 0 1rem;
  }
`;

function Header(props) {
  const { scrollY, setCurrentComponent } = useContext(AppContext);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  useEffect(() => {
    if (isVisible) {
      setCurrentComponent("home");
    }
  }, [isVisible]);

  return (
    <div
      style={{
        background: `url("/assets/monitors.jpg") no-repeat center center / cover`,
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
      id="home"
      ref={containerRef}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          height: "100%",
        }}
      />
      {scrollY < 100 && <Navbar fixed={false} />}

      <Container>
        <HeaderContainer>
          <Title>Hello, I'm Mikolaj</Title>
          <Subtitle>I am a professional Web Developer</Subtitle>
          <PrimaryButton
            onClick={() => window.open("/assets/cv.pdf", "_blank")}
          >
            Download CV
          </PrimaryButton>
        </HeaderContainer>
      </Container>
    </div>
  );
}

export default Header;
