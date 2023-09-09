import styled, { keyframes } from "styled-components";

export const LoadingContainer = styled.div``;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  animation: ${spin} 1s linear infinite;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;

  /* Centraliza o spinner no meio da tela */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
