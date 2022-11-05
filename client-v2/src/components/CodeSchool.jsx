import React, { useContext, useEffect } from "react";
import { Container } from "./UI/Container";
import styled from "styled-components";
import { Wrapper } from "./UI/Wrapper";
import Testimonials from "./Testimonials";
import { AppContext } from "../AppContext";
import useElementOnScreen from "../hooks/UseElementOnScreen";
import { SectionTitle } from "./UI/Title";

const Box = styled.div`
  border: 2px solid var(--primary);
  padding: 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  i {
    font-size: 40px;
    color: var(--primary);
  }

  h4 {
    transition: all 0.5s ease-in-out;
  }

  &:hover {
    h4 {
      color: var(--primary);
    }
  }
`;

const Boxes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 934px) {
    grid-template-columns: 1fr;
  }
`;

const items = [
  {
    title: "Frontend",
    icon: <i className="fa-brands fa-html5"></i>,
    description:
      "HTML, CSS and JavaScript are the languages you will learn here.",
  },
  {
    title: "Backend",
    icon: <i className="fa-brands fa-php"></i>,
    description: "Backend is a powerful tool for building web applications.",
  },
  {
    title: "Server & Deployment",
    icon: <i className="fa-solid fa-server"></i>,
    description: "I will teach you to manage your server and deploy your apps",
  },
  {
    title: "Online Meetings",
    icon: <i className="fa-solid fa-earth-americas" />,
    description:
      "We will meet online through Discord, Messenger, Zoom or Skype",
  },
  {
    title: "Time Friendly",
    icon: <i className="fa-solid fa-hourglass-half" />,
    description:
      "I respect your time and so I will be able to help you within the ordered time",
  },
  {
    title: "Pricing",
    icon: <i className="fa-solid fa-money-bill-wave"></i>,
    description: "My pricing is 200DKK per hour",
  },
];

const TechImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
  filter: grayscale(100%);
`;

const TechContainer = styled.div`
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 5rem;

  article {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

function CodeSchool(props) {
  const { setCurrentComponent } = useContext(AppContext);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.35,
  });

  useEffect(() => {
    if (isVisible) {
      setCurrentComponent("code-school");
    }
  }, [isVisible]);

  return (
    <Container>
      <Wrapper id="code-school" ref={containerRef}>
        <SectionTitle>Code School</SectionTitle>
        <div className="content">
          <h2>I teach coding...</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            deleniti neque totam.
          </p>
          <Boxes>
            {items.map((item, index) => (
              <Box key={index}>
                {item.icon}
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Box>
            ))}
          </Boxes>
          <TechContainer>
            <h3>Technologies you will learn...</h3>
            <article>
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/html5.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/css3.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/js.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/react.svg"}
              />
              <TechImage
                src={import.meta.env.VITE_API_URL + "/uploads" + "/vue.svg"}
              />
              <TechImage src={"/assets" + "/php.png"} />
              <TechImage src={"/assets" + "/nodejs.png"} />
            </article>
          </TechContainer>
          <h2>What my clients say...</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            deleniti neque totam.
          </p>
          <Testimonials />
        </div>
      </Wrapper>
    </Container>
  );
}

export default CodeSchool;
