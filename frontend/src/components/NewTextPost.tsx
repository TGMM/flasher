import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as React from "react";

function NewTextPost() {
    const [subforum, setSubforum] = React.useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
      setSubforum(event.target.value as string);
    };

    return (
        <Box sx={{padding: "1rem"}}>
        <TextField 
          fullWidth 
          variant="filled" 
          sx={{marginTop: "1rem", backgroundColor: "inherit"}} 
          label="Title">
        </TextField>
        <TextField 
          fullWidth 
          variant="filled" 
          sx={{marginTop: "1rem"}} 
          multiline 
          rows={8} 
          label="Text (optional)">
        </TextField>
        <Box>
          <FormControl fullWidth sx={{marginTop: "1rem"}}>
          <InputLabel id="demo-simple-select-label">Choose a subforum</InputLabel>
            <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subforum}
              variant="filled"
              label="Choose a subforum"
              onChange={handleChangeSelect}>
                

              <MenuItem value={'yep forum'}>Yep forum</MenuItem>
              <MenuItem value={'nop forum'}>Nop forum</MenuItem>
              <MenuItem value={'cringe forum'}>Cringe forum</MenuItem>
            </Select>
            </FormControl>
          </Box>
        <Button 
          fullWidth  
          sx={{marginTop: "1rem"}}  
          variant="contained"> 
          Submit  </Button>
      </Box>
    )
}

export default NewTextPost;