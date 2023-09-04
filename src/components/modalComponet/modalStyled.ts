import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
 
`;

export const ModalContent = styled.div`
  background-color: grey;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 50%;
  height: 80%;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  font-weight: bold;
  top: 30px;
  right: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: red;

  &:hover {
    color: #ff0000;
  }
`;
