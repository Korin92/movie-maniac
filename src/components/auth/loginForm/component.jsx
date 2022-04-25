import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginForm(props) {
  const [close, setClose] = useState(false);
  const {open} = props;

  const handleClose = () => {
    setClose(false);
  }

  const handleClickOpen = () => {
    setClose(true);
  }

  return (
    <div>
      <Dialog onClick={handleClickOpen} open={open}>
        <DialogTitle>Inicio de sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si estás registrado en nuestra web, introduce tu email y contraseña para acceder a tu zona de usuario
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Volver</Button>
          <Button >Iniciar Sesión</Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
