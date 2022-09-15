import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import cogoToast from "cogo-toast";
import HttpClient from "services/HttpClient";
import styled from "styled-components";
import { SecondaryButton, Spacer } from "components/UI";
import Alert from "components/UI/Alert";
import { Text } from "components/UI/Text";
import PublicContext from "contexts/PublicContext";
import { IUser } from "models/IUser";
import Meta from "components/Meta";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";

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

export default function Login({}: Props): ReactElement {
  const history = useHistory();
  const { redirect, setUser, redirectToExternalAuth, user } =
    useContext(PublicContext);
  const [error, setError] = useState<any>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const _error: any = {};

    if (Object.keys(_error).length) {
      return setError(_error);
    }

    const body = {
      email,
      password,
    };

    try {
      const { data } = await HttpClient().post<{ token: string; user: IUser }>(
        "/api/auth/login",
        body
      );
      localStorage.setItem("token", data.token);
      cogoToast.success("You are now logged in");
      setUser(data.user);
    } catch (e) {
      if (e.response.status === 450) {
        setError(e.response.data.errors);
      }
    }
  };

  const goToNewAccount = () => {
    redirect("/register");
  };

  return (
    <>
      <Meta
        title="Login"
        description="Login to access amazing features."
        url="/login"
      />
      <div>
        <Form onSubmit={onSubmit}>
          <Text
            size="60px"
            color="var(--primary)"
            style={{ fontFamily: "Bitrate" }}
          >
            Login
          </Text>
          <Spacer bottom="0.5rem" />

          <Alert primary>You need an account to access features</Alert>

          <TextField
            fullWidth
            margin="normal"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
            label={"Email"}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
            label={"Password"}
            type="password"
          />

          <div style={{ display: "flex", gap: "0.25rem" }}>
            <SecondaryButton type="submit">Log in</SecondaryButton>
            <SecondaryButton type="button" onClick={() => goToNewAccount()}>
              New Account
            </SecondaryButton>
            {/*    <SecondaryButton
              type="button"
              mini
              onClick={() => redirectToExternalAuth("login")}
            >
              Use Encryply.net to login.
            </SecondaryButton>*/}
          </div>
        </Form>
      </div>
    </>
  );
}
