import React, { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { useClickOutside } from "../hooks/ClickOutside";
import HttpClient from "../utilities/HttpClient";
import FloatingTextField from "./FloatingTextField";
import Button from "./Button";
import { setsEqual } from "chart.js/helpers";

const MenuStyled = styled.ul`
  background: white;
  list-style: none;
  border: 1px solid black;
  padding: 1rem;
  min-width: 250px;
  position: absolute;
  left: 0;
  z-index: 999;

  & li {
    cursor: pointer;
  }
`;

const ErrorStyle = styled.span`
  color: #de1511;
  text-align: left;
`;

const FloatingTextFieldStyled = styled.div`
  &.field {
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
  }

  label,
  input {
    transition: all 0.2s;
  }

  input {
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0.75rem 0.75rem;
    border-radius: 7px;
    z-index: 0;
    width: 100%;
  }

  input:focus {
    outline: 0;
    border: 1px solid #3d5471;
  }

  label {
    color: #3d5471;
    background: white;
    position: absolute;
    left: 0.5rem;
    top: 0.7rem;
  }

  input:placeholder-shown + label {
    cursor: text;
  }

  input::placeholder {
    opacity: 0;
    transition: inherit;
  }

  input:not(:placeholder-shown) + label,
  input:focus + label {
    top: -0.7rem;
    color: #464dff;
    left: 0.3rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Menu = ({ onSelected, close, contacts }) => {
  const wrapperRef = useRef();
  useClickOutside(wrapperRef, close);

  const handleSelectedContact = (contact) => {
    onSelected(contact);
    close();
  };

  return (
    <div>
      <MenuStyled ref={wrapperRef}>
        {contacts.map((contact, index) => (
          <li key={index} onClick={() => handleSelectedContact(contact)}>
            {contact.name} - {contact.address}
          </li>
        ))}
      </MenuStyled>
    </div>
  );
};

function Autocomplete({
  label,
  type,
  error,
  innerRef,
  onSelectedContact,
  defaultContact,
}) {
  const uuid = useId();
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (search) {
      let timeoutId = setTimeout(async () => {
        await getContacts();
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [search]);

  const handleOnSelected = (contact) => {
    console.log(contact);
    setSearch("");
    setSelectedContact(contact.address);
    onSelectedContact(contact.address);
  };

  const getContacts = async () => {
    const { data } = await HttpClient().post("/api/mail/search-contacts", {
      search,
    });
    setContacts(data.content);
    setOpen(true);
  };

  return (
    <Container>
      <FloatingTextFieldStyled className="field">
        {!!error && <ErrorStyle>{error}</ErrorStyle>}
        <input
          ref={innerRef}
          id={uuid}
          type={type}
          value={selectedContact || search || defaultContact}
          onFocus={() => setSelectedContact("")}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type here..."
        />
        <label htmlFor={uuid}>{label}</label>
      </FloatingTextFieldStyled>
      {open && !!contacts.length && (
        <Menu
          close={() => setOpen(false)}
          onSelected={handleOnSelected}
          contacts={contacts}
        />
      )}
    </Container>
  );
}

export default Autocomplete;
