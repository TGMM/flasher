import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../fetchUtils";
import { templatePostInfo } from "../mockUtils";
import { fontFamily } from "./Global.style";
import Post from "./Post";

function PostList() {
  const { subforum } = useParams();

  const httpRequest = useHttpRequest(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchPostsResponse = await httpRequest("/posts", "GET");

      if (fetchPostsResponse.ok) {
        const fetchedPosts = await fetchPostsResponse.json();
        console.log(fetchPosts);
        setPosts(fetchedPosts);
      }
    };

    fetchPosts();
  }, [httpRequest]);

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
