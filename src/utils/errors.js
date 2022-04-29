const handlerErrors = (code, setMessage) => {
  switch (code) {
    case 'auth/wrong-password':
      setMessage('El usuario o la contraseña son incorrectos')
      break
    case 'auth/too-many-requests':
      setMessage(
        'Has enviado demasiadas solicitudes de reenvío de email de confirmación en muy poco tiempo'
      )
      break
    case 'auth/user-not-found':
      setMessage('El usuario o la contraseña son incorrectos')
      break
    case 'auth/email-already-in-use':
      setMessage('El email ya está en uso')
      break

    default:
      break
  }
}

export const Errors = {
  handlerErrors,
}
