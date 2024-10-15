import Fireworks from "@fireworks-js/react";
import { Button } from "@nextui-org/react";
import Icon from "../Icon";
import { useCallback, useState } from "react";

export default function LikeButton(props: {
  upvotes: number;
  pressed: boolean;
  increaseUpVote: (voteType: number) => void;
  decreaseUpVote: () => void;
}) {
  const [showFireworks, setShowFireworks] = useState(false);

  const handleClick = useCallback(() => {
    if (!props.pressed) {
      setShowFireworks(true);
      props.increaseUpVote(1);
      setTimeout(() => setShowFireworks(false), 3000);
    } else {
      props.decreaseUpVote();
    }
  }, [props.pressed]);

  return (
    <div className="flex gap-1 items-center">
      <Button
        onClick={handleClick}
        className="hover:text-secondary"
        isIconOnly
        variant="light"
        radius="full"
        aria-label="likeButton"
      >
        {showFireworks && (
          <Fireworks
            options={{
              rocketsPoint: {
                min: 50,
                max: 50,
              },
              hue: { min: 0, max: 360 },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        )}
        <Icon
          className={`text-lg ${props.pressed ? "text-secondary" : ""}`}
          icon={props.pressed ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}
        />
      </Button>
      <p className="font-extrabold text-default-400">{props.upvotes}</p>
    </div>
  );
}
