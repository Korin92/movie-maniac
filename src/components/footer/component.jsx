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
              <InstagramIcon className="icon" />
              <Typography className="text">@ClaquetaFilm</Typography>
            </Grid>
            <Grid className="container-grid" item xs={4}>
              <FacebookIcon className="icon" />
              <Typography className="text">ClaquetaFilm</Typography>
            </Grid>
            <Grid className="container-grid" item xs={4}>
              <TwitterIcon className="icon" />
              <Typography className="text">@ClaquetaFilm</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </STFooter>
  )
}
