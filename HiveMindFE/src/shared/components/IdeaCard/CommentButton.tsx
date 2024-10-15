import { Button } from "@nextui-org/react";
import Icon from "../Icon";
import { Idea } from "../../models/Idea.model";

export default function CommentButton(props: { idea: Idea; onClick: () => void }) {
  return (
    <>
      <div className="flex gap-1 items-center">
        <Button
          className="hover:text-secondary"
          isIconOnly
          variant="light"
          radius="full"
          onClick={props.onClick}
          aria-label="commentButton"
        >
          <Icon className="text-xl " icon="bi-chat" />
        </Button>
        <p className="font-extrabold text-default-400">{props.idea.Comments.length}</p>
      </div>
    </>
  );
}
