import { Button, useDisclosure } from "@nextui-org/react";
import Icon from "../Icon";
import AddIdeasModal from "./AddIdeasModal";
import { useCallback } from "react";

export default function AddIdeasButton() {
  const { isOpen, onOpenChange } = useDisclosure();

  const handleClick = useCallback(() => {
    onOpenChange();
  }, []);
  return (
    <>
      <Button onClick={handleClick} variant="flat" isIconOnly>
        <Icon className="text-xl" icon="bi bi-plus-lg" />
      </Button>
      <AddIdeasModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
