

//Aditional css
import { STButtonResetSendEmailValidation } from './style'

//Firebase
import { sendEmailVerification } from 'firebase/auth'

//Utils
import { Errors } from '../../utils/errors'
import { Typography } from '@mui/material'

export default function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive, setMessage, setAlert, setSeverity } = props
  const resendVerificationEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        setAlert(true)
        setSeverity('success')
        setMessage('Se ha enviado el email de confirmación')
        console.log('Email de confirmación enviado')
      })
      .catch((err) => {
        setAlert(true)
        setSeverity('error')
        console.log('error',err.code)
        Errors.handlerErrors(err.code, setMessage)
        
      })
      .finally(() => {
        setIsLoading(false)
        setUserActive(true)
      })
  }
  return (
    <STButtonResetSendEmailValidation>
      <div className="resend-verification-email">
        <Typography>
          Si no has recibido el email de verificación puedes volver a enviarlo haciendo click{' '}
          <span onClick={resendVerificationEmail}>aquí</span>
        </Typography>
      </div>
    </STButtonResetSendEmailValidation>
  )
}
