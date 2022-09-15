import React, { useContext, useEffect } from "react";
import { Container, Spacer } from "components/UI";
import styled from "styled-components";
import { Wrapper } from "components/UI/Wrapper";
import { Text } from "components/UI/Text";
import { Subtitle } from "components/UI/Subtitle";

const SkillsWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  justify-content: center;
  gap: 1rem;

  @media screen and (${(props) => props.theme.tabletLandscape}) {
    grid-template-columns: repeat(3, 250px);
  }

  @media screen and (${(props) => props.theme.tabletPortrait}) {
    grid-template-columns: repeat(2, 250px);
  }

  @media screen and (${(props) => props.theme.mobile}) {
    grid-template-columns: 250px;
  }
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-height: 200px;
  padding: 2rem;
  background-color: white;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.2);

  & h3 {
    font-weight: normal;
    font-size: 1.25rem;
    margin-top: 2rem;
  }

  & img {
    width: 100%;
    height: 80px;
    flex-grow: 1;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const mySkills = [
  {
    title: "CSS3",
    image: "/css3.svg",
  },
  {
    title: "HTML5",
    image: "/html5.svg",
  },
  {
    title: "JavaScript",
    image: "/js.svg",
  },
  {
    title: "Laravel",
    image: "/laravel.svg",
  },
  {
    title: "MongoDB",
    image: "/mongodb.svg",
  },
  {
    title: "MySQL",
    image: "/mysql.svg",
  },
  {
    title: "NodeJS",
    image: "/nodejs.svg",
  },
  {
    title: "PHP",
    image: "/php.svg",
  },
  {
    title: "Python",
    image: "/python.svg",
  },
  {
    title: "React",
    image: "/react.svg",
  },
  {
    title: "Typescript",
    image: "/typescript.svg",
  },
  {
    title: "Vue",
    image: "/vue.svg",
  },
];

export default function Skills() {
  return (
    <React.Fragment>
      <Wrapper white>
        <Container>
          <Subtitle align="center">
            Technical <Text color="var(--primary)">Skills</Text>
          </Subtitle>
          <SkillsWrapper>
            {mySkills.map((skill, index) => (
              <Skill key={index}>
                <img
                  src={import.meta.env.VITE_API_URL + "/uploads/" + skill.image}
                  alt={skill.title}
                />
                <h3>{skill.title}</h3>
              </Skill>
            ))}
          </SkillsWrapper>
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}
