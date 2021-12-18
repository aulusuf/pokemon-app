import { Routes, Route } from "react-router-dom";
import PokemonList from "./Views/PokemonList";
import PokemonDetail from "./Views/PokemonDetail";
import MyPokemonList from "./Views/MyPokemonList";
import MyPokemonDetail from "./Views/MyPokemonDetail";

function App() {
  /*
  You can use ​Rest-API​ from ​https://pokeapi.co/​ as your data source. But using
  GraphQL​ https://github.com/mazipan/graphql-pokeapi is a big plus
  */
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/myPokemons" element={<MyPokemonList />} />
        <Route path="/:name" exact element={<PokemonDetail />} />
        <Route
          path="/myPokemon/:nickname"
          exact
          element={<MyPokemonDetail />}
        />
      </Routes>
    </div>
  );
}

export default App;
