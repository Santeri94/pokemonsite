import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import {DisplayPokemon, DisplayAbilities} from './DisplayComponents'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Modal style
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
          <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
            <b>ID:</b> {pokemon.id} <br/>
            <b>Type:</b> {pokemon.types[0].type.name}/{pokemon.types[1].type.name} <br/>
            <DisplayAbilities pokemon={pokemon}/>  
          </Typography>
        ) : null}
            {pokemon.types && pokemon.types[0] && !pokemon.types[1] ? (
           <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
           <b>ID:</b> {pokemon.id} <br/>
           <b>Type:</b> {pokemon.types[0].type.name}<br/>
           <DisplayAbilities pokemon={pokemon}/>  
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
