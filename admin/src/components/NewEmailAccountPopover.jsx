import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextField from "./TextField";
import { useClickOutside } from "../hooks/ClickOutside";
import Button from "./Button";
import HttpClient from "../utilities/HttpClient";
import { FloatingLabelInput } from "react-floating-text-input/src/App";
import FloatingTextField from "./FloatingTextField";

const Container = styled.section`
  position: relative;

  & > a {
    color: var(--blue);
    text-decoration: underline;
    display: inline-block;
    margin-bottom: 0.5rem;

    &:hover {
      color: var(--blue-dark);
    }
  }
`;

const MenuStyled = styled.div`
  background: white;
  border: 1px solid black;
  padding: 1rem;
  min-width: 250px;
  position: absolute;
  top: 30px;
  left: 30px;
`;

const CloseBtn = styled.button`
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 2px;
`;

const Menu = ({ onCreated, close }) => {
  const [address, setAddress] = useState("");
  const wrapperRef = useRef();
  useClickOutside(wrapperRef, close);

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      address,
    };

    const { data } = await HttpClient().post(
      "/api/mail/create-mail-account",
      body
    );
    onCreated(data.content);
    close();
  };

  return (
    <MenuStyled ref={wrapperRef}>
      <form onSubmit={onSubmit}>
        <FloatingTextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label="New E-Mail Account"
        />
        <div className="flex gap-1">
          <Button $mini type="submit">
            Save
          </Button>
          <Button $mini variant="error" type="button" onClick={() => close()}>
            Cancel
          </Button>
        </div>
      </form>
    </MenuStyled>
  );
};

function NewEmailAccountPopover({ onCreated }) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <a href="#" onClick={() => setOpen(true)}>
        Create Email Account
      </a>
      {open && <Menu close={() => setOpen(false)} onCreated={onCreated} />}
    </Container>
  );
}

export default NewEmailAccountPopover;
