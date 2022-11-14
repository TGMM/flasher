import { Box, Typography } from "@mui/material";

function PostList() {
  return (
    <Box display="flex" justifyContent="center">
      <Typography
        sx={{
          fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
          fontWeight: 700,
        }}
        variant="h4"
      >
        Home
      </Typography>
    </Box>
  );
}

export default PostList;
