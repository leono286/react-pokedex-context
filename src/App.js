import React, {useState} from 'react';
import './App.scss';

import PokemonList from "./components/pokemon-list/pokemon-list";

import PokemonContext from "./context/pokemon.context";

function App() {

  const [pokemons, setPokemons] = useState([]);

  const context = {
    pokemons,
    setPokemons
  }

  return (
    <PokemonContext.Provider value={context}>
      <PokemonList />
    </PokemonContext.Provider>
  )
}

export default App;
