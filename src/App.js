import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}


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
        return <div key={ability.ability.name}>{ability.ability.name}</div>
      })}
    </div>
  )
}

function App() {
  const [pokemon, setPokemon] = useState({})
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(false)

  const fetchData = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + userInput)
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setPokemon(response.data);
        } else {
          setPokemon({});
        }
      })
      .catch(() => {
        setPokemon({});
      });
  };
  

  const inputChanged = (event) => {
    setUserInput(event.target.value);
  }



  return (
    <div>
      <div>
        <input
          className="search-bar"
          placeholder="Search"
          name="search"
          value={userInput}
          onChange={inputChanged}
        />
        <button className="search-button" onClick={fetchData}>
          Search
        </button>
      </div>
      <div>
        <DisplayPokemon pokemon={pokemon} setStatus={setStatus} />
        <Modal open={status} onClose={() => setStatus(false)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {pokemon.name}
            </Typography>
            <div>
            {pokemon.types && pokemon.types[0] && pokemon.types[1] ? (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>ID:</b> {pokemon.id} <br/>
            <b>Type:</b> {pokemon.types[0].type.name}/{pokemon.types[1].type.name} <br/>
            <b>Abilities:</b> <DisplayAbilities pokemon={pokemon}/>  
          </Typography>
        ) : null}
            {pokemon.types && pokemon.types[0] && !pokemon.types[1] ? (
           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <b>ID:</b> {pokemon.id} <br/>
           <b>Type:</b> {pokemon.types[0].type.name}<br/>
           <b>Abilities:</b> <DisplayAbilities pokemon={pokemon}/>  
         </Typography>
        ) : null}
        </div>
          </Box>
        </Modal>
      </div>
    </div>
  )

}

// {pokemon.abilities[0].ability.name} tää on se pathi yhelle abilitylle
export default App;
