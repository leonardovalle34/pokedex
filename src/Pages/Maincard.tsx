/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainCardStyled, PokeBtn } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import Loading from "../components/loadingComponent/Loading";
import { Modal } from "../components/modalComponet/Modal";
import axios from "axios";
import IMainRequest from "../interfaces/mainInterface";
import { Header } from "../components/haederComponent/headerStyled";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<any>([]);

  const [nextEndPoint, setNextEndPoint] = useState<any>([]);
  const [previousEndPoint, setPreviousEndPoint] = useState<any>("");
  const [pages, setPages] = useState<any>();
  const [actualPage, setActualPage] = useState<any>();
  const [searchPokemon, setSearchPokemon] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pokeParam, setPokeParam] = useState<any>([]);

  const pagination = (actualpoke: string) => {
    const matchResult = actualpoke.match(/\d+/g);
    if (matchResult !== null) {
      const urlNumber = Number(matchResult.pop());
      setActualPage(urlNumber / 8);
      setPages(pages / 8);
    } else {
      console.log("erro na paginaçao");
    }
  };

  const getData = async (newEndPoints: string[]) => {
    try {
      axios
        .all(newEndPoints.map((endPoint: any) => axios.get(endPoint)))
        .then((res: any) => setPokemons(res));
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const getEndPoints = async (firstparam: any) => {
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
    setLoading(true);
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=8")
      .then((res) => {
        const response: IMainRequest = res.data;

        getEndPoints(response?.results);
        setNextEndPoint(response?.next);
        pagination(response?.results[response?.results?.length - 1].url);
      });
  };

  const pageUp = async () => {
    setLoading(true);
    await axios.get(`${nextEndPoint}`).then((res) => {
      const response: IMainRequest = res.data;

      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(response?.results);
      setNextEndPoint(response.next);
      setPreviousEndPoint(response.previous);
      pagination(response?.results[response?.results?.length - 1].url);
    });
  };

  const pageDown = async () => {
    setLoading(true);
    await axios.get(`${previousEndPoint}`).then((res) => {
      const response: IMainRequest = res.data;

      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(response?.results);
      setNextEndPoint(response.next);
      setPreviousEndPoint(response.previous);
      pagination(response?.results[response?.results?.length - 1].url);
    });
  };

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
      .then((res) => {
        const response: IMainRequest = res.data;
        setPokemons([response]);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Header>
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
              disabled={actualPage >= 100 ? true : false}
            >
              Next
            </button>
            <p></p>
            <p>
              Pagina{" "}
              <strong>
                {actualPage}
                <strong> de </strong>
                100
              </strong>
            </p>
          </>
        ) : (
          <button onClick={() => load()}>X</button>
        )}
      </Header>

      <MainCardStyled numColumns={pokemons.length === 1 ? 1 : 4}>
        {loading === true ? (
          <Loading />
        ) : (
          <>
            {isOpen === true ? (
              <Modal onClose={closeModal} pokeParams={pokeParam} />
            ) : (
              <>
                {pokemons?.map((el: any, i: number) => {
                  return (
                    <PokeBtn
                      onClick={() => {
                        setPokeParam(el.data);
                        setIsOpen(true);
                      }}
                    >
                      <PokeCard key={i}>
                        <PokeImg src={el.data.sprites.front_default} />
                        <p>{el.data.name}</p>
                      </PokeCard>
                    </PokeBtn>
                  );
                })}
              </>
            )}
          </>
        )}
      </MainCardStyled>
    </>
  );
}
