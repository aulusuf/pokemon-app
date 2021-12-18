import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../GraphQL/Queries";
// import ModalMyPokemonData from "../Components/ModalMyPokemonData";

const MyPokemonList = () => {
  /*
    1.  Should show a list (like Pokemon List page, but with
        each of their nicknames as well) of all ​Pokemons you have caugh
    
    2.  It should also be possible to ​remove/release​ a Pokemon from the list on this page.
        The pokemons in this list ​persist​ even after a full page reload.
    */
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const [ownedPokemon, setOwnedPokemon] = useState([]);

  const titleCase = (item) => {
    return item
      .toLowerCase()
      .replace(/\b(\w)/g, (string) => string.toUpperCase());
  };
  useEffect(() => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (data) {
      setPokemonList(data.pokemons.results);
    }

    const parsingLocalStorage = JSON.parse(localStorage.getItem("myPokemon"));
    if (parsingLocalStorage.length < 1) {
      setOwnedPokemon(0);
    } else {
      setOwnedPokemon(parsingLocalStorage.reverse());
    }
  }, [loading, error, data, pokemonList]);

  if (loading === true) {
    return (
      <div className="container">
        <div className="py-3 d-flex">
          <h2 className="mx-auto">My Pokemons</h2>
        </div>
        <div className="container">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container pb-5">
        <div className="mt-3 text-center">
          <h1>My Pokemons</h1>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 col-sm-12 flex mx-auto">
            {ownedPokemon === 0 ? (
              <p className="text-center">Catch Some!</p>
            ) : (
              ownedPokemon.map((list, index) => {
                return (
                  <Link
                    to={`/myPokemon/${list.nickname}`}
                    className="text-decoration-none"
                    key={index}
                    // onClick={() => setPokemonData(list)}
                    // data-bs-toggle="modal"
                    // data-bs-target="#myPokemon"
                  >
                    <div className="bg-white rounded-3 shadow-sm px-3 pt-3 pb-1 m-3">
                      <p className="col text-center fw-bold fs-5 mt-3 text-black">
                        {list.nickname === undefined
                          ? "I am no name :("
                          : titleCase(list.nickname)
                          ? list.nickname
                          : null}
                      </p>
                      <img
                        src={list.image}
                        alt="Icon"
                        className="col-4 flex bg-gray rounded mx-auto d-block"
                        width="50"
                        height="auto"
                      />
                      <p className="col text-center mt-3 text-black">
                        {titleCase(list.name)}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="fixed-bottom bg-light text-center pb-5 pt-3">
          <p>Let's Catch New Pokemon!</p>
          <button
            className="btn btn-warning col-6"
            width="100"
            onClick={() => navigate("/")}
          >
            Catch
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPokemonList;
