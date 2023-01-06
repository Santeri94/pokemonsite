import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import {DisplayPokemon, DisplayAbilities} from './DisplayComponents'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'


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

  const nextPokemon = () => {
    const newId = pokemon.id + 1
    setUserInput(newId);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${newId}`)
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setPokemon(response.data)
        } else {
          setPokemon({})
        }
      })
      .catch(() => {
        setPokemon({})
      })
  }

  const previousPokemon = () => {
    const newId = pokemon.id + -1
    setUserInput(newId);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${newId}`)
      .then(response => {
        if (response.data) {
          console.log(response.data)
          setPokemon(response.data)
        } else {
          setPokemon({})
        }
      })
      .catch(() => {
        setPokemon({})
      })
  }


  

  const inputChanged = (event) => {
    setUserInput(event.target.value)
  }



  return (
    <div>
      <div>
      <AppBar style={{ background:'#e4000f' }}>
        <Toolbar>
          <Typography variant="h5">
            Pokemon application
          </Typography>
        </Toolbar>
      </AppBar> 
        <input
          className="search-bar"
          placeholder="Search Pokemon"
          name="search"
          value={userInput}
          onChange={inputChanged}
        />
        <Button variant="contained" size="large" style={{position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={fetchData}>
          Search
        </Button>
      </div>
      <div>
        <DisplayPokemon pokemon={pokemon} setStatus={setStatus} />
        {pokemon && pokemon.sprites ? (
        <Button variant="contained" size="large" style={{position: 'absolute', top: '25%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={nextPokemon}>
          Next
        </Button>) : null }
        {pokemon && pokemon.sprites ? (
        <Button variant="contained" size="large" style={{position: 'absolute', top: '25%', left: '35%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={previousPokemon}>
          Previous
        </Button>) : null }
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

export default App;
