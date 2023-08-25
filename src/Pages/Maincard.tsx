import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<Array>([]);

  const load = async () => {
    const endpoints = [];
    for (let x: number = 1; x <= 12; x++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${x}`);
    }
    axios
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
