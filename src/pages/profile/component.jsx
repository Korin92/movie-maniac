import React, { useState } from 'react'

// MaterialUI
import Divider from '@mui/material/Divider'
import Profile from '../../components/profile/component'
import Footer from '../../components/footer/component'

// Components
import MenuProfile from '../../components/menu-profile/component'
import Favs from '../../components/favs/component'
import PendingWatch from '../../components/pending-watch/component'
import MoviesSeen from '../../components/movies-seen/compontent'
import Admin from '../../components/admin/component'
import SearchPage from '../search/component'

// Styles
import { STProfile } from './style'

export default function ProfilePage(props) {
  // Props
  const { user, setReloadApp, searchText } = props

  // States
  const [selected, setSelected] = useState(null)

  // Function for change selected
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

  // Constants
  const menuSelected = handlerSelected()

  return (
    searchText.searchInput !== '' ? (
      <SearchPage user={user} />
    ) : (
      <>
        <STProfile>
          <MenuProfile user={user} setSelected={setSelected} />
          <Divider className="divider" orientation="vertical" flexItem />
          {menuSelected}
        </STProfile>
        <footer>
          <Footer />
        </footer>

      </>

    )
  )
}
