import React, { useState } from 'react'

// MaterialUI
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

// components
import { Typography } from '@mui/material'
import UploadAvatar from '../upload-avatar/component'
import ImageAvatar from '../avatar/component'

// style
import { STProfileComponent } from './style'
import ChangePasswordForm from '../change-password-form/component'

export default function Profile(props) {
  const { user, setReloadApp } = props
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [openUploadAvatar, setOpenUploadAvatar] = useState(false)
  const handleUpdateAvatar = () => {
    setOpenUploadAvatar(true)
  }

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false)
  }

  const handleCloseUploadAvatar = () => {
    setOpenUploadAvatar(false)
  }

  const handleChangePassword = () => {
    setOpenChangePassword(true)
  }

  return (
    <STProfileComponent>
      <Container className="container-profile" fixed>
        <Typography className="title-profile" variant="h2">
          {user.displayName}
        </Typography>
        <ImageAvatar className="avatar-image" src={user.photoURL} sx={{ width: '80%', height: '80%' }} />
      </Container>
      <Container className="container-menu-profile">
        <Typography className="title-menu-profile" variant="h4">Ajustes de perfil</Typography>
        <Button className="button-profile" onClick={handleUpdateAvatar}>Cambiar avatar</Button>
        {openUploadAvatar && (
          <UploadAvatar
            user={user}
            openUploadAvatar={openUploadAvatar}
            setReloadApp={setReloadApp}
            handleCloseUploadAvatar={handleCloseUploadAvatar}
          />
        )}
        <Button className="button-profile" onClick={handleChangePassword}>Cambiar contraseña</Button>
        {openChangePassword && (
          <ChangePasswordForm
            user={user}
            openChangePassword={openChangePassword}
            handleCloseChangePassword={handleCloseChangePassword}
          />
        )}
      </Container>
    </STProfileComponent>
  )
}
