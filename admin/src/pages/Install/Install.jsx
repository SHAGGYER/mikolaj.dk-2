import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/reducers/Auth";
import Alert from "../../components/Alert";

const Container = styled.section`
  padding: 1rem;
  border-radius: 7px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 600px;
  }

  h1 {
    text-align: center;
    font-size: 40px;
  }

  .breadcrumbs {
    display: flex;
    justify-content: center;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(signIn({ email, password })).unwrap();
    } catch (e) {
      setError({ general: e.message });
    }
  };

  return (
    <Container>
      <form
        className="shadow-lg p-8 bg-gray-100 rounded-xl"
        onSubmit={onSubmit}
      >
        <h1 className="mb-4">Sign In</h1>

        {!!error.general && <Alert type="error">{error.general}</Alert>}
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          error={error.email}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          error={error.password}
        />

        <Button type="primary">Sign In</Button>
      </form>
    </Container>
  );
}

export default Login;
