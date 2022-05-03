import { useState, useCallback } from 'react'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { auth } from '../../utils/firebase'
import { updateProfile } from '@firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useDropzone } from 'react-dropzone'

import AlertMessage from '../alert/component'

import { STUploadAvatar } from './style'

import defaultAvatar from '../../assets/png/user.png'

export default function UploadAvatar(props) {
  const { user, setReloadApp, open } = props
  const [avatarUrl, setAvatarUrl] = useState()

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
      })
      .catch((err) => {
        <AlertMessage severity="error" message={'Error al actualizar el avatar'} />
        console.log(err)
      })
  }
  return (
    <STUploadAvatar {...getRootProps()}>
      <Dialog open={open}>
      <DialogTitle>Cambio de avatar</DialogTitle>
      <DialogContent>
      <input {...getInputProps()} />
      <AddPhotoAlternateIcon className='avatar' />
      </DialogContent>
      </Dialog>
    </STUploadAvatar>
  )
}
