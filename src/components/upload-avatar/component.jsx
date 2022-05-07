import { useState, useCallback } from 'react'

import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import Loader from '../loader/component'

import { auth } from '../../utils/firebase'
import { updateProfile } from '@firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useDropzone } from 'react-dropzone'

import AlertMessage from '../alert/component'

import { STDialogContent, STAddPhotoAlternateIcon, STTypography, STDialogActions } from './style'

export default function UploadAvatar(props) {
  const { user, setReloadApp, open, handleClose } = props
  const [avatarUrl, setAvatarUrl] = useState()
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setAvatarUrl(URL.createObjectURL(file))
    uploadImage(file).then(() => {
      updateUserAvatar()
    })
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    noKeyboard: true,
    onDrop,
  })

  const uploadImage = (file) => {
    setLoading(true)
    const storage = getStorage()
    const spaceRef = ref(storage, `avatar/${user.uid}`)
    return uploadBytes(spaceRef, file)
  }
  const updateUserAvatar = () => {
    const storage = getStorage()
    getDownloadURL(ref(storage, `avatar/${user.uid}`))
      .then(async (response) => {
        await updateProfile(auth.currentUser, { photoURL: response })
        setReloadApp((prevState) => !prevState)
        handleClose()
      })
      .catch((err) => {
        <AlertMessage severity="error" message={'Error al actualizar el avatar'} />
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Dialog open={open}>
      <STDialogContent {...getRootProps()}>
        <STAddPhotoAlternateIcon />
        <Container {...getInputProps()} />
        <STTypography>Arrastra imagen o haz click encima para actualizar tu avatar</STTypography>
      </STDialogContent>
      <STDialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose}>Cerrar</Button>
      </STDialogActions>
      {loading && <Loader open={open} />}
    </Dialog>
  )
}
