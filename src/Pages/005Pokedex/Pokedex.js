import React, { useState, useEffect } from "react";
import "./Pokedex.css";

export default function Pokedex() {
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
  };
  const [pokemon, setPokemon] = useState([]);
  const [sortedPokemon, setSortedPokemon] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState([]);

  const getPokemonByGen = async (gen) => {
    setPokemon([]);
    setSortedPokemon([]);
    setPokemonInfo([]);
    const url = `https://pokeapi.co/api/v2/generation/${gen}/`;
    const res = await fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error(error.message));
  };

  function getID(URLstring) {
    return URLstring.slice(-5).replace(/\D/g, "");
  }

  useEffect(() => {
    if (pokemon.length < 1) return;
    const fetchData = async () => {
      pokemon.pokemon_species.forEach((p) => {
        const data = fetch(
          `https://pokeapi.co/api/v2/pokemon/${getID(p.url)}/`
        ).then((response) =>
          response
            .json()
            .then((data) =>
              setPokemonInfo((pokemonInfo) => [...pokemonInfo, data])
            )
        );
      });
    };
    fetchData();
  }, [pokemon]);

  useEffect(() => {
    if (pokemonInfo.length < 1) return;
    let sorted = pokemonInfo.sort((a, b) => a.order - b.order);
    setSortedPokemon(sorted);
  }, [pokemonInfo]);

  useEffect(() => {
    if (sortedPokemon.length < 90) return;
    console.log(sortedPokemon);
  }, [sortedPokemon]);

  return (
    <div className="poke-main-container">
      <div className="button-container">
        <button className="gen-button" onClick={() => getPokemonByGen(1)}>
          Generate Gen 1
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(2)}>
          Generate Gen 2
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(3)}>
          Generate Gen 3
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(4)}>
          Generate Gen 4
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(5)}>
          Generate Gen 5
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(6)}>
          Generate Gen 6
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(7)}>
          Generate Gen 7
        </button>
        <button className="gen-button" onClick={() => getPokemonByGen(8)}>
          Generate Gen 8
        </button>
      </div>
      <div className="poke-display-container">
        {sortedPokemon.map((pokemon, index) => (
          <div className="poke-display" key={index}>
            <h2>{pokemon.name}</h2>
            <p>{pokemon.habitat?.name}</p>
            <img src={pokemon.sprites.front_default} />
            <p className="poke-id">ID: #{pokemon.id}</p>
            <h4>Types</h4>
            {pokemon.types.map((type, index) => (
              <div className="type-display">
                <li>{type.type.name}</li>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
