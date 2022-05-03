import React from 'react'
import Profile from '../../components/profile/component'
import { STProfile } from './style'

export default function ProfilePage(props) {

  const {user, setReloadApp} = props
  return (
    <STProfile>
    <Profile user={user} setReloadApp={setReloadApp} />
    </STProfile>
  )
}
