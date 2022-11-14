import { Box, Button, Card, Typography } from "@mui/material";
import { CommentIcon } from "./CustomIcons";
import { fontFamily } from "./Global.style";
import UpvoteBar from "./UpvoteBar";

function Post() {
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
            r/videos Posted by u/joao a year ago
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
            Post Title
          </Typography>
          <Typography
            sx={{
              fontFamily: fontFamily,
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            This is the content of a very long post just to test how it would
            look like
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
              }}
            >
              10 comments
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default Post;
