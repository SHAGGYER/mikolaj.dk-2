import React from "react";
import { Alert } from "@mui/material";
import { Wrapper } from "components/UI/Wrapper";
import { Container } from "components/UI";

function Launcher(props) {
  return (
    <Wrapper>
      <Container>
        <Alert variant="standard" color="info">
          Under construction
        </Alert>
      </Container>
    </Wrapper>
  );
}

export default Launcher;
