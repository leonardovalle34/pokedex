/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Splide , SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import IMainRequest from '../../interfaces/mainInterface';

const MainCarousel: React.FC = () => {
    const [pokemons, setPokemons] = useState<any>([]);

  const [nextEndPoint, setNextEndPoint] = useState<any>([]);
  const [previousEndPoint, setPreviousEndPoint] = useState<any>("");
  

  

  const getData = async (newEndPoints: string[]) => {
    try {
      axios
        .all(newEndPoints.map((endPoint: any) => axios.get(endPoint)))
        .then((res: any) => setPokemons(res));
        console.log("teste")
    } catch (err) {
      console.log(err);
    }
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
    
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=300")
      .then((res) => {
        const response: IMainRequest = res.data;

        getEndPoints(response?.results);
        setNextEndPoint(response?.next);
        
      });
  };

  const pageUp = async () => {
   
    await axios.get(`${nextEndPoint}`).then((res) => {
      const response: IMainRequest = res.data;

      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(response?.results);
      setNextEndPoint(response.next);
      setPreviousEndPoint(response.previous);
     
    });
  };

  const pageDown = async () => {
   
    await axios.get(`${previousEndPoint}`).then((res) => {
      const response: IMainRequest = res.data;

      //setLastPoke(res?.data?.result[0].url);
      getEndPoints(response?.results);
      setNextEndPoint(response.next);
      setPreviousEndPoint(response.previous);
      
    });
  };

 

  useEffect(() => {
    load();
  }, []);


  return (
    <>
    <div style={{ width: "100vw", height: "100vh" }}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: 'fade', // ou 'slide' se preferir
          heightRatio: 0.5,
          pagination: false,
          cover: true,
          isLoop: true,
          rewind: true,
          breakpoints: {
            600: {
              heightRatio: 0.8,
            },
          },
        }}
      >
        {pokemons.map((pokemon: any, index: number) => (
          <SplideSlide key={index}>
            <div style={{ maxWidth: '100%', display: 'flex' , flexDirection: 'column', alignItems: "center" , justifyContent: "center"}}>
              <img src={pokemon.data.sprites.other.home.front_default} alt={`Pokemon ${index}`} style={{ maxWidth: '100%' }} />
              <p>{pokemon.data.name}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  </>
  )
};

export default MainCarousel;