import { css } from "@emotion/css";
import { Button, SxProps, TextField, Theme } from "@mui/material/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";

function Register() {
  const marginStyle: SxProps<Theme> = {
    marginTop: "2rem",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // TODO: Popup this
      alert("Error: Passwords don't match");
      return;
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) {
      console.error("Invalid backend url");
      return;
    }

    try {
      const registerResponse = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const authData = await registerResponse.json();
      if (registerResponse.ok) {
        setToken(authData.token);
        setUser(authData.user);

        navigate("/");
      } else {
        throw new Error(authData.error);
      }
    } catch (error) {
      // TODO: Popup this
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
        label="username"
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={marginStyle}
        type="password"
        id="outlined-basic"
        label="password"
        variant="outlined"
      />
      <TextField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={marginStyle}
        type="password"
        id="outlined-basic"
        label="confirm password"
        variant="outlined"
      />
      <Button variant="outlined" type="submit" sx={marginStyle}>
        Register
      </Button>
    </form>
  );
}

export default Register;
