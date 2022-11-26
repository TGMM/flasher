import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PublicForumPost } from "../../../db";
import { useHttpRequest } from "../fetchUtils";
import { fontFamily } from "./Global.style";
import Post from "./Post";

function PostList() {
  const { subforum } = useParams();

  const httpRequest = useHttpRequest();
  const [posts, setPosts] = useState<PublicForumPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const route = subforum ? `/posts?subreddit=${subforum}` : "/posts";
      const fetchPostsResponse = await httpRequest(route, "GET");

      if (fetchPostsResponse.ok) {
        const fetchedPosts = await fetchPostsResponse.json();
        setPosts(fetchedPosts);
      }
    };

    fetchPosts();
  }, []);

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
        <Post
          postInfo={{
            id: p.id,
            author: p.author_name,
            body: p.body,
            createdAt: dayjs(p.created_at),
            numComments: p.number_of_comments,
            subforum: p.subreddit_name,
            title: p.title,
            hasVoted: p.has_voted,
            numberOfVotes: p.votes,
          }}
          key={p.id}
        />
      ))}
    </Box>
  );
}

export default PostList;
