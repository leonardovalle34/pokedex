import styled from "styled-components";

interface MainCardProps {
  width?: number;
}

export const PokeCard = styled.div<MainCardProps>`
  padding: 10px;

  display: flex;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  box-shaddow: 10px, 10px, 10px, black;
  max-height: 75%;
  flex-direction: column;
  align-items: center;
`;
export const PokeImg = styled.img`
  width: auto;
  height: auto;
  border-radius: 16px;
`;
