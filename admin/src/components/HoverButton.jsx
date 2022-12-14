import styled from "styled-components";

export const HoverButton = styled.button`
  border: 2px solid #bebebe;
  background-color: #ccc;
  padding: 0.25rem 0.75rem;
  position: absolute;
  bottom: -20px;
  left: ${(props) => (props.$right ? "auto" : "0")};
  right: ${(props) => (props.$right ? "0" : "auto")};
  visibility: hidden;
`;
