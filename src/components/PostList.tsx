import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { templatePostInfo } from "../mockUtils";
import { fontFamily } from "./Global.style";
import Post from "./Post";

function PostList() {
  const posts = [0];
  const { subforum } = useParams();

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        sx={{
          fontFamily: fontFamily,
          fontWeight: 700,
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        variant="h4"
      >
        {subforum ? `r/${subforum}` : "Home"}
      </Typography>
      {posts.map((p) => (
        <Post postInfo={templatePostInfo(subforum)} key={p} />
      ))}
    </Box>
  );
}

export default PostList;
