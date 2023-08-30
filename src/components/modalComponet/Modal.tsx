import { CloseButton, ModalContent, ModalOverlay } from "./modalStyled";

export function Modal(props: any) {
  return (
    <ModalOverlay>
      <CloseButton onClick={props.onClose}>X</CloseButton>
      <ModalContent></ModalContent>
    </ModalOverlay>
  );
}
