/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import { signOut } from 'firebase/auth'
import {
  STnavBar, themeLogged,
} from '../nav-bar/style'

import { auth } from '../../utils/firebase'

import LoginForm from '../auth/login-form/component'
import RegisterForm from '../auth/register-form/component'
import ImageAvatar from '../avatar/component'

import defaultAvatar from '../../assets/png/user.png'
import SearchBar from '../search/component'

import LOGOTIPO from '../../assets/png/LOGOTIPO.png'

export default function NavBarLogged(props) {
  const { user, search } = props
  // States
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const [textContent, setTextContent] = useState('')
  const [open, setOpen] = useState(false)

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

  const handleUserMenu = (event) => {
    setTextContent(event.currentTarget.textContent)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    signOut(auth)
  }
  return (
    <STnavBar>
      <AppBar className="app-bar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuItem
              as={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
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
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                MenuListProps={{
                  disablePadding: true,
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Container sx={{
                  backgroundColor: '#0c0735',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}
                >
                  <ThemeProvider theme={themeLogged}>
                    <MenuItem
                      as={Link}
                      to="/"
                      className="menuItem"
                    >
                      <Typography textAlign="center">Inicio</Typography>
                    </MenuItem>
                    <MenuItem className="menuItem" as={Link} to="/now-playing-movies">
                      <Typography textAlign="center">Cartelera</Typography>
                    </MenuItem>

                    <MenuItem className="menuItem" as={Link} to="/top-rated">
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
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <MenuItem as={Link} to="/now-playing-movies" sx={{ my: 2, color: 'white', display: 'block' }}>
                <Typography textAlign="center">Cartelera</Typography>
              </MenuItem>
              <MenuItem as={Link} to="/top-rated" sx={{ my: 2, color: 'white', display: 'block' }}>
                <Typography textAlign="center">Mejor valoradas</Typography>
              </MenuItem>
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
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                MenuListProps={{
                  disablePadding: true,
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <Container sx={{
                  backgroundColor: '#0c0735',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}
                >
                  <ThemeProvider theme={themeLogged}>
                    <MenuItem
                      as={Link}
                      to="/profile"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Mi Perfil</Typography>
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/"
                      onClick={handleLogout}
                    >
                      <Typography textAlign="center">Cerrar sesión</Typography>
                    </MenuItem>
                  </ThemeProvider>
                </Container>

              </Menu>

              {textContent ? (
                textContent === 'Inicia sesión' ? (
                  <LoginForm open={open} handleClose={handleClose} />
                ) : (
                  <RegisterForm open={open} handleClose={handleClose} />
                )
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </STnavBar>
  )
}
