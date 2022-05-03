import React from 'react'

import Container from '@mui/material/Container';

//components
import Avatar from '../../components/avatar/component';
import UploadAvatar from '../../components/upload-avatar/component';

import {STProfile} from './style'

export default function Profile() {
  return (
    <STProfile>
      <Container className='container-profile' fixed>
      <h1>Profile...</h1>
      <Avatar />
      <UploadAvatar />

      </Container>
      </STProfile>
  )
}
