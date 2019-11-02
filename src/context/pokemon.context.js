import React from 'react';

const PokemonsContext = React.createContext({
  pokemons: [],
  setPokemons: () => { }
});

export default PokemonsContext;