import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { PublicForumPost, Subforum } from "../../../db";
import { useHttpRequest } from "../fetchUtils";
import { useNavigate } from "react-router-dom";

function NewTextPost() {
  const [subforums, setSubforums] = useState<Subforum[]>([]);
  const httpRequest = useHttpRequest();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [subforum, setSubforum] = useState("");

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

  const handleSubmit = async () => {
    if (!title || !subforum) {
      // TODO: Popup this
      alert("Title and subforum are required");
    }

    const response = await httpRequest("/posts", "POST", {
      type: "text",
      title,
      body,
      subforum,
    });

    const data = (await response.json()) as PublicForumPost;
    if (response.ok) {
      navigate(`/r/${subforum}/comments/${data.id}`);
    } else {
      console.error(data);
    }
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="filled"
        sx={{ marginTop: "1rem", backgroundColor: "inherit" }}
        label="Title"
      ></TextField>
      <TextField
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fullWidth
        variant="filled"
        sx={{ marginTop: "1rem" }}
        multiline
        rows={8}
        label="Text (optional)"
      ></TextField>
      <Box>
        <FormControl fullWidth sx={{ marginTop: "1rem" }}>
          <InputLabel id="demo-simple-select-label">
            Choose a subforum
          </InputLabel>
          <Select
            value={subforum}
            onChange={(e) => setSubforum(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="filled"
            label="Choose a subforum"
          >
            {subforums.map((sf) => (
              <MenuItem key={sf.id} value={sf.name}>{`r/${sf.name}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: "1rem" }}
        variant="contained"
      >
        Submit{" "}
      </Button>
    </Box>
  );
}

export default NewTextPost;
