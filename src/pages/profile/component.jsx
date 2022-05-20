import React, { useState } from 'react'

// MaterialUI
import Divider from '@mui/material/Divider'
import Profile from '../../components/profile/component'

// Styles
import { STProfile } from './style'

// Components
import MenuProfile from '../../components/menu-profile/component'
import Favs from '../../components/favs/component'
import PendingWatch from '../../components/pending-watch/component'
import MoviesSeen from '../../components/movies-seen/compontent'
import Admin from '../../components/admin/component'

export default function ProfilePage(props) {
  const { user, setReloadApp } = props

  const [selected, setSelected] = useState(null)

  const handlerSelected = () => {
    switch (selected) {
      case 'favoritos':
        return <Favs user={user} />
      case 'pendientes de ver':
        return <PendingWatch user={user} />
      case 'vistas':
        return <MoviesSeen user={user} />
      case 'mi perfil':
        return <Profile user={user} setReloadApp={setReloadApp} />
      case 'administrar':
        return <Admin />
      default:
        return <Profile user={user} setReloadApp={setReloadApp} />
    }
  }

  return (
    <STProfile>
      <MenuProfile user={user} setSelected={setSelected} />
      <Divider className="divider" orientation="vertical" flexItem />
      {handlerSelected()}
    </STProfile>
  )
}
