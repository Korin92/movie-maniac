import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

//Firebase
import { sendEmailVerification } from 'firebase/auth'

//Utils
import { Errors } from '../../utils/errors'

export default function ButtonResetSendEmailVerification(props) {
    const { user, setIsLoading, setUserActive } = props
    const resendVerificationEmail = () => {
      sendEmailVerification(user)
        .then(() => {
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">Se ha enviado email de confirmación</Alert>
          </Stack>
        })
        .catch((err) => {
          Errors.handlerErrors(err.code)
        })
        .finally(() => {
          setIsLoading(false)
          setUserActive(true)
        })
    }
    return (
      <div className="resend-verification-email">
        <p>
          Si no has recibido el email de verificación puedes volver a enviarlo haciendo click{' '}
          <span onClick={resendVerificationEmail}>aquí</span>
        </p>
      </div>
    )
  }