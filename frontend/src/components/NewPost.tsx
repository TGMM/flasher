import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import NewLinkPost from "./NewLinkPost";
import NewTextPost from "./NewTextPost";

function NewPost() {
  const [chosenPostType, setChosenPostType] = useState("Text");

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenPostType((event.target as HTMLInputElement).value);
  };

  const renderChosenPostType = () => {
    if (chosenPostType === "Text") {
      return <NewTextPost />;
    } else {
      return <NewLinkPost />;
    }
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <RadioGroup row value={chosenPostType} onChange={handleChangeRadio}>
        <FormControlLabel value="Text" control={<Radio />} label="Text post" />
        <FormControlLabel value="Link" control={<Radio />} label="Link" />
      </RadioGroup>
      {renderChosenPostType()}
    </Box>
  );
}

export default NewPost;
