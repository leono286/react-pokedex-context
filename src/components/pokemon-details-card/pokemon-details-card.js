import React from "react";
import Card from '@material-ui/core/Card';
import styles from './pokemon-details-card.scss';

const PokemonDetailsCard = (props) => {

  return (
    <Card
      square={true}
      elevation={5}
      className={styles.detailsCard}
      style={
        {
          backgroundColor: props.colorsPalette ? props.colorsPalette.lightVibrant : 'transparent'
        }
      }
    >
      <div className={styles.imageWraper}>
        <img src={props.sprites && props.sprites.front_default} alt="front" />
        <img src={props.sprites && props.sprites.back_default} alt="back" />
      </div>
      <div
        className={styles.pokemonData}
        style={
          {
            backgroundColor: props.colorsPalette ? props.colorsPalette.darkMuted : 'transparent'
          }
        }
      >
        <h2 className={styles.pokemonName} >{props.name}</h2>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsItemBox}>
            <strong>Height: </strong> <span>{props.height}</span>
          </div>
          <div className={styles.detailsItemBox}>
            <strong>Weight: </strong> <span>{props.weight}</span>
          </div>
          <div className={styles.detailsItemBox}>
            <strong>Stats: </strong>
            <ul className={styles.stats}>
              {
                props.stats &&
                props.stats.map(
                  statObject => <li><span>{statObject.stat.name}</span> <span className={styles.dots}></span> <span>{statObject.base_stat}</span></li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PokemonDetailsCard;