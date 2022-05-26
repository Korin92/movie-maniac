/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react'

import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import { updateProfile } from '@firebase/auth'

import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage'

import { useDropzone } from 'react-dropzone'
import { auth } from '../../utils/firebase'
import Loader from '../loader/component'

import AlertMessage from '../alert/component'

import {
  STDialogContent, STAddPhotoAlternateIcon, STTypography, STDialogActions, STButton,
} from './style'

export default function UploadAvatar(props) {
  const {
    user, setReloadApp, openUploadAvatar, handleCloseUploadAvatar,
  } = props
  const [, setAvatarUrl] = useState()
  const [loading, setLoading] = useState(false)

  const updateUserAvatar = () => {
    const storage = getStorage()
    getDownloadURL(ref(storage, `avatar/${user.uid}`))
      .then(async (response) => {
        await updateProfile(auth.currentUser, { photoURL: response })
        setReloadApp((prevState) =>
          !prevState)
        handleCloseUploadAvatar()
      })
      .catch(() => {
        <AlertMessage severity="error" message="Error al actualizar el avatar" />
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const uploadImage = (file) => {
    setLoading(true)
    const storage = getStorage()
    const spaceRef = ref(storage, `avatar/${user.uid}`)
    return uploadBytes(spaceRef, file)
  }

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

  return (
    <Dialog open={openUploadAvatar}>
      <STDialogContent {...getRootProps()} id="mui-2">
        <STAddPhotoAlternateIcon />
        <input {...getInputProps()} alt="input for upload avatar" aria-label="input for upload avatar" />
        <STTypography>Arrastra imagen o haz click encima para actualizar tu avatar</STTypography>
      </STDialogContent>
      <STDialogActions sx={{ justifyContent: 'center' }}>
        <STButton onClick={handleCloseUploadAvatar}>Cerrar</STButton>
      </STDialogActions>
      {loading && <Loader open={openUploadAvatar} />}
    </Dialog>
  )
}
