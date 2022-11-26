import Typography from "@mui/material/Typography";
import { DownvoteIcon, UpvoteIcon } from "./CustomIcons";
import { orange, blue } from "@mui/material/colors";
import { HoverArrow, UpvoteCount, WrapperDiv } from "./UpvoteBar.style";
import { useState } from "react";
import { useHttpRequest } from "../fetchUtils";

export interface UpvoteBarProps {
  numberOfVotes: number;
  hasVoted: -1 | 0 | 1 | undefined;
  voteType: "comment" | "post";
  itemId: number;
}

function UpvoteBar(props: UpvoteBarProps) {
  const { numberOfVotes, hasVoted, voteType, itemId } = props;
  const initialVotes = numberOfVotes - (hasVoted ?? 0);

  const [voteCount, setVoteCount] = useState(numberOfVotes);
  const [currentVote, setCurrentVote] = useState(hasVoted ?? 0);

  const httpRequest = useHttpRequest();

  const upvoteColor = orange[500];
  const downvoteColor = blue[500];

  const handleVote = async (val: -1 | 0 | 1) => {
    if (currentVote === val) {
      val = 0;
    }

    await submitVoteValue(val);
  };

  const submitVoteValue = async (voteValue: -1 | 0 | 1) => {
    const response = await httpRequest(`/votes/${voteType}`, "POST", {
      item_id: itemId,
      vote_value: voteValue,
    });

    const data = await response.json();
    if (response.ok) {
      const newVoteValue = data.vote_value;
      setCurrentVote(newVoteValue);
      setVoteCount(initialVotes + newVoteValue);
    } else {
      alert("Error submitting vote");
    }
  };

  return (
    <div className={WrapperDiv}>
      <UpvoteIcon
        onClick={() => handleVote(1)}
        sx={{
          color: currentVote === 1 ? upvoteColor : undefined,
        }}
        className={`${HoverArrow(upvoteColor)}`}
      />
      <Typography className={`${UpvoteCount}`}>{voteCount}</Typography>
      <DownvoteIcon
        onClick={() => handleVote(-1)}
        sx={{
          color: currentVote === -1 ? downvoteColor : undefined,
        }}
        className={`${HoverArrow(downvoteColor)}`}
      />
    </div>
  );
}

export default UpvoteBar;
