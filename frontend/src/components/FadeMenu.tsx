import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Divider, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate, useLocation } from "react-router-dom";
import type { Subforum } from "../../../db";
import { useHttpRequest } from "../fetchUtils";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const httpRequest = useHttpRequest();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const { subforum } = event.currentTarget.dataset;
    if (subforum == null || subforum === undefined) {
      setAnchorEl(null);
      return;
    }

    navigate(`/${subforum}`);
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchSubforums = async () => {
      const response = await httpRequest("/subforums", "GET");
      if (response.ok) {
        const fetchedSubforums = (await response.json()) as Subforum[];
        setSubforums(fetchedSubforums);
      }
    };

    fetchSubforums();
  }, []);

  const [subforums, setSubforums] = useState<Subforum[]>([]);

  const getButtonPath = () => {
    if (!pathname.startsWith("/r")) {
      return "Home";
    }

    const slashSplit = pathname.split("/");
    if (slashSplit.length > 2) {
      return [slashSplit[0], slashSplit[1], slashSplit[2]].join("/");
    }
    return pathname;
  };

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
        <Typography sx={{ textTransform: "none" }}>
          {pathname !== "/" ? getButtonPath() : "Home"}
        </Typography>
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
        {subforums.map((subforum) => (
          <MenuItem
            key={subforum.id}
            data-subforum={`r/${subforum.name.toLowerCase()}`}
            onClick={handleClose}
          >
            {`/r/${subforum.name.toLowerCase()}`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
