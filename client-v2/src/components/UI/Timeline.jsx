import React from "react";
import styled from "styled-components";

const SnakeItem = styled.div`
  & {
    font-size: 1em;
    line-height: 1.75em;
    border-width: 3px;
    border-top-style: solid;
    border-color: var(--primary);
    margin: 0;
    padding: 20px 40px;
    counter-increment: section;
    position: relative;
    color: black;
  }

  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    transform: translateY(4px);
    height: 20px;
    width: 20px;
    background-color: var(--primary);
    text-align: center;
    line-height: 1.25em;
    color: white;
    font-size: 1em;
  }

  &:nth-child(odd) {
    text-align: right;
    border-right-width: 3px;
    border-right-style: solid;
    padding-left: 0;

    &:before {
      left: 100%;
      margin-left: -9px;
    }
  }

  &:nth-child(even) {
    border-left-width: 3px;
    border-left-style: solid;
    padding-right: 0;

    &:before {
      right: 100%;
      margin-right: -9px;
    }
  }

  //handle first and last
  &:first-child {
    border-top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;

    &:before {
      transform: translateY(0px);
    }
  }

  &:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SnakeStyle = styled.div`
  max-width: 600px;
  width: 100%;

  ${SnakeItem} {
    position: relative;

    & h2 {
      font-weight: bold;
      font-size: 1.2rem;
      letter-spacing: 1px;
    }

    & p {
      font-size: 1.15rem;
    }

    &:first-child {
      position: relative;

      & h2 {
        position: relative;
        top: -2px;
      }

      & p {
        position: relative;
        top: -2px;
      }
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export default function Timeline({ items }) {
  return (
    <SnakeStyle>
      {items.map((item, index) => (
        <SnakeItem number={items.length - index} key={index}>
          <h2>{item.title}</h2>
          <p>
            <span>{item.description}</span>
            {item.extra && <div>{item.extra}</div>}
          </p>
        </SnakeItem>
      ))}
    </SnakeStyle>
  );
}
