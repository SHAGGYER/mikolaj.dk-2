import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useDialog } from "react-st-modal";

const Container = styled.div`
  color: black;
  padding: 1rem;

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

function ConfirmDialog({ title, body }) {
  const dialog = useDialog();
  return (
    <Container>
      <h2>{title}</h2>
      <p>{body}</p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <Button type="primary" onClick={() => dialog.close(true)}>
          Yes
        </Button>
        <Button type="error" onClick={() => dialog.close(false)}>
          No
        </Button>
      </div>
    </Container>
  );
}

export default ConfirmDialog;
