import { Box, Button, Card, Typography } from "@mui/material";
import { CommentIcon } from "./CustomIcons";
import { fontFamily } from "./Global.style";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PublicComment } from "../../../db";
dayjs.extend(relativeTime);

interface CommentProps {
  commentInfo: PublicComment;
}

function CommentC(props: CommentProps) {
  const { commentInfo } = props;
  const { author_name, created_at, body } = commentInfo;

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
          {/* <UpvoteBar /> */}
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: fontFamily,
            }}
          >
            {`${author_name} ${dayjs(created_at).fromNow()}`}
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

export default CommentC;
