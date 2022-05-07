import {useState} from 'react'
import Profile from '../../components/profile/component'
import { STProfile } from './style'

import Divider from '@mui/material/Divider'

import MenuProfile from '../../components/menu-profile/component'
import Favs from '../../components/favs/component'
import PendingWatch from '../../components/pending-watch/component'

export default function ProfilePage(props) {
  const { user, setReloadApp, selected } = props


  console.log(selected)

  const handlerSelected = () => {
    switch (selected) {
      case "Favioritos":
        return <Favs  />;
      case "Pendientes de ver":
        return <PendingWatch />;
      default:
        return <Profile  user={user} setReloadApp={setReloadApp} />;
    }
  };


  return (
    <STProfile>
      <MenuProfile />
      <Divider className="divider" orientation="vertical" flexItem />
      {handlerSelected()}
    </STProfile>
  )
}
