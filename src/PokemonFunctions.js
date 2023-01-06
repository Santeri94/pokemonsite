import axios from 'axios'
import Button from '@mui/material/Button'


const PokemonFunctions = ({pokemon, setPokemon, userInput, setUserInput}) => {

    const fetchData = () => {
        if (userInput !== ''){
          axios.get('https://pokeapi.co/api/v2/pokemon/' + userInput)
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
            alert("Pokemon doesnt exist")
          })
        }
       else {
        alert("Enter Pokemon name or ID")
       }
      }
    
      const clearPokemon = () => {
        setPokemon({})
        setUserInput('')
      }

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
    setUserInput('');
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
  return (
    <div>
         <Button variant="contained" size="large" style={{position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={fetchData}>
          Search
        </Button>
        <Button variant="contained" size="large" style={{position: 'absolute', top: '60%', left: '40%', transform: 'translate(-50%, -50%)', backgroundColor: '#000000'}} onClick={clearPokemon}>
          Clear
        </Button>
         {pokemon && pokemon.sprites ? (
        <Button variant="contained" size="large" style={{position: 'absolute', top: '25%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={nextPokemon}>
          Next
        </Button>) : null }
        {pokemon && pokemon.sprites ? (
        <Button variant="contained" size="large" style={{position: 'absolute', top: '25%', left: '35%', transform: 'translate(-50%, -50%)', backgroundColor: '#e4000f'}} onClick={previousPokemon}>
          Previous
        </Button>) : null }
    </div>
  )
}

export default PokemonFunctions

