import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";

export default function MainCard() {
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sapo_2.jpg/220px-Sapo_2.jpg";
  return (
    <MainCardStyled numColumns={4}>
      <PokeCard width={100}>
        <PokeImg src={img} />
      </PokeCard>
    </MainCardStyled>
  );
}
