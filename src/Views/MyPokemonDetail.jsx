import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MyPokemonDetail = () => {
  // console.log(parsingLocalStorage);
  const navigate = useNavigate();
  const back = useNavigate();

  const { nickname } = useParams();
  const parsingLocalStorage = JSON.parse(localStorage.getItem("myPokemon"));
  // console.log(nickname);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);
  // const [pokemonList, setPokemonList] = useState(parsingLocalStorage);

  const showData = () => {
    if (parsingLocalStorage === null) {
      return null;
    } else {
      let showTheData = parsingLocalStorage.filter(
        (item) => item.nickname === nickname
      );
      showTheData.map((list) => {
        return [
          setPokemonData(list),
          setPokemonType(list.type),
          setPokemonMoves(list.moves),
        ];
      });
    }
  };

  const releasePokemons = (e) => {
    e.preventDefault();
    let pokemonIndex = parsingLocalStorage.findIndex(
      (element) => element.nickname === nickname
    );
    parsingLocalStorage.splice(pokemonIndex, 1);
    localStorage.setItem("myPokemon", JSON.stringify(parsingLocalStorage));
    navigate("/myPokemons");
  };

  useEffect(() => {
    showData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const low_titleCase = (item) => {
    return item
      ?.toLowerCase()
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

  return (
    <>
      <div className="modal fade" id="releasePokemon" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="my-5">
                <h3 className="text-center">
                  Are you sure want to release this Pokemon?
                </h3>
              </div>
              <div>
                <h1 className="fw-bold my-3 text-center">
                  {low_titleCase(nickname)}
                </h1>

                <img
                  src={pokemonData.image}
                  alt="Icon"
                  className="d-flex mx-auto bg-gray rounded"
                  width="120"
                  height="auto"
                />
                <p className="text-center">{low_titleCase(pokemonData.name)}</p>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-danger col-12"
                  onClick={(e) => releasePokemons(e)}
                  data-bs-dismiss="modal"
                >
                  Release
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="py-3 d-flex">
          <h2 className="mx-auto">Detail</h2>

          <p className="me-2">
            <i className="fas fa-times" onClick={() => back(-1)}></i>
          </p>
        </div>
        <div className="container">
          <p className="text-center">{low_titleCase(pokemonData.name)}</p>
          <img
            src={pokemonData.image}
            alt="Icon"
            className="d-flex mx-auto bg-gray rounded"
            width="120"
            height="auto"
          />

          <h1 className="fw-bold pt-3 text-center">
            {low_titleCase(nickname)}
          </h1>

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
            className="btn btn-danger col-6"
            width="100"
            data-bs-toggle="modal"
            data-bs-target="#releasePokemon"
          >
            Release
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPokemonDetail;
