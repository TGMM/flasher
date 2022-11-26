import { css } from "@emotion/css";
import { Button, SxProps, TextField, Theme } from "@mui/material/";

function Login() {
  const marginStyle: SxProps<Theme> = {
    marginTop: "2rem",
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <TextField
        sx={marginStyle}
        id="outlined-basic"
        label="username"
        variant="outlined"
      />
      <TextField
        sx={marginStyle}
        type="password"
        id="outlined-basic"
        label="password"
        variant="outlined"
      />
      <TextField
        sx={marginStyle}
        type="password"
        id="outlined-basic"
        label="confirm password"
        variant="outlined"
      />
      <Button variant="outlined" sx={marginStyle}>
        Register
      </Button>
    </div>
  );
}

export default Login;
