import React from "react";
import { Container } from "./UI/Container";
import styled from "styled-components";
import Mikolaj from "../assets/mikolaj.jpg";
import { Wrapper } from "./UI/Wrapper";

const AboutWrapper = styled(Wrapper)`
  grid-template-columns: 150px 1fr 1fr;
  margin-bottom: 3rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function About(props) {
  return (
    <Container>
      <AboutWrapper id="about">
        <h3>About Me</h3>
        <img src={Mikolaj} alt="mikolaj" />
        <article>
          <h2>Interesting Me</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium, beatae distinctio dolor dolorum ea earum est excepturi
            explicabo, fugit minima natus numquam odio quia sapiente, sed soluta
            vel vero voluptas! Accusamus beatae consequatur, culpa cum
            cupiditate, dicta dolore dolores eligendi, est ex necessitatibus
            similique unde vel. Ab accusamus amet asperiores at consectetur
            culpa doloribus harum ipsam laudantium minus non ratione
            reprehenderit temporibus, ut veritatis. Ab aperiam assumenda atque,
            commodi cumque deserunt dicta dolore doloribus eligendi error et
            excepturi facere fugiat, illo impedit incidunt ipsa iste itaque modi
            mollitia nisi nostrum porro provident quae quidem saepe sapiente
            sint vel veniam voluptate!
          </p>
        </article>
      </AboutWrapper>
    </Container>
  );
}

export default About;
