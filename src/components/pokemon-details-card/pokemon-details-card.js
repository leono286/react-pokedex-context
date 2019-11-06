import React from "react";
import Card from '@material-ui/core/Card';
// import styles from './pokemon-details-card.scss';

const renderTypes = (types) => {
  const typesName = types.map(typeItem => typeItem.type.name);
  return typesName.map(typeName => <span className='type'>{typeName}</span>);
}

const PokemonDetailsCard = (props) => {

  return (
    <Card
      square={true}
      elevation={5}
      className="detailsCard"
      style={
        {
          backgroundColor: props.colorsPalette ? props.colorsPalette.lightVibrant : 'transparent'
        }}
    >
      <div className="imageWraper">
        <img src={props.sprites && props.sprites.front_default} alt="front" />
        {props.sprites && props.sprites.back_default ? <img src={props.sprites && props.sprites.back_default} alt="back" /> : null}
      </div>
      <div
        className="pokemonData"
        style={
          {
            backgroundColor: props.colorsPalette ? props.colorsPalette.darkMuted : 'transparent'
          }
        }
      >
        <h2 className="pokemonName" >{props.name}</h2>
        <div className="typesWrapper">
          {props.types && renderTypes(props.types)}
        </div>
        <div className="detailsWrapper">
          <div className="detailsItemBox">
            <strong>Height: </strong> <span>{props.height}</span>
          </div>
          <div className="detailsItemBox">
            <strong>Weight: </strong> <span>{props.weight}</span>
          </div>
          <div className="detailsItemBox">
            <strong>Stats: </strong>
            <ul className="stats">
              {
                props.stats &&
                props.stats.map(
                  statObject => <li><span>{statObject.stat.name}</span> <span className="dots"></span> <span>{statObject.base_stat}</span></li>
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