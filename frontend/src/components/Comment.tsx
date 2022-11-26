import { Box, Button, Card, Typography } from "@mui/material";
import { CommentIcon } from "./CustomIcons";
import { fontFamily } from "./Global.style";
import UpvoteBar from "./UpvoteBar";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export interface CommentInfo {
  author: string;
  createdAt: dayjs.Dayjs;
  body: string;
}

interface CommentProps {
  commentInfo: CommentInfo;
}

function Comment(props: CommentProps) {
  dayjs.extend(relativeTime);
  const { body, author, createdAt } = props.commentInfo;

  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <Box
        display="flex"
        sx={{
          padding: "1.5rem",
        }}
      >
        <Box display="flex" marginRight="1.2rem">
          <UpvoteBar />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: fontFamily,
            }}
          >
            {`${author} ${createdAt.fromNow()}`}
          </Typography>
          <Typography
            sx={{
              fontFamily: fontFamily,
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            {body}
          </Typography>
          <Button>
            <CommentIcon
              sx={{
                fontSize: "1rem",
                marginRight: "0.4rem",
              }}
            />
            <Typography
              sx={{
                fontFamily: fontFamily,
                fontSize: "1rem",
                textTransform: "none",
                color: "inherit",
                textDecoration: "none",
              }}
              component={RouterLink}
              to={`/`}
            >
              Reply
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Comment;
