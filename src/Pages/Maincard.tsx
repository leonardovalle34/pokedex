import { MainCardStyled } from "../components/mainCardStyled";
import { PokeCard, PokeImg } from "../components/pokeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainCard() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [firstEndPoint, setFirstEndPoint] = useState<any>([]);
  const [nextEndPoint, setNextEndPoint] = useState<any>([]);
  const [previousEndPoint, setPreviousEndPoint] = useState<any>("");
  const [totalPages, setTotalPages] = useState<any>();
  const [lastPoke, setLastPoke] = useState<any>();
  const [pages, setPages] = useState<any>();
  const [actualPage, setActualPage] = useState<any>();

  const pagination = () => {
    console.log(lastPoke);
    if (totalPages > 0) {
      setPages(totalPages / 20);
      setActualPage(lastPoke / 20);
    }
  };

  const getData = async (newEndPoints: Array) => {
    setLastPoke(
      Number(newEndPoints?.data?.result[res?.data?.result.length - 1])
    );
    axios
      .all(newEndPoints.map((endPoint: any) => axios.get(endPoint)))
      .then((res: any) => setPokemons(res));

    /*axios.get(`${endPoint?.data?.next}`).then((res) => {
      setEndPoint(res);
    });*/
    pagination();
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
        setTotalPages(res?.data?.count);
        setLastPoke(res?.data?.results[res?.data?.results?.length - 1].url);
      });
  };

  const pageUp = async () => {
    await axios.get(`${nextEndPoint}`).then((res: any) => {
      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(res?.data?.results);
      setNextEndPoint(res.data.next);
      setPreviousEndPoint(res.data.previous);
      setTotalPages(res?.data?.count);
      setLastPoke(res?.data?.results[res?.data?.results?.length - 1].url);
    });
  };

  const pageDown = async () => {
    await axios.get(`${previousEndPoint}`).then((res: any) => {
      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(res?.data?.results);
      setNextEndPoint(res.data.next);
      setPreviousEndPoint(res.data.previous);
      setTotalPages(res?.data?.count);
      setLastPoke(res?.data?.results[res?.data?.results?.length - 1].url);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <button onClick={() => pageDown()}>Previous</button>
      <button onClick={() => pageUp()}>Next</button>
      <p>
        Pagina{" "}
        <strong>
          {actualPage}
          <strong> de </strong>
          {pages}
        </strong>
      </p>
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
