/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseButton, ModalContent, ModalOverlay } from "./modalStyled";

interface ModalProps {
  onClose: () => void;
  pokeParams: {
    name: string;
    sprites: {
      front_default: string;
    };
    species: {
      name: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  };
}

export function Modal({ onClose, pokeParams }: ModalProps) {
  const { name, sprites, species, types } = pokeParams;
  return (
    //teste
    <ModalOverlay>
      <CloseButton onClick={onClose}>X</CloseButton>
      <ModalContent>
        <div>
          <img src={sprites.other.home.front_default} alt={name} />
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
