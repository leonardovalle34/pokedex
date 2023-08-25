import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<Array>([]);

  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sapo_2.jpg/220px-Sapo_2.jpg";

  const load = async () => {
    const endpoints = [];
    for (let x: number = 1; x <= 10; x++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${x}`);
    }
    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  console.log(pokemons);

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <MainCardStyled>
        {pokemons?.map((el: any, i: number) => {
          return (
            <PokeCard key={i}>
              <PokeImg src={el.data.sprites.front_default} />
              <p>{el.data.name}</p>
            </PokeCard>
          );
        })}
      </MainCardStyled>
    </>
  );
}
