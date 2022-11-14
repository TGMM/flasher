import { Box, Typography } from "@mui/material";
import { fontFamily } from "./Global.style";
import Post from "./Post";

function PostList() {
  const posts = [0];

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
        Home
      </Typography>
      {posts.map((p) => (
        <Post></Post>
      ))}
    </Box>
  );
}

export default PostList;
