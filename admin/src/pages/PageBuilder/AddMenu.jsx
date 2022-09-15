import React, { useRef, useState } from "react";
import { useClickOutside } from "../../../../client-common/hooks/ClickOutside";
import styled from "styled-components";

const AddMenuStyled = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  border: 1px solid black;
  padding: 1rem;
  background-color: white;
  z-index: 2;
  width: 300px;
`;

function AddMenu({ component: Component, onFinish, only }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef();
  useClickOutside(wrapperRef, () => setOpen(false));

  return (
    <>
      <i className="fa-solid fa-plus" onClick={() => setOpen(true)}></i>
      {open && (
        <AddMenuStyled ref={wrapperRef}>
          <Component onFinish={onFinish} only={only} />
        </AddMenuStyled>
      )}
    </>
  );
}

export default AddMenu;
