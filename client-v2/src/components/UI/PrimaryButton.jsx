import styled from "styled-components";

export const PrimaryButton = styled.button`
  border: 1px solid var(--primary);
  border-radius: 7px;
  width: 130px;
  height: 50px;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.$filled ? "black" : "white")};

  background: linear-gradient(
    to right,
    var(--primary) 50%,
    ${(props) => (props.$filled ? "white" : "transparent")} 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease-out;

  &:hover {
    background-position: left bottom;
    color: black !important;
  }
`;
