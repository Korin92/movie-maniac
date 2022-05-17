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
  const [open, setOpen] = useState(false)

  const handleUpdateAvatar = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangePassword = () => {
    setOpen(true)
  }

  return (
    <STProfileComponent>
      <Container className="container-profile" fixed>
        <Typography className="title-profile" variant="h2">
          {user.displayName}
        </Typography>
        <ImageAvatar className="avatar-image" src={user.photoURL} sx={{ width: '100%', height: '100%' }} />
      </Container>
      <Container className="container-menu-profile">
        <Typography className="title-menu-profile" variant="h4">Ajustes de perfil</Typography>
        <Button className="button-profile" onClick={handleUpdateAvatar}>Cambiar avatar</Button>
        {open && (
          <UploadAvatar
            user={user}
            open={open}
            setReloadApp={setReloadApp}
            handleClose={handleClose}
          />
        )}
        <Button className="button-profile" onClick={handleChangePassword}>Cambiar contraseña</Button>
        {open && (
          <ChangePasswordForm user={user} open={open} handleClose={handleClose} />
        )}
      </Container>
    </STProfileComponent>
  )
}
