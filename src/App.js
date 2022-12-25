import React, { useState } from 'react'
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
      <p className="search-message">Please search for pokemon</p>
    )
  }
  else
  return (
    <img src={props.pokemon.sprites.front_default} className="pokemon-img" onClick={() => props.setStatus(true)} />
  )
}


function App() {
  const [pokemon, setPokemon] = useState({})
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(false)

  const fetchData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + userInput,{method:'GET'})
    .then(response => response.json())
    .then((resData) => {
      if (resData){
        console.log(resData);
        setPokemon(resData)
      }
      else {
        setPokemon({})
      }
    })
    .catch(() => {
      setPokemon({});
    });
  }
  

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
            {pokemon.types && pokemon.types[0] ? (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {pokemon.types[0].type.name}
          </Typography>
        ) : null}
            {pokemon.types && pokemon.types[1] ? (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {pokemon.types[1].type.name}
          </Typography>
        ) : null}
        </div>
          </Box>
        </Modal>
      </div>
    </div>
  )

}

export default App;
