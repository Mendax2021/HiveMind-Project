import { Button } from "@nextui-org/react";
import Icon from "../Icon";
import { useCallback } from "react";

export default function DislikeButton(props: {
  downvotes: number;
  pressed: boolean;
  increaseDownVote: (voteType: number) => void;
  decreaseDownVote: () => void;
}) {
  const handleClick = useCallback(
    () => (!props.pressed ? props.increaseDownVote(-1) : props.decreaseDownVote()),
    [props.pressed]
  );

  return (
    <div className="flex gap-1 items-center">
      <Button
        onClick={handleClick}
        className="hover:text-secondary"
        isIconOnly
        variant="light"
        radius="full"
        aria-label="dislikeButton"
      >
        <Icon
          className={`text-lg ${props.pressed ? "text-secondary" : ""}`}
          icon={props.pressed ? "bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"}
        />
      </Button>

      <p className="font-extrabold text-default-400">{props.downvotes}</p>
    </div>
  );
}
