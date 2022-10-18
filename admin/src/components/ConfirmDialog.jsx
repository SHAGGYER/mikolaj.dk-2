import styled from "styled-components";
import React, { useRef, useState } from "react";
import Button from "./Button";
import { useClickOutside } from "../hooks/ClickOutside";

const DeleteMenu = styled.div`
  position: absolute;
  padding: 1rem;
  min-width: 250px;
  background: white;
  border: 1px solid #ccc;
  right: 0;
  z-index: 999;
`;

export const ConfirmDialog = ({ onSuccess, title }) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef();
  useClickOutside(wrapperRef, () => setOpen(false));

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  return (
    <div className="relative">
      <a href="#" onClick={() => setOpen(true)}>
        Delete
      </a>
      {open && (
        <DeleteMenu ref={wrapperRef}>
          <h3>{title}</h3>
          <div className="flex gap-1 mt-2">
            <Button $mini variant="primary" onClick={handleSuccess}>
              OK
            </Button>
            <Button $mini variant="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DeleteMenu>
      )}
    </div>
  );
};
