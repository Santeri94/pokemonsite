import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DisplayAbilities} from './DisplayComponents'

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

const PokemonDetails = ({ pokemon, status, setStatus }) => {
    return (
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
    )
}

export default PokemonDetails