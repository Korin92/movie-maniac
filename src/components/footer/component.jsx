import React from 'react'
import Grid from '@mui/material/Grid'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { STFooter } from './style'

export default function Footer() {
  return (
    <STFooter>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid className="container-grid" item xs={4}>
              <a className="icon" href="https://www.instagram.com/claquetafilmucam/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="icon" />
                <Typography className="text">@ClaquetaFilm</Typography>
              </a>
            </Grid>
            <Grid className="container-grid" item xs={4}>
              <a className="icon" href="https://www.facebook.com/profile.php?id=100081726879599" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="icon" />
                <Typography className="text">ClaquetaFilm</Typography>
              </a>
            </Grid>
            <Grid className="container-grid" item xs={4}>
              <a className="icon" href="https://twitter.com/claquetaFilm" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="icon" />
                <Typography className="text">@ClaquetaFilm</Typography>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </STFooter>
  )
}
