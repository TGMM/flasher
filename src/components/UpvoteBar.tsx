import Typography from "@mui/material/Typography";
import { DownvoteIcon, UpvoteIcon } from "./CustomIcons";
import { orange, blue } from "@mui/material/colors";
import {
  fontSizeControlClass,
  HoverArrow,
  WrapperDiv,
} from "./UpvoteBar.style";

function UpvoteBar() {
  const upvoteColor = orange[500];
  const downvoteColor = blue[500];

  return (
    <div className={WrapperDiv}>
      <UpvoteIcon
        className={`${HoverArrow(upvoteColor)} ${fontSizeControlClass}`}
      />
      <Typography className={fontSizeControlClass}>80</Typography>
      <DownvoteIcon
        className={`${HoverArrow(downvoteColor)} ${fontSizeControlClass}`}
      />
    </div>
  );
}

export default UpvoteBar;
