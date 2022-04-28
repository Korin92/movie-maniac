import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const handlerErrors =(code) => {
    switch (code) {
      case 'auth/wrong-password':
        ;<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">El usuario o la contraseña son incorrectos</Alert>
        </Stack>

        break
      case 'auth/too-many-requests':
        ;<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">
            Has enviado demasiadas solicitudes de reenvío de email de confirmación en muy poco
            tiempo
          </Alert>
        </Stack>
        break
      case 'auth/user-not-found':
        ;<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">El usuario o la contraseña son incorrectos</Alert>
        </Stack>

        break

      default:
        break
    }
  }

  export const Errors = {
    handlerErrors
  }