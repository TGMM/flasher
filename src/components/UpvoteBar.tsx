import Typography from "@mui/material/Typography";
import { DownvoteIcon, UpvoteIcon } from "./CustomIcons";
import { orange, blue } from "@mui/material/colors";
import { HoverArrow, UpvoteCount, WrapperDiv } from "./UpvoteBar.style";

function UpvoteBar() {
  const upvoteColor = orange[500];
  const downvoteColor = blue[500];

  return (
    <div className={WrapperDiv}>
      <UpvoteIcon className={`${HoverArrow(upvoteColor)}`} />
      <Typography className={`${UpvoteCount}`}>80</Typography>
      <DownvoteIcon className={`${HoverArrow(downvoteColor)}`} />
    </div>
  );
}

export default UpvoteBar;
