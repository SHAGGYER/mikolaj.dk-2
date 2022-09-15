import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useClickOutside } from "../hooks/ClickOutside";

const Wrapper = styled.div`
  position: relative;

  section {
    position: absolute;
    right: 0;
    bottom: -45px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 0.5rem;
    width: 200px;
  }
`;

function Dropdown({ btnCmp, component }) {
  const [isOpen, setOpen] = useState();

  const wrapper = useRef();
  useClickOutside(wrapper, () => setOpen(false));

  return (
    <Wrapper>
      <Button onClick={() => setOpen(!isOpen)}>{btnCmp}</Button>
      {isOpen && <section ref={wrapper}>{component}</section>}
    </Wrapper>
  );
}

export default Dropdown;
