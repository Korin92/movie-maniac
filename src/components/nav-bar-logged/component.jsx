/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// MaterialUI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CardMedia from '@mui/material/CardMedia'
import { ThemeProvider } from '@mui/material/styles'

// Firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase'

// Styles
import {
  STnavBar, themeLogged, themeContainer, themeMenuRight, themeMenuTopLeft,
} from '../nav-bar/style'

// Components
import ImageAvatar from '../avatar/component'
import SearchBar from '../search/component'

// Images
import defaultAvatar from '../../assets/png/user.png'
import LOGOTIPO from '../../assets/png/LOGOTIPO.png'

export default function NavBarLogged(props) {
  // props
  const { user, search } = props

  const navigate = useNavigate()

  // States
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  // Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    navigate('/')
    signOut(auth)
  }

  const reloadApp = () => {
    navigate('/')
    window.location.reload()
  }

  return (
    <STnavBar>
      <AppBar className="app-bar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuItem
              onClick={() => {
                reloadApp()
              }}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
              aria-label="logo"
            >
              <CardMedia
                className="logo"
                component="img"
                alt="logo of website"
                image={LOGOTIPO}
              />
            </MenuItem>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                theme={themeMenuRight}
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                MenuListProps={{
                  disablePadding: true,
                }}
              >
                <Container theme={themeContainer}>
                  <ThemeProvider theme={themeLogged}>
                    <MenuItem as={Link} to="/" aria-label="home">
                      <Typography textAlign="center">Inicio</Typography>
                    </MenuItem>
                    <MenuItem as={Link} to="/now-playing-movies">
                      <Typography textAlign="center">Cartelera</Typography>
                    </MenuItem>
                    <MenuItem as={Link} to="/top-rated">
                      <Typography textAlign="center">Mejor valoradas</Typography>
                    </MenuItem>
                  </ThemeProvider>
                </Container>
              </Menu>
            </Box>
            <MenuItem
              as={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
              aria-label="home"
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <ThemeProvider theme={themeLogged}>
                <MenuItem as={Link} to="/now-playing-movies">
                  <Typography textAlign="center">Cartelera</Typography>
                </MenuItem>
                <MenuItem as={Link} to="/top-rated">
                  <Typography textAlign="center">Mejor valoradas</Typography>
                </MenuItem>
              </ThemeProvider>
            </Box>

            <SearchBar search={search} />
            <Box sx={{
              flexGrow: 0,
            }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                  <ImageAvatar src={user.photoURL ? user.photoURL : defaultAvatar} />
                </IconButton>
              </Tooltip>
              <Menu
                theme={themeMenuTopLeft}
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                MenuListProps={{
                  disablePadding: true,
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Container theme={themeContainer}>
                  <ThemeProvider theme={themeLogged}>
                    <MenuItem
                      as={Link}
                      to="/profile"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Mi Perfil</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                    >
                      <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItem>
                  </ThemeProvider>
                </Container>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </STnavBar>
  )
}
