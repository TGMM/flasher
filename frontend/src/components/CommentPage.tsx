import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PublicForumPost } from "../../../db";
import { useHttpRequest } from "../fetchUtils";
import Comment from "./Comment";
import { fontFamily } from "./Global.style";
import LoginRegisterButtons from "./LoginRegisterButtons";
import Post from "./Post";

function CommentPage() {
  const { subforum, id } = useParams();
  const httpRequest = useHttpRequest();
  const [post, setPost] = useState<PublicForumPost | undefined>();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await httpRequest(`/posts/${id}`, "GET");
      if (response.ok) {
        const fetchedPost = (await response.json()) as PublicForumPost;
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, []);

  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      {post ? (
        <Post
          postInfo={{
            title: post.title,
            author: post.author_name,
            body: post.body,
            createdAt: dayjs(post.created_at),
            hasVoted: post.has_voted,
            numberOfVotes: post.votes,
            numComments: post.number_of_comments,
            subforum: post.subreddit_name,
          }}
        />
      ) : (
        <CircularProgress />
      )}
      <Box
        sx={{
          height: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            border: 1,
            borderColor: "#303030",
            borderRadius: "5px",
            height: "5rem",
            width: "100%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: fontFamily,
              fontWeight: 700,
            }}
          >
            Log in or register to leave a comment
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <LoginRegisterButtons />
        </Box>
      </Box>
      <Comment
        commentInfo={{
          author: "Author",
          body: "This is a comment!",
          createdAt: dayjs(Date.now()),
        }}
      />
    </Box>
  );
}

export default CommentPage;
