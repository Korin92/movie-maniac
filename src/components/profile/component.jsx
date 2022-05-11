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

export default function Profile(props) {
  const { user, setReloadApp } = props
  const [open, setOpen] = useState(false)

  const handleUpdateAvatar = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <STProfileComponent>
      <Container className="container-profile" fixed>
        <Typography className="title-profile" variant="h2">
          {user.displayName}
        </Typography>
        <ImageAvatar src={user.photoURL} sx={{ width: '150px', height: '150px' }} />
        <Button onClick={handleUpdateAvatar}>Cambiar avatar</Button>
        {open && (
          <UploadAvatar
            user={user}
            open={open}
            setReloadApp={setReloadApp}
            handleClose={handleClose}
          />
        )}
      </Container>
    </STProfileComponent>
  )
}
