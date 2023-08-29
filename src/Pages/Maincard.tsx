import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [firstEndPoint, setFirstEndPoint] = useState<any>([]);
  const [nextEndPoint, setNextEndPoint] = useState<any>([]);
  const [previousEndPoint, setPreviousEndPoint] = useState<any>("");
  const [pages, setPages] = useState<any>();
  const [actualPage, setActualPage] = useState<any>();
  const [searchPokemon, setSearchPokemon] = useState<any>();

  const pagination = (actualpoke: string, pages: number) => {
    const urlNumber = Number(actualpoke.match(/\d+/g).pop());
    setActualPage(urlNumber / 20);
    setPages(pages / 20);
  };

  const getData = async (newEndPoints: Array) => {
    axios
      .all(newEndPoints.map((endPoint: any) => axios.get(endPoint)))
      .then((res: any) => setPokemons(res));
  };

  const getEndPoints = async (firstparam) => {
    const endPoints = [firstparam];
    const paramEndPoints: any = [];

    if (endPoints) {
      endPoints[0]?.map((res: any) => {
        paramEndPoints.push(res.url);
      });
      getData(paramEndPoints);
    }
  };

  const load = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
      .then((res: any) => {
        //setLastPoke(res.data.results[0].url);
        setFirstEndPoint(res?.data?.results);
        getEndPoints(res?.data?.results);
        setNextEndPoint(res?.data?.next);
        pagination(
          res?.data?.results[res?.data?.results?.length - 1].url,
          res?.data?.count
        );
      });
  };

  const pageUp = async () => {
    await axios.get(`${nextEndPoint}`).then((res: any) => {
      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(res?.data?.results);
      setNextEndPoint(res.data.next);
      setPreviousEndPoint(res.data.previous);
      pagination(
        res?.data?.results[res?.data?.results?.length - 1].url,
        res?.data?.count
      );
    });
  };

  const pageDown = async () => {
    await axios.get(`${previousEndPoint}`).then((res: any) => {
      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(res?.data?.results);
      setNextEndPoint(res.data.next);
      setPreviousEndPoint(res.data.previous);
      pagination(
        res?.data?.results[res?.data?.results?.length - 1].url,
        res?.data?.count
      );
    });
  };

  const handleSearch = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
      .then((res: any) => {
        setPokemons([res]);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div>
        <label>Search</label>
        <input
          type="text"
          onChange={(e) => setSearchPokemon(e.target.value)}
        ></input>
        <button onClick={() => handleSearch()}>🔍</button>
      </div>
      {pokemons.length > 2 ? (
        <>
          <button
            onClick={() => pageDown()}
            disabled={actualPage <= 1 ? true : false}
          >
            Previous
          </button>
          <button
            onClick={() => pageUp()}
            disabled={actualPage >= 50 ? true : false}
          >
            Next
          </button>
          <p></p>
          <p>
            Pagina{" "}
            <strong>
              {actualPage}
              <strong> de </strong>
              50
            </strong>
          </p>
        </>
      ) : (
        <button onClick={() => load()}>X</button>
      )}
      <MainCardStyled numColumns={pokemons.length == 1 ? 1 : 4}>
        {pokemons?.map((el: any, i: number) => {
          return (
            <button>
              <PokeCard key={i}>
                <PokeImg src={el.data.sprites.front_default} />
                <p>{el.data.name}</p>
              </PokeCard>
            </button>
          );
        })}
      </MainCardStyled>
    </>
  );
}
