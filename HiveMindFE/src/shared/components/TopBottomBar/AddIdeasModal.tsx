import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import IdeaCreationForm from "../IdeaCreationForm";
import { useContext } from "react";
import { AddIdeaContext } from "../../context/FuncAddIdeaContext";

export default function AddIdeasModal(props: { isOpen: boolean; onOpenChange: () => void }) {
  const addIdeaContext = useContext(AddIdeaContext);

  return (
    <Modal placement="center" isOpen={props.isOpen} onOpenChange={props.onOpenChange} className="dark text-white">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Aggiungi un'idea</ModalHeader>
            <ModalBody>{addIdeaContext?.addIdea && <IdeaCreationForm addIdea={addIdeaContext?.addIdea} />}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
