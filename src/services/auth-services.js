/* eslint-disable no-shadow */
// Utils
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import {
  collection,
  getDoc,
  doc,
} from 'firebase/firestore'
import { validateEmail } from '../utils/validations'
import { Errors } from '../utils/errors'

// Firebase
import { db, auth } from '../utils/firebase'

const login = (
  setFormError,
  formData,
  setIsLoading,
  handleClose,
  setUser,
  setUserActive,
  setMessage,
  setAlert,
  setSeverity,
) => {
  setFormError({})
  const errors = {}
  let formOk = true

  if (!validateEmail(formData.email)) {
    errors.email = true
    formOk = false
  }

  if (formData.password.length < 6) {
    errors.password = true
    formOk = false
  }
  setFormError(errors)

  if (formOk) {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((response) => {
        setUser(response.user)
        setUserActive(response.user.emailVerified)

        if (!response.user.emailVerified) {
          setSeverity('warning')
          setAlert(true)
          setMessage('Verifica tu email para acceder')
        } else {
          handleClose()
        }
      })
      .catch((err) => {
        setSeverity('error')
        setAlert(true)
        Errors.handlerErrors(err.code, setMessage)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
}

const register = (setFormError, formData, setIsLoading, setAlert, setSeverity, setMessage) => {
  setFormError({})

  const errors = {}
  let formOk = true

  if (!validateEmail(formData.email)) {
    errors.email = true
    formOk = false
  }
  if (formData.password.length < 6) {
    errors.password = true
    formOk = false
  }
  if (!formData.username) {
    errors.username = true
    formOk = false
  }
  setFormError(errors)

  const changeUserName = (setMessage) => {
    updateProfile(auth.currentUser, {
      displayName: formData.username,
    }).catch(() => {
      setSeverity('error')
      setMessage('Error al asignar el nombre de usuario')
    })
  }

  if (formOk) {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        changeUserName()
        sendEmailVerification(auth.currentUser)
      })
      .then(() => {
        setSeverity('success')
        setMessage(
          'Se ha enviado un email de verificación. Por favor, comprueba tu bandeja de entrada',
        )
      })
      .catch((error) => {
        setSeverity('warning')
        Errors.handlerErrors(error.code, setMessage)
      })
      .catch(() => {
        setSeverity('error')
        setMessage('Ha ocurrido un error, por favor, inténtalo de nuevo')
      })
      .finally(() => {
        setAlert(true)
        setIsLoading(false)
      })
  }
}

// check if the user is admin
const isUserAdmin = async (uid) => {
  const q = collection(db, 'admins')

  const document = doc(q, uid)

  const response = await getDoc(document)

  return response.exists()
}

export const AuthServices = {
  login,
  register,
  isUserAdmin,
}
