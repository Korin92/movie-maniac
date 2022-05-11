import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { AuthServices } from '../../services/auth-services'

import { STMenuProfile } from './style'

export default function MenuProfile(props) {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [userAdmin, setUserAdmin] = useState(false)
  const { user, setSelected } = props

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    AuthServices.isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response)
    })
  }, [user])

  return (
    <STMenuProfile>
      <Box className="box-menu" sx={{ width: '100%', maxWidth: 360 }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleListItemClick(event, 0)
              setSelected('favoritos')
            }}
          >
            <ListItemIcon>
              <FavoriteIcon className="icon-menu-profile" />
            </ListItemIcon>
            <ListItemText primary="Favoritos" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              handleListItemClick(event, 1)
              setSelected('pendientes de ver')
            }}
          >
            <ListItemIcon>
              <VisibilityOffIcon className="icon-menu-profile" />
            </ListItemIcon>
            <ListItemText primary="Pendientes de ver" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => {
              handleListItemClick(event, 2)
              setSelected('vistas')
            }}
          >
            <ListItemIcon>
              <RemoveRedEyeIcon className="icon-menu-profile" />
            </ListItemIcon>
            <ListItemText primary="Vistas" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => {
              handleListItemClick(event, 3)
              setSelected('mi perfil')
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon className="icon-menu-profile" />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItemButton>
          {userAdmin && (
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                setSelected('administrar')
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon className="icon-menu-profile" />
              </ListItemIcon>
              <ListItemText primary="Administrar" />
            </ListItemButton>
          )}
        </List>
      </Box>
    </STMenuProfile>
  )
}
