import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

import { STAvatarComponent } from './style'

export default function ImageAvatar(props) {
  const { src, sx } = props

  return (
    <STAvatarComponent>
      <Stack direction="row" spacing={2}>
        <Avatar alt="Remy Sharp" src={src} sx={sx} />
      </Stack>
    </STAvatarComponent>
  )
}
