import styled from 'styled-components'
import { createTheme } from '@mui/material/styles'

export const STSimilarMovies = styled.div`
  width: 90%;
  margin: 0 auto;

  .react-multi-carousel-list {
    position: initial;
  }
  .react-multi-carousel-track {
    padding: revert;
  }

  .container {
    width: 100%;
    margin: 0;
  }
  .dotList {
    margin: 0;
  }

  .card {
    width: 65%;
    height: 65%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);
    }

    .content-buttons {
      display: flex;
      justify-content: space-around;
      background-color: #f6f6fe;
      .css-i4bv87-MuiSvgIcon-root {
        font-size: 1.5rem;
        cursor: pointer;
        color: #0c0735;
        transition: all 0.3s ease;
        &:hover {
          color: #120a52ad;
        }
      }
      .more {
        font-weight: bold;
      }
    }

    .skeleton {
      width: 450px;
      height: 342px;
    }

    .poster {
      width: 100%;
      height: 342px;
    }

    @media screen and (max-width: 890px) {
      margin-top: 8px;
      .poster {
        width: 100%;
        height: 200px;
      }

      .content-buttons {
        button {
          svg {
            font-size: 0.7rem;
          }
        }

        .more {
          font-size: 0.7rem;
        }
      }
    }
  }
`

export const themeMenuItem = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#0c0735',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            color: '#1976d2',
          },
        },
      },
    },
  },
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0c0735',
    },
    fav: {
      main: '#ff0000',
    },
    disabled: {
      main: '#1976d2',
    },
  },
})

export const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
  desktopSmall: {
    breakpoint: {
      max: 1600,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },

  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
}
