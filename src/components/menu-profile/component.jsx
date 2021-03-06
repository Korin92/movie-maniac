import React, { useState, useEffect } from 'react'

// Material UI
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

// Services
import { AuthServices } from '../../services/auth-services'

// Styles
import { STMenuProfile } from './style'

export default function MenuProfile(props) {
  // States
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [userAdmin, setUserAdmin] = useState(false)
  const [value, setValue] = useState(3)

  // Props
  const { user, setSelected } = props

  // Handlers
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  // Useffect for get user admin
  useEffect(() => {
    AuthServices.isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response)
    })
  }, [user])

  return (
    <STMenuProfile>
      <Box className="box-menu" sx={{ width: '100%', maxWidth: 360 }}>
        <BottomNavigation
          className="bottom-navigation"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleListItemClick(event, 0)
              setSelected('favoritos')
            }}
            label="Favoritos"
            icon={<FavoriteIcon className="icon-menu-profile" />}
          />
          <BottomNavigationAction
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1)
              setSelected('pendientes de ver')
            }}
            label="Pendientes"
            icon={<VisibilityOffIcon className="icon-menu-profile" />}
          />
          <BottomNavigationAction
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2)
              setSelected('vistas')
            }}
            label="Vistas"
            icon={<RemoveRedEyeIcon className="icon-menu-profile" />}
          />
          <BottomNavigationAction
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3)
              setSelected('mi perfil')
            }}
            label="Perfil"
            icon={<AccountCircleIcon className="icon-menu-profile" />}
          />
          {userAdmin ? (
            <BottomNavigationAction
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4)
                setSelected('administrar')
              }}
              label="Administrar"
              icon={<AdminPanelSettingsIcon className="icon-menu-profile" />}
            />
          ) : null}
        </BottomNavigation>
      </Box>
    </STMenuProfile>
  )
}
