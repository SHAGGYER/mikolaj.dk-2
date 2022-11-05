import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useClickOutside } from "../hooks/ClickOutside";
import Button from "./Button";
import HttpClient from "../utilities/HttpClient";
import FloatingTextField from "./FloatingTextField";
import DeleteButton from "./DeleteButton";

const Container = styled.section`
  position: relative;
  z-index: 999;

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

const Menu = ({ onDeleted, close, account }) => {
  const [address, setAddress] = useState("");
  const wrapperRef = useRef();
  useClickOutside(wrapperRef, close);

  const deleteMailAccount = async () => {
    await HttpClient().delete("/api/mail/delete-account/" + account._id);
    onDeleted();
    close();
  };

  return (
    <MenuStyled ref={wrapperRef}>
      <div className="flex gap-1">
        <DeleteButton onSuccess={deleteMailAccount} />
        <Button $mini variant="error" type="button" onClick={() => close()}>
          Cancel
        </Button>
      </div>
    </MenuStyled>
  );
};

function MailSettingsPopover({ onDeleted, account }) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <i
        className="fa-solid fa-cog text-gray-500"
        onClick={() => setOpen(true)}
      />
      {open && (
        <Menu
          close={() => setOpen(false)}
          onDeleted={onDeleted}
          account={account}
        />
      )}
    </Container>
  );
}

export default MailSettingsPopover;
