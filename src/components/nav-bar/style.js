import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const STnavBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  color: #f6f6fe;

  :visited{
    color: #f6f6fe;
  }


  .app-bar {
    background: #0c0735;
    color: #f6f6fe;

    .menu-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f6f6fe;

      &:visited{
        color: #f6f6fe;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      background: #0c0735;
      color: #f6f6fe;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      text-decoration: none;
      text-align: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #f6f6fe;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease-in-out;
      &:hover {
        background: #f6f6fe;
        color: #0c0735;
        border: 1px solid #0c0735;
      }
    }

    .user-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 0 20px;

      .user-name {
        font-size: 1.5rem;
        font-weight: bold;
        padding-left: 5px;
      }
    }
   
  }
  
`

export const themeLogged = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#f6f6fe',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            color: '#9c96c7',
          },
        },
      },
    },
  },
})

export const themeLogout = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#f6f6fe',
          transition: 'all 0.3s ease-in-out',
          ' :hover': {
            color: '#9c96c7',
          },
        },
      },
    },
  },
})
