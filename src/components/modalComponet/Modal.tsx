import { ModalContent, ModalOverlay } from "./modalStyled";

export function Modal(children: any, onClose: any) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
