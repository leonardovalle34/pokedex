/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Splide , SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import IMainRequest from '../../interfaces/mainInterface';
import Loading from '../loadingComponent/Loading';
import { Paragraph } from '../mainCardStyled';

const MainCarousel: React.FC = () => {
    const [pokemons, setPokemons] = useState<any>([]);
    const [loading , setLoading] = useState<boolean>(false)

  

  

  const getData = async (newEndPoints: string[]) => {
    try {
      axios
        .all(newEndPoints.map((endPoint: any) => axios.get(endPoint)))
        .then((res: any) => setPokemons(res));
        setLoading(false)
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
    setLoading(true)
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=400&offset=0")
      .then((res) => {
        const response: IMainRequest = res.data;

        getEndPoints(response?.results);
        
        
      });
  };

  

 

  useEffect(() => {
    load();
  }, []);


  return (
    <>
    {
      loading === true ? 
        <Loading></Loading>
      :
      <div style={{ width: "100vw", height: "100vh" , display: "flex" , alignContent: "center" , flexDirection: "column",justifyContent: "center"}}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: 'flip', // ou 'slide' se preferir
          heightRatio: 0.0,
          pagination: false,
          cover: true,
          isLoop: true,
          rewind: true,
          arrows: false,
          breakpoints: {
            600: {
              heightRatio: 0.0,
            },
          },
        }}
      >
        {pokemons.map((pokemon: any, index: number) => (
          <SplideSlide key={index}>
            <div style={{ maxWidth: '100%', display: 'flex' , flexDirection: 'column', alignItems: "center" , justifyContent: "center"}}>
              <img src={pokemon.data.sprites.other.home.front_default} alt={`Pokemon ${index}`} style={{ maxWidth: '100%' }} />
              <Paragraph>Nome: {pokemon.data.name.substring(0,1).toUpperCase() + pokemon.data.name.substring(1,100).toLowerCase() }</Paragraph>
              <Paragraph>Espécie: {pokemon.data.species.name}</Paragraph>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
    }
  </>
  )
};

export default MainCarousel;