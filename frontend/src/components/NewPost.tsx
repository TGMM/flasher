import { FormControlLabel, Radio, RadioGroup, Box } from "@mui/material";
import * as React from "react";
import NewLinkPost from "./NewLinkPost";
import NewTextPost from "./NewTextPost";

function NewPost() {
    const [chooseButton, setChooseButton] = React.useState('Text');

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChooseButton((event.target as HTMLInputElement).value);
        console.log('dshfjakhjskd' ,chooseButton);        
      };

    const choosenPage = () => {
      if (chooseButton === "Text") {
        console.log("fuck you");
        return <NewTextPost />
        
      }else{
        console.log("nahhh fuck you");
        return <NewLinkPost/>
      }
    }
    
    return (
    <Box sx={{padding: "1rem"}}>
      <RadioGroup
      row
      value={chooseButton}
      onChange={handleChangeRadio }
    >
        <FormControlLabel value="Text" control={<Radio />} label="Text post" />
        <FormControlLabel value="Link" control={<Radio />} label="Link" />
      </RadioGroup>
      {choosenPage()}
    </Box> 
    )
}

export default NewPost;