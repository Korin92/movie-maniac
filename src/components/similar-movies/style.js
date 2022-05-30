import styled from 'styled-components'
import { createTheme } from '@mui/material/styles'

export const STSimilarMovies = styled.div`
  width: 90%;
  margin: 0 auto;

  .css-1t74jcg-MuiGrid-root {
    margin-top: 4%;
  }

  .css-13i4rnv-MuiGrid-root {
    margin: 0 23px;
  }

  .react-multi-carousel-list {
    position: initial;
  }
  .react-multi-carousel-track {
    padding: revert;
  }

  .container {
    width: 100%;
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

    .description {
      height: 50px;

      .css-h93ljk-MuiTypography-root {
        margin: 0;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.334;
        letter-spacing: 0em;
        margin-bottom: 0.35em;
      }

      .text-description {
        display: -webkit-box;
        height: 24px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5;
      }
    }

    @media screen and (max-width: 890px) {
      margin-top: 8px;
      .poster {
        width: 100%;
        height: 200px;
      }
      .description {
        height: 30px;

        .css-h93ljk-MuiTypography-root {
          font-size: 0.8rem;
        }

        .text-description {
          font-size: 0.8rem;
        }
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
