/* eslint-disable no-nested-ternary */
import React from 'react'

// Components
import NavBarLogout from '../nav-bar-logout/component'
import NavBarLogged from '../nav-bar-logged/component'

export default function NavBar(props) {
  // Props
  const { user, search } = props

  return (
    user ? <NavBarLogged user={user} search={search} />
      : <NavBarLogout user={user} search={search} />
  )
}
