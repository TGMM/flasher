import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fontFamily } from "./Global.style";
import Post, { PostInfo } from "./Post";
import dayjs from "dayjs";

function PostList() {
  const posts = [0];
  const { subforum } = useParams();

  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  const rDate = randomDate(new Date(2012, 0, 1), new Date());

  const templatePostInfo: PostInfo = {
    subforum: `r/${subforum ?? "test"}`,
    title: "Super fun post",
    body: "This post is so fun to read, it has many words and it says a ton of stuff",
    author: "noobmaster69",
    createdAt: dayjs(rDate),
    numComments: Math.ceil(Math.random() * 75),
  };

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
        <Post postInfo={templatePostInfo} key={p} />
      ))}
    </Box>
  );
}

export default PostList;
