/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  CloseButton,
  ModalContent,
  ModalOverlay,
  ModalPokeImg,
} from "./modalStyled";

interface ModalProps {
  onClose: () => void;
  pokeParams: {
    name: string;
    sprites: {
      [x: string]: any;
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
  const { name, sprites } = pokeParams;
  return (
    <ModalOverlay>
      <CloseButton onClick={onClose}>X</CloseButton>
      <ModalContent>
        <ModalPokeImg src={sprites.other.home.front_default} alt={name} />
      </ModalContent>
    </ModalOverlay>
  );
}
