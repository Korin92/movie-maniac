import { styled, alpha, InputBase } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import style from 'styled-components'

export const STnavBar = style.div`
.app-bar {
  background: #0c0735;
  color: #f6f6fe;

  .links-app{

    .css-ov3z8l-MuiMenuItem-root{
      &:visited{
        color: #f6f6fe;
      }
    }

  }

  .logo{
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
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    transition: all 0.3s ease-in-out;
    &:hover{
      background: #f6f6fe;
      color: #0c0735;
      border: 1px solid #0c0735;

    }
  }


  .user-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    backgroundColor: rgb(0 0 0 / 93%);

    .user-name{
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: 5px;

    }
  }
  
    

  .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper{
  
    color: #f6f6fe;
    background-color: rgb(0 0 0 / 93%);
    left: 18px;
  
  
  }
.MuiMenu-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
}

.MuiList-root{
  display: flex;
    justify-content: center;
    align-items: center;
  }

}



`
export const STMenu = styled(Menu)(({ theme }) =>
  ({
    display: 'flex',

    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  }))

export const STMenuItem = styled(MenuItem)(({ theme }) =>
  ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f6f6fe',
    left: '18px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  }))

export const STBox = styled(Box)(({ theme }) =>
  ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f6f6fe',
    left: '18px',
    backgroundColor: 'rgb(0 0 0 / 93%)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  }))

export const STContainer = styled(Container)(({ theme }) =>
  ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '0 20px',
    backgroundColor: 'rgb(0 0 0 / 93%)',
  }))

// export const STInputBase = styled(InputBase)(({ theme }) =>
// ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: '#f6f6fe',
//   left: '18px',
//   backgroundColor: 'rgb(0 0 0 / 93%)',
//   fontSize: '1.5rem',
//   fontWeight: 'bold',
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//   },
// }))

export const STInputBase = styled(InputBase)(({ theme }) =>
  ({
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
  }))

export const Search = styled('div')(({ theme }) =>
  ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 8,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }))

export const SearchIconWrapper = styled('div')(({ theme }) =>
  ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

export const StyledInputBase = styled(InputBase)(({ theme }) =>
  ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '18ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))
