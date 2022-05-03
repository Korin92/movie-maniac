import { useState } from 'react'

//MaterialUI
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

//components
import UploadAvatar from '../../components/upload-avatar/component'
import MenuProfile from '../menu-profile/component'
import ImageAvatar from '../avatar/component'

//style
import { STProfileComponent } from './style'
import { Typography } from '@mui/material'

export default function Profile(props) {
  const { user, setReloadApp } = props
  const [open, setOpen] = useState(false)

  const handleUpdateAvatar = () => {
    setOpen(true)
  }

  return (
    <STProfileComponent>
      <MenuProfile />
      <Divider className="divider" orientation="vertical" flexItem />
      <Container className="container-profile" fixed>
        <Typography className="title-profile" variant="h2">
          {user.displayName}
        </Typography>
        <ImageAvatar src={user.photoURL} sx={{ width: '150px', height: '150px' }} />
        <Button onClick={handleUpdateAvatar}>Cambiar avatar</Button>
        {open && <UploadAvatar user={user} open={open} setReloadApp={setReloadApp} />}

        <Typography>Arrastra imagen o haz click encima para actualizar tu avatar</Typography>
      </Container>
    </STProfileComponent>
  )
}
