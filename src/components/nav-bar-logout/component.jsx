/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// MaterialUI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import CardMedia from '@mui/material/CardMedia'
import { ThemeProvider } from '@mui/material/styles'

// Styles
import {
  STnavBar, themeLogout, themeContainer, themeMenuLeft,
} from '../nav-bar/style'

// Components
import LoginForm from '../auth/login-form/component'
import RegisterForm from '../auth/register-form/component'
import SearchBar from '../search/component'

// Images
import LOGOTIPO from '../../assets/png/LOGOTIPO.png'

export default function NavBarLogout(props) {
  // props
  const { search } = props
  // States
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [textContent, setTextContent] = useState('')
  const [open, setOpen] = useState(false)

  // Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleUserMenu = (event) => {
    setTextContent(event.currentTarget.textContent)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <STnavBar>
      <AppBar className="app-bar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuItem as={Link} to="/">
              <CardMedia
                className="logo"
                component="img"
                alt="logo of website"
                image={LOGOTIPO}
              />
            </MenuItem>

            <Box sx={{
              flexGrow: 1, display: { xs: 'flex', md: 'none' },
            }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                theme={themeMenuLeft}
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                MenuListProps={{
                  disablePadding: true,
                }}
              >
                <Container theme={themeContainer}>
                  <ThemeProvider theme={themeLogout}>
                    <MenuItem
                      as={Link}
                      to="/now-playing-movies"
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">Cartelera</Typography>
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      to="/top-rated"
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">Mejor valoradas</Typography>
                    </MenuItem>
                    <Container>
                      <MenuItem
                        onClick={handleUserMenu}
                      >
                        <Typography textAlign="center">Inicia sesión</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={handleUserMenu}
                      >
                        <Typography textAlign="center">Regístrate</Typography>
                      </MenuItem>
                    </Container>
                  </ThemeProvider>
                </Container>
              </Menu>
            </Box>

            <Box className="links-app" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <ThemeProvider theme={themeLogout}>
                <MenuItem as={Link} to="/now-playing-movies">
                  <Typography textAlign="center">Cartelera</Typography>
                </MenuItem>

                <MenuItem as={Link} to="/top-rated">
                  <Typography textAlign="center">Mejor valoradas</Typography>
                </MenuItem>
              </ThemeProvider>
            </Box>

            <SearchBar search={search} />

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>

              <ThemeProvider theme={themeLogout}>
                <MenuItem onClick={handleUserMenu}>
                  <span>Inicia sesión</span>
                </MenuItem>
                <MenuItem onClick={handleUserMenu}>
                  <span>Regístrate</span>
                </MenuItem>
              </ThemeProvider>

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
