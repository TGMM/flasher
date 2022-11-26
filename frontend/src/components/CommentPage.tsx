import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PublicComment, PublicForumPost } from "../../../db";
import { useHttpRequest } from "../fetchUtils";
import CommentC from "./Comment";
import { fontFamily } from "./Global.style";
import LoginRegisterButtons from "./LoginRegisterButtons";
import Post from "./Post";

interface PostCommentData {
  post: PublicForumPost;
  comments: PublicComment[];
}

function CommentPage() {
  const { id } = useParams();
  const postId = id;

  const httpRequest = useHttpRequest();
  const [postComments, setPostComments] = useState<PostCommentData>();

  useEffect(() => {
    const fetchPosts = async () => {
      const route = `/comments/${postId}`;
      const fetchPostCommentsResponse = await httpRequest(route, "GET");

      if (fetchPostCommentsResponse.ok) {
        const fetchedPostComments =
          (await fetchPostCommentsResponse.json()) as PostCommentData;
        setPostComments(fetchedPostComments);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const post = postComments?.post;
  const comments = postComments?.comments;

  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      {post ? (
        <Post
          postInfo={{
            id: post.id,
            title: post.title,
            author: post.author_name,
            body: post.body,
            createdAt: dayjs(post.created_at),
            hasVoted: post.has_voted,
            numberOfVotes: post.votes,
            numComments: comments?.length ?? 0,
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
      {comments?.map((comment) => (
        <CommentC commentInfo={comment} />
      ))}
    </Box>
  );
}

export default CommentPage;
