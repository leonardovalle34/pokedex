import { CloseButton, ModalContent, ModalOverlay } from "./modalStyled";

export function Modal(props: any) {
  const pokeInModal: any = [props.pokeParams];
  return (
    <ModalOverlay>
      <CloseButton onClick={props.onClose}>X</CloseButton>
      <ModalContent>
        {pokeInModal.map((el: any, i: any) => {
          return (
            <div>
              <img src={el.sprites.other.home.front_default} />
              <p>{el.name}</p>
              <p>{el.species.name}</p>
              <p>
                {el.types.map((element: any, i: number) => {
                  return <p>{element.type.name}</p>;
                })}
              </p>
            </div>
          );
        })}
      </ModalContent>
    </ModalOverlay>
  );
}
