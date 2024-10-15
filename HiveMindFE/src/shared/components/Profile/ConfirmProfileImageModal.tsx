import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ConfirmProfileImageModal(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  submitChanges: () => void;
}) {
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      isDismissable={false}
      className="bg-zinc-900 text-white"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modifica immagine</ModalHeader>
            <ModalBody>
              <p>Sei sicuro di voler modificare l'immagine del profilo? Questa azione non è reversibile.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" variant="light" onPress={onClose}>
                No
              </Button>
              <Button color="secondary" onPress={props.submitChanges}>
                Si
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
