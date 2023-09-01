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
    <ModalOverlay>
      <CloseButton onClick={onClose}>X</CloseButton>
      <ModalContent>
        <div>
          <img src={sprites.front_default} alt={name} />
          <p>{name}</p>
          <p>{species.name}</p>
          <p>
            {types.map((element, i) => {
              return <p key={i}>{element.type.name}</p>;
            })}
          </p>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
