import * as React from "react";
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
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const subforums = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
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
            {false ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
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
                  {subforums.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
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
            )}
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
