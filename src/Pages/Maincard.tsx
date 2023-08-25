import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<any>([]);

  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sapo_2.jpg/220px-Sapo_2.jpg";

  const load = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => {
        setPokemons([response.data]);
      });
  };

  console.log(pokemons);

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <MainCardStyled>
        {pokemons[0]?.results?.map((el: any, i: number) => {
          return (
            <PokeCard>
              <PokeImg src={img} />
              <p>{el.name}</p>
              <p>{el.url}</p>
            </PokeCard>
          );
        })}
      </MainCardStyled>
    </>
  );
}
