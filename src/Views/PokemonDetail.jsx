import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_A_POKEMON } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

const PokemonDetail = () => {
  /*
    1. Show a picture of the Pokemon with its moves and types
        (this information is from the API, feel free to add more information on the Pokemon if you want to)

    2. There should be a button to ​catch the Pokemon​, (​success probability is 50%​),
        if success then the user can ​give the Pokemon a nickname​ and add that Pokemon to `My Pokemon List’

    3. You can catch the same pokemon multiple times but need to give a​ different nickname​ for each pokemon
    
    */
  const back = useNavigate();
  const navigate = useNavigate();
  const { name } = useParams();

  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [pokemonNickname, setPokemonNickname] = useState("");
  const [capturePokemon, setCapturePokemon] = useState([]);

  const { loading, error, data } = useQuery(GET_A_POKEMON, {
    variables: { name: name },
  });
  // localStorage.setItem("myPokemon");
  useEffect(() => {
    if (loading) return "loading...";
    if (error) return `error... ${error}`;
    if (data) {
      setPokemonData(data.pokemon);
      setPokemonType(data.pokemon.types);
      setPokemonImage(data.pokemon.sprites.front_default);
      setPokemonMoves(data.pokemon.moves);
    }
  }, [data, error, loading]);

  const catchPokemon = () => {
    let chance = Math.floor(Math.random() * 100 + 1);
    setCapturePokemon(chance);
  };

  const storePokemon = async (
    pokemonName,
    pokemonNickname,
    pokemonImage,
    pokemonMoves,
    pokemonType
  ) => {
    if (pokemonNickname === undefined || pokemonNickname === "") {
      pokemonNickname = "Why I got no name you";
    }
    let data = [];
    data = JSON.parse(localStorage.getItem("myPokemon")) || [];
    data.push({
      name: pokemonName,
      nickname: pokemonNickname,
      image: pokemonImage,
      moves: pokemonMoves,
      type: pokemonType,
    });
    localStorage.setItem("myPokemon", JSON.stringify(data));
    navigate(`/myPokemons`);
  };

  const low_titleCase = (item) => {
    return item
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
  };

  const kebab_titleCase = (item) => {
    return item
      .split("-")
      .map((word) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  // console.log(pokemonData.sprites.front_default);
  if (loading === true) {
    return (
      <div className="container">
        <div className="py-3 d-flex">
          <h2 className="mx-auto">Detail</h2>
          <p className="me-2">
            <i className="fas fa-times" onClick={() => back(-1)}></i>
          </p>
        </div>
        <div className="container">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        className="modal fade"
        id="catchResult"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {capturePokemon >= 50 ? (
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="mt-5">
                  <h3 className="text-center">Captured!</h3>
                </div>
                <img
                  src={pokemonImage}
                  alt="Icon"
                  className="d-flex mx-auto bg-gray rounded my-3"
                  width="120"
                  height="auto"
                />
                <h2 className="py-3 text-center">
                  {low_titleCase(pokemonData.name)}
                </h2>
                <form>
                  <div>
                    <p className="text-center">Let's give a nickname</p>
                    <input
                      type="text"
                      className="form-control"
                      value={pokemonNickname}
                      onChange={(e) => setPokemonNickname(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-primary col-12"
                      data-bs-dismiss="modal"
                      onClick={() =>
                        storePokemon(
                          pokemonData.name,
                          pokemonNickname,
                          pokemonImage,
                          pokemonMoves,
                          pokemonType
                        )
                      }
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="my-5">
                  <h1 className="text-center">Sike!</h1>
                  <p className="text-center">Oh no, our prey is escaping!</p>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-primary col-12"
                    data-bs-dismiss="modal"
                  >
                    Try Again!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="py-3 d-flex">
          <h2 className="mx-auto">Detail</h2>

          <p className="me-2">
            <i className="fas fa-times" onClick={() => back(-1)}></i>
          </p>
        </div>
        <div className="container">
          <img
            src={pokemonData.id ? pokemonData.sprites.front_default : null}
            alt="Icon"
            className="d-flex mx-auto bg-gray rounded"
            width="120"
            height="auto"
          />
          {/* <h2 className="py-3 text-center">{}</h2> */}
          <h2 className="py-3 text-center">
            {/* {low_titleCase(pokemonName)} */}
            {pokemonData.id ? low_titleCase(pokemonData.name) : null}
          </h2>
          <div className="my-3">
            <p className="text-center fw-bold text-info">Type</p>
            <div className="text-center my-4">
              {pokemonType.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="bg-dark d-inline px-3 py-2 rounded-3 text-white mx-1"
                  >
                    {low_titleCase(item.type.name)}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-center fw-bold text-danger">Moves</p>
            {pokemonMoves.map((item, index) => {
              return (
                <p className="text-center" key={index}>
                  {kebab_titleCase(item.move.name)}
                </p>
              );
            })}
          </div>
        </div>
        <div className="fixed-bottom text-center pb-5">
          <button
            className="btn btn-warning col-6"
            width="100"
            onClick={() => catchPokemon()}
            data-bs-toggle="modal"
            data-bs-target="#catchResult"
          >
            Catch
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;
