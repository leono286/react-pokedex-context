import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Card from '@material-ui/core/Card';

import PokemonsContext from "../../context/pokemon.context";
import PokemonCard from '../pokemon-card/pokemon-card';

import styles from './pokemon-list.module.scss'

const PokemonList = () => {

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=';

  let [apiCallsCounter, setapiCallsCounter] = useState(0);

  const { pokemons, setPokemons } = useContext(PokemonsContext);

  const [pokemonsToShow, setPokemonsToShow] = useState([]);

  const [filterText, setFilterText] = useState('');

  const [currentPokemon, setcurrentPokemon] = useState({});

  const [open, setOpen] = useState(false);



  const getPokemonDetail = async (pokemonUrl) => {
    try {
      const result = await axios.get(pokemonUrl)
      return result.data;
    } catch (e) {
      return { error: e.response };
    }
  }

  const handleScroll = (event) => {
    const bottomMargin = event.srcElement.documentElement.offsetHeight - 90;
    console.log(window.pageYOffset + window.innerHeight >= bottomMargin);
    if (window.pageYOffset + window.innerHeight >= bottomMargin) {
      const calls = apiCallsCounter + 1;
      setapiCallsCounter(calls);
      console.log(apiCallsCounter);
    }
  }

  const filterPokemons = (e) => {
    const value = e.target.value;
    setFilterText(value);
    if (value !== '') {
      const pokemonsFiltered = pokemons.filter(pokemon => {
        if (pokemon.types) {
          const pokemonTypesString = pokemon.types.map(typeItem => typeItem.type.name).join(',');
          return pokemon.name.toLowerCase().includes(value.toLowerCase()) || pokemonTypesString.includes(value.toLowerCase())
        } else {
          return false
        }
      });
      setPokemonsToShow(pokemonsFiltered);
    } else {
      setPokemonsToShow(pokemons)
    }
  }

  const renderTypes = (types) => {
    const typesName = types.map(typeItem => typeItem.type.name);
    return typesName.map(typeName => <span className={styles.type}>{typeName}</span>);
  }

  const getPokemonsChunk = async (offset) => {
    const url = `${apiUrl}${apiCallsCounter * 50}`;
    const result = await axios.get(url);
    let pokemonsList = result.data.results;
    const pokemonsDetail = await Promise.all(
      pokemonsList.map(pokemon => getPokemonDetail(pokemon.url))
    );
    pokemonsList = pokemonsList.map((pokemon, index) => {
      return { ...pokemon, ...pokemonsDetail[index] }
    });
    setPokemons([...pokemons, ...pokemonsList]);
    setPokemonsToShow(pokemons);
  };


  useEffect(
    () => {
      console.log('epaaaaa');
      console.log(apiCallsCounter);
      console.log('epaaaaa');
      getPokemonsChunk(apiCallsCounter);
    }, [apiCallsCounter]
  );

  useEffect(
    () => {
      getPokemonsChunk(0);
      window.addEventListener('scroll', (e) => { handleScroll(e) });
    }, []
  );

  useEffect(() => {
    setPokemonsToShow(pokemons)
  }, [pokemons]);

  const handleOpen = (pokemon) => {
    setcurrentPokemon(pokemon);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setcurrentPokemon({});
  }


  return (
    <>
      <Input
        placeholder="Placeholder"
        inputProps={{
          'aria-label': 'description',
        }}
        value={filterText}
        onChange={(e) => filterPokemons(e)}
      />
      <div className={styles.pokemonsWrapper}>
        {pokemonsToShow && pokemonsToShow.map(pokemon => (
          <div className={styles.pokemonCardBox} onClick={() => { handleOpen(pokemon) }}>
            <PokemonCard {...pokemon} key={pokemon.id} />
          </div>
        ))}
      </div>

      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: styles.whiteBackdrop,
          }
        }}
      >
        <Fade in={open}>
          <div>
            <Card
              square={true}
              elevation={5}
              className={styles.detailsCard}
              style={
                {
                  backgroundColor: currentPokemon.colorsPalette ? currentPokemon.colorsPalette.lightVibrant : 'transparent'
                }}
            >
              <div className={styles.imageWraper}>
                <img src={currentPokemon.sprites && currentPokemon.sprites.front_default} alt="front" />
                <img src={currentPokemon.sprites && currentPokemon.sprites.back_default} alt="back" />
              </div>
              <div
                className={styles.pokemonData}
                style={
                  {
                    backgroundColor: currentPokemon.colorsPalette ? currentPokemon.colorsPalette.darkMuted : 'transparent'
                  }
                }
              >
                <h2 className={styles.pokemonName} >{currentPokemon.name}</h2>
                <div className={styles.typesWrapper}>
                  {currentPokemon.types && renderTypes(currentPokemon.types)}
                </div>
                <div className={styles.detailsWrapper}>
                  <div className={styles.detailsItemBox}>
                    <strong>Height: </strong> <span>{currentPokemon.height}</span>
                  </div>
                  <div className={styles.detailsItemBox}>
                    <strong>Weight: </strong> <span>{currentPokemon.weight}</span>
                  </div>
                  <div className={styles.detailsItemBox}>
                    <strong>Stats: </strong>
                    <ul className={styles.stats}>
                      {
                        currentPokemon.stats &&
                        currentPokemon.stats.map(
                          statObject => <li><span>{statObject.stat.name}</span> <span className={styles.dots}></span> <span>{statObject.base_stat}</span></li>
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Fade>
      </Modal>
    </>
  )
};

export default PokemonList
