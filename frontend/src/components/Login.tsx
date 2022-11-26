import React, { useState } from "react";
import { css } from "@emotion/css";
import { Button, SxProps, TextField, Theme } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";

function Login() {
  const marginStyle: SxProps<Theme> = {
    marginTop: "2rem",
  };

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setToken] = useSessionStorageState<string | undefined>("token");
  const [, setUser] = useSessionStorageState<
    | {
        id: number;
        username: string;
        created_at: Date;
        updated_at: Date;
      }
    | undefined
  >("user");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) {
      console.error("Invalid backend url");
      return;
    }

    try {
      const loginResponse = await fetch(`${backendUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        setUser(loginData.user);
        setToken(loginData.token);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={marginStyle}
        id="outlined-basic"
        name="name"
        label="username"
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={marginStyle}
        type="password"
        id="outlined-basic"
        name="password"
        label="password"
        variant="outlined"
      />
      <Button type="submit" variant="outlined" sx={marginStyle}>
        Login
      </Button>
    </form>
  );
}

export default Login;
