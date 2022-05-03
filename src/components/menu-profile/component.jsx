import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { STMenuProfile } from './style'

export default function MenuProfile() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <>
      <STMenuProfile>
        <Box className="box-menu" sx={{ width: '100%', maxWidth: 360 }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <FavoriteIcon className="icon-menu-profile" />
              </ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <RemoveRedEyeIcon className="icon-menu-profile" />
              </ListItemIcon>
              <ListItemText primary="Pendientes de ver" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <VisibilityOffIcon className="icon-menu-profile" />
              </ListItemIcon>
              <ListItemText primary="Vistas" />
            </ListItemButton>
          </List>
        </Box>
        
      </STMenuProfile>
   
     
     

      
    </>
  )
}
