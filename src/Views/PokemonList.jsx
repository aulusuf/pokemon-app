import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../GraphQL/Queries";

const Pokemonlist = () => {
  /*
    1.  Show a list of Pokemons’ names and the ​owned total 
    2.  When a Pokemon is clicked, it should go to that Pokemon Detail page
    */
  const [pokemonList, setPokemonList] = useState([]);
  const { loading, error, data } = useQuery(GET_POKEMONS);

  useEffect(() => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (data) {
      setPokemonList(data.pokemons.results);
    }
  }, [loading, error, data, pokemonList]);

  const owned = (pokemon) => {
    let ownedList = JSON.parse(localStorage.getItem("myPokemon"));
    if (ownedList === null) {
      return 0;
    } else {
      let data = ownedList.map((list) => {
        return list.name;
      });
      return data.filter((x) => x === pokemon).length;
    }
  };

  const titleCase = (item) => {
    return item
      .toLowerCase()
      .replace(/\b(\w)/g, (string) => string.toUpperCase());
  };
  if (loading === true) {
    return (
      <div className="container">
        <div className="mt-3 text-center">
          <h1>Pokemon List</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="mt-3 text-center">
          <h1>Pokemon List</h1>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 col-sm-12 flex mx-auto">
            {pokemonList.map((list, index) => {
              return (
                <Link
                  to={`/${list.name}`}
                  className="text-decoration-none"
                  key={index}
                >
                  <div className="bg-white rounded-3 shadow-sm px-3 pt-3 pb-1 m-3">
                    <img
                      src={list.image}
                      alt="Icon"
                      className="col-4 flex bg-gray rounded mx-auto d-block"
                      width="50"
                      height="auto"
                    />
                    <p className="col text-center fw-bold fs-5 mt-3 text-black">
                      {titleCase(list.name)}
                    </p>
                    <p className="fst-italic text-center text-gray">
                      Owned: {owned(list.name) === null ? 0 : owned(list.name)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          className="fixed-bottom text-center pb-5 pt-3 bg-light"
          to="/myPokemons"
        >
          <button
            className="btn btn-primary col-6"
            width="100"
            // onClick={() => catchPokemon()}
          >
            My Owned Pokemon
          </button>
        </Link>
      </div>
    );
  }
};

export default Pokemonlist;
