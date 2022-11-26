import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function LoginRegisterButtons() {
  return (
    <>
      <Box sx={{ flexGrow: 0, marginRight: "3rem" }}>
        <Button component={RouterLink} to="/login" variant="outlined">
          Login
        </Button>
        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          sx={{ marginLeft: "2rem" }}
        >
          Register
        </Button>
      </Box>
    </>
  );
}

export default LoginRegisterButtons;
