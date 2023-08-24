import styled from "styled-components";

interface MainCardProps {
  numColumns?: number;
}

export const MainCardStyled = styled.div<MainCardProps>`
  display: grid;
  grid-template-columns: ${({ numColumns }) =>
    `repeat(${numColumns || 4}, 1fr)`};
  background: grey;
  color: white;
  border-radius: 32px;
  padding: 20px;
  width: 80vw;
  height: 80vh;
  gap: 2%;
  align-items: center;
`;
