import { Box, Button, Card, Input, TextField } from "@mui/material";

function NewSubforum() {
    return (
      <Box
        sx={{
          padding: "1rem",
        }}>
        <TextField 
          fullWidth 
          variant="filled" 
          sx={{marginTop: "1rem", backgroundColor: "inherit"}} 
          label="subforum name">
        </TextField>
        <TextField 
          fullWidth 
          variant="filled" 
          sx={{marginTop: "1rem"}} 
          multiline 
          rows={8} 
          label="description (optional)">
        </TextField>
        <Button 
          fullWidth  
          sx={{marginTop: "1rem"}}  
          variant="contained"> 
          Create  </Button>
      </Box>
    )
}


export default NewSubforum;