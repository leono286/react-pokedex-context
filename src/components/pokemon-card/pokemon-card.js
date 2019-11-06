import React, { useContext, useEffect, useState } from "react";
import { usePalette } from 'react-palette'
import Card from '@material-ui/core/Card';
import PokemonsContext from "../../context/pokemon.context";
import styles from './pokemon-card.module.scss'

const renderTypes = (types) => {
  const typesName = types.map(typeItem => typeItem.type.name);
  return typesName.map((typeName, index) => <span className={styles.type} key={index}>{typeName}</span>);
}

const PokemonCard = (props) => {

  const { pokemons, setPokemons } = useContext(PokemonsContext);

  const [colorsPalette, setColorsPalette] = useState(null);

  const { data, loading, error } = usePalette(props.sprites && props.sprites.front_default);

  const currentPokemonIndex = pokemons.findIndex(pokemon => pokemon.id === props.id);

  useEffect(() => {
    if (
      currentPokemonIndex >= 0 &&
      Object.keys(data).length &&
      !pokemons[currentPokemonIndex].hasOwnProperty('colorsPalette')
    ) {
      setColorsPalette(data);
      pokemons[currentPokemonIndex]['colorsPalette'] = data;
      setPokemons(pokemons);
    }
  }, [data]);

  useEffect(() => {
    if (pokemons[currentPokemonIndex] && pokemons[currentPokemonIndex].hasOwnProperty('colorsPalette')) {
      setColorsPalette(pokemons[currentPokemonIndex].colorsPalette)
    }
  }, [])

  const renderCard = () => {
    if (colorsPalette) {
      return (
        <Card square={true} className={styles.pokemonCard} style={{ backgroundColor: colorsPalette.lightVibrant }
        }>
          <div className={styles.imageWraper}>
            <img src={props.sprites && props.sprites.front_default} alt="front" />
          </div>
          <div className={styles.pokemonData} style={{ backgroundColor: colorsPalette.darkMuted }}>
            <h2 className={styles.pokemonName} >{props.name}</h2>
            <div className={styles.typesWrapper}>
              {props.types && renderTypes(props.types)}
            </div>
          </div>
        </Card>
      )
    } else {
      return 'loading...'
    }
  }


  return (
    renderCard()
  );
}

export default PokemonCard;