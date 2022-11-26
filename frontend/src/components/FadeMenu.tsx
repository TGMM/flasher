import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Divider, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const { subforum } = event.currentTarget.dataset;
    navigate(`/${subforum}`);
    setAnchorEl(null);
  };

  const menuItems = ["r/videogames", "r/pets", "r/music", "r/movies"];

  return (
    <div>
      <Button
        variant="outlined"
        disableElevation
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography sx={{ textTransform: "none" }}>Home</Typography>
        <ArrowDropDownIcon></ArrowDropDownIcon>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        elevation={0}
      >
        <MenuItem onClick={handleClose} data-subforum={""}>
          Home
        </MenuItem>
        <Divider />
        {menuItems.map((item) => (
          <MenuItem key={item} data-subforum={item} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
