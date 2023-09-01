import styled from "styled-components";

interface MainCardProps {
  width?: number;
}

export const PokeCard = styled.div<MainCardProps>`
  padding: 10px;
  width: ${({ width }) => (width || 80) + "%"};
  margin: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  border: solid 1px;
  border-radius: 8px;
  box-shaddow: 10px, 10px, 10px, black;
  max-height: 75%;
  flex-direction: column;
  align-items: center;
`;
export const PokeImg = styled.img`
  width: 70%;
  height: 30%;
  border-radius: 16px;
`;