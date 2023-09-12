import styled from "styled-components";

interface MainCardProps {
  numColumns?: number | null;
}

export const MainCardStyled = styled.div<MainCardProps>`
  display: grid;
  grid-template-columns: ${({ numColumns }) =>
    `repeat(${numColumns || 4}, 1fr)`};
  background: transparent;
  color: white;
  border-radius: 32px;
  padding: 20px;
  width: 70vw;
  height: auto;
  gap: 2%;
  align-items: center;

  @media (max-width: 475px) {
    grid-template-columns: 1fr 1fr; /* Configuração para 2 colunas em telas menores ou iguais a 475px */
  }
`;

export const PokeBtn = styled.button`

  border-radius: 12px;

  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(
    to right,
    #333333,
    #000000
  ); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 

  &:hover {
    background: linear-gradient(
      to right,
      #555555,
      #222222
    ); /* Gradiente mais escuro no hover */
  }

  @media (max-width: 475px) {
    font-size: 14px; /* Reduz a fonte em telas menores */
  }
`;

export const Paragraph = styled.p`
  font-weight: 900;
`;
