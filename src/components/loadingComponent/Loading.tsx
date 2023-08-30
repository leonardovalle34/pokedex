import { LoadingContainer, LoadingSpinner } from "./loadingStyled";
export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner></LoadingSpinner>
      <p>Loading...</p>
    </LoadingContainer>
  );
}
