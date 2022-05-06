import styled from 'styled-components'

export const STSimilarMovies = styled.div`
  width: 90%;
  margin: 0 auto;

  .css-1t74jcg-MuiGrid-root {
    margin-top: 4%;
  }

  .css-13i4rnv-MuiGrid-root{
    margin:0 23px;
  }

  .container {
    width: 100%;
  }
  .dotList{
    margin: 0;
  }

  .card {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);
    }

    .poster {
      width: 100%;
      height: 342px;
    }

    .description {
      height: 67px;

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
  }
`
