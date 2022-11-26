import { Box, Button, Card, SxProps, Theme, Typography } from "@mui/material";
import { CommentIcon } from "./CustomIcons";
import { fontFamily } from "./Global.style";
import UpvoteBar from "./UpvoteBar";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export interface PostInfo {
  subforum: string;
  author: string;
  createdAt: dayjs.Dayjs;
  title: string;
  body: string;
  numComments: number;
  numberOfVotes: number;
  hasVoted: -1 | 0 | 1 | undefined;
}

interface PostProps {
  postInfo: PostInfo;
  sx?: SxProps<Theme>;
}

function Post(props: PostProps) {
  dayjs.extend(relativeTime);
  const {
    body,
    subforum,
    author,
    title,
    createdAt,
    numComments,
    hasVoted,
    numberOfVotes,
  } = props.postInfo;
  const extraSx = props.sx;

  return (
    <Card
      sx={{
        width: "100%",
        ...extraSx,
      }}
    >
      <Box
        display="flex"
        sx={{
          padding: "1.5rem",
        }}
      >
        <Box display="flex" marginRight="1.2rem">
          <UpvoteBar hasVoted={hasVoted} numberOfVotes={numberOfVotes} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: fontFamily,
            }}
          >
            {`${subforum} Posted by ${author} ${createdAt.fromNow()}`}
          </Typography>
          <Typography
            sx={{
              fontFamily: fontFamily,
              fontWeight: 500,
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
            variant="h5"
          >
            {title}
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
              to={`/r/${subforum}/comments/${1}`}
            >
              {`${numComments} comments`}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Post;
