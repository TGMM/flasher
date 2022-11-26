import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../fetchUtils";

function NewSubforum() {
  const httpRequest = useHttpRequest();
  const navigate = useNavigate();

  const [subforumName, setSubforumName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!subforumName) {
      // TODO: Popup this
      alert("Subforum name is required");
    }

    const response = await httpRequest("/subforums", "POST", {
      name: subforumName,
      description,
    });
    const data = await response.json();

    if (response.ok) {
      const newSubforumName = data.name;
      navigate(`/r/${newSubforumName}`);
    } else {
      console.error(data);
    }
  };

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <TextField
        value={subforumName}
        onChange={(e) => setSubforumName(e.target.value)}
        fullWidth
        variant="filled"
        sx={{ marginTop: "1rem", backgroundColor: "inherit" }}
        label="subforum name"
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="filled"
        sx={{ marginTop: "1rem" }}
        multiline
        rows={8}
        label="description (optional)"
      />
      <Button
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: "1rem" }}
        variant="contained"
      >
        Create
      </Button>
    </Box>
  );
}

export default NewSubforum;
