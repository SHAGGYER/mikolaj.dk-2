import React from "react";
import styled from "styled-components";

const TimelineStyled = styled.div`
  padding-left: 8rem;
  position: relative;

  article {
    border-left: 1px solid black;
    padding-left: 2rem;
    position: relative;
    padding-bottom: 1rem;

    &::before {
      content: "";
      position: absolute;
      left: -5px;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: black;
    }
  }
`;

function Timeline(props) {
  return (
    <TimelineStyled>
      <article>
        <h3>2022</h3>
        <p>ServicePos</p>
      </article>
      <article>
        <h3>2021</h3>
        <p>GameTime</p>
      </article>
    </TimelineStyled>
  );
}

export default Timeline;
