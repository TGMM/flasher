import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { templatePostInfo } from "../mockUtils";
import Comment from "./Comment";
import { fontFamily } from "./Global.style";
import LoginRegisterButtons from "./LoginRegisterButtons";
import Post from "./Post";

function CommentPage() {
  const { subforum, id } = useParams();

  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      <Post postInfo={templatePostInfo(subforum)} />
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