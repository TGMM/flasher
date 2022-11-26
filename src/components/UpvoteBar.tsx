import Typography from "@mui/material/Typography";
import { DownvoteIcon, UpvoteIcon } from "./CustomIcons";
import { orange, blue } from "@mui/material/colors";
import { HoverArrow, UpvoteCount, WrapperDiv } from "./UpvoteBar.style";
import { useState } from "react";

function UpvoteBar() {
  const upvoteColor = orange[500];
  const downvoteColor = blue[500];

  const handleVote = (isUpvote: boolean) => {
    if (isUpvote && currentVote !== 1) {
      setVoteCount(voteCount - currentVote + 1);
      setCurrentVote(1);
    } else if (!isUpvote && currentVote !== -1) {
      setVoteCount(voteCount - currentVote - 1);
      setCurrentVote(-1);
    } else if (isUpvote) {
      setVoteCount(voteCount - 1);
      setCurrentVote(0);
    } else if (!isUpvote) {
      setVoteCount(voteCount + 1);
      setCurrentVote(0);
    }
  };

  const [voteCount, setVoteCount] = useState(Math.floor(Math.random() * 100));
  const [currentVote, setCurrentVote] = useState(0);

  return (
    <div className={WrapperDiv}>
      <UpvoteIcon
        onClick={() => handleVote(true)}
        sx={{
          color: currentVote === 1 ? upvoteColor : undefined,
        }}
        className={`${HoverArrow(upvoteColor)}`}
      />
      <Typography className={`${UpvoteCount}`}>{voteCount}</Typography>
      <DownvoteIcon
        onClick={() => handleVote(false)}
        sx={{
          color: currentVote === -1 ? downvoteColor : undefined,
        }}
        className={`${HoverArrow(downvoteColor)}`}
      />
    </div>
  );
}

export default UpvoteBar;
