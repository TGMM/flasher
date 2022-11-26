import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BoltIcon from "@mui/icons-material/Bolt";
import { TypographyStyle } from "./ResponsiveAppBar.style";
import FadeMenu from "./FadeMenu";
import { Link as RouterLink } from "react-router-dom";
import LoginRegisterButtons from "./LoginRegisterButtons";
import useSessionStorageState from "use-session-storage-state";
import { AuthToken, AuthUser, useHttpRequest } from "../fetchUtils";
import { Button } from "@mui/material";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [, setToken] = useSessionStorageState<AuthToken>("token");
  const [user, setUser] = useSessionStorageState<AuthUser>("user");

  const httpRequest = useHttpRequest();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) {
      console.error("Invalid backend url");
      return;
    }

    try {
      await httpRequest("/users/logout", "POST");
    } catch (error) {
      console.error(error);
    }

    setToken(undefined);
    setUser(undefined);

    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* Desktop */}
          <>
            <BoltIcon
              sx={{
                display: { xs: "none", md: "flex", marginLeft: "1.5rem" },
                mr: 1,
              }}
            />
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              noWrap
              sx={{
                ...TypographyStyle,
                display: { xs: "none", md: "flex" },
              }}
            >
              flasher
            </Typography>
            <FadeMenu></FadeMenu>
            {user ? (
              <Button
                component={RouterLink}
                to="/submit"
                variant="outlined"
                disableElevation
                sx={{
                  marginLeft: "1rem",
                }}
              >
                Submit
              </Button>
            ) : null}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
            {user ? (
              <Button
                component={RouterLink}
                to="/subforums/create"
                variant="outlined"
                disableElevation
                sx={{
                  marginRight: "1rem",
                }}
              >
                Create subreddit
              </Button>
            ) : null}
          </>

          {/* Mobile */}
          <>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
            <BoltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              component={RouterLink}
              to="/"
              variant="h5"
              noWrap
              sx={{
                ...TypographyStyle,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              flasher
            </Typography>
          </>

          {/* Both */}
          <>
            {user ? (
              <>
                <Typography mr={"1rem"}>{user.username}</Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <LoginRegisterButtons />
            )}
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
