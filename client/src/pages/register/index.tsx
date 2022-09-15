import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import cogoToast from "cogo-toast";
import HttpClient from "services/HttpClient";
import styled from "styled-components";
import { SecondaryButton, Spacer } from "components/UI";
import { Text } from "components/UI/Text";
import PublicContext from "contexts/PublicContext";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";

const Wrapper = styled.section`
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  position: relative;
`;

interface Props {}

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  position: relative;
  z-index: 0;
`;

export default function Register({}: Props): ReactElement {
  const history = useHistory();

  const { redirect, setMeta } = useContext(PublicContext);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [error, setError] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const _error: any = {};

    if (Object.keys(_error).length) {
      return setError(_error);
    }

    const data = {
      name,
      passwordAgain,
      email,
      password,
    };

    try {
      await HttpClient().post("/api/auth/register", data);
      cogoToast.success("Du er registreret.");
      goToLogin();
    } catch (e) {
      if (e.response.status === 450) {
        setError(e.response.data.errors);
      }
    }
  };

  const goToLogin = () => {
    redirect("/login");
  };

  return (
    <Wrapper>
      <form style={{ position: "relative", zIndex: 1 }} onSubmit={onSubmit}>
        <Text
          size="60px"
          color="var(--primary)"
          style={{ fontFamily: "Bitrate" }}
        >
          New Account
        </Text>
        <Spacer bottom="1rem" />

        <TextField
          margin="normal"
          fullWidth
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error.name}
          helperText={error.name}
          label={"Name"}
        />
        <TextField
          margin="normal"
          fullWidth
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error.email}
          helperText={error.email}
          label={"Email"}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error.password}
          helperText={error.password}
          label={"Password"}
          type="password"
        />
        <TextField
          margin="normal"
          fullWidth
          name="passwordAgain"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          error={!!error.passwordAgain}
          helperText={error.passwordAgain}
          label={"Password Again"}
          type="password"
        />

        <div style={{ display: "flex", gap: "0.25rem", marginTop: "1rem" }}>
          <SecondaryButton type="submit">Create New Account</SecondaryButton>
          <SecondaryButton type="button" onClick={() => redirect("/login")}>
            Log in
          </SecondaryButton>
        </div>
      </form>
    </Wrapper>
  );
}
