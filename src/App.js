import React, { useState } from 'react'
import './App.css'
import {DisplayPokemon} from './DisplayComponents'
import PokemonFunctions from './PokemonFunctions'
import PokemonDetails from './PokemonDetails'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

function App() {
  const [pokemon, setPokemon] = useState({})
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(false)

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
      </div>
      <div>
        <DisplayPokemon pokemon={pokemon} setStatus={setStatus} />
        <PokemonFunctions pokemon={pokemon} setPokemon={setPokemon} userInput={userInput} setUserInput={setUserInput} />
        <PokemonDetails pokemon={pokemon} setStatus={setStatus} status={status} />
      </div>
    </div>
  )

}

export default App;
