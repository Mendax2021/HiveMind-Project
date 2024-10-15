import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { ReactNode } from "react";
import { Comment } from "../../models/Comment.model";

export default function IdeaCommentsModal(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  submitChanges?: () => void;
  bodyContent: ReactNode;
  addComment: (comment: Comment, ideaId: number) => void;
}) {
  return (
    <Modal
      size="4xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement="center"
      className="bg-zinc-950 text-white"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>{props.bodyContent}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
