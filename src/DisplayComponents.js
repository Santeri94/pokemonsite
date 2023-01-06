

const DisplayPokemon = (props) => {
    if (!props.pokemon || !props.pokemon.sprites){
      return (
        null
      )
    }
    else
    return (
      <img alt="" src={props.pokemon.sprites.front_default} className="pokemon-img" onClick={() => props.setStatus(true)} />
    )
  }
  
  
  const DisplayAbilities = (props) => {
    return (
      <div>
        {props.pokemon.abilities.map((ability) => {
          return <div key={ability.ability.name}><b>Ability:</b> {ability.ability.name}</div>
        })}
      </div>
    )
  }

export { DisplayPokemon, DisplayAbilities }