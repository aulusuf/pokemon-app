import React from "react";

const ModalMyPokemonData = ({ nickname, image, name }) => {
  return (
    <div
      className="modal fade"
      id="myPokemon"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="my-3">
              <h1 className="text-center">
                Remove {nickname}({name}) ?
              </h1>
            </div>
            <div
              //   to={`/${list.name}`}
              className="text-decoration-none"
              //   key={props.index}
              data-bs-toggle="modal"
              data-bs-target="#myPokemon"
            >
              <div className="px-3 pb-1 m-3">
                <img
                  src={image}
                  alt="Icon"
                  className="col-4 flex bg-gray rounded mx-auto d-block"
                  width="50"
                  height="auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMyPokemonData;
