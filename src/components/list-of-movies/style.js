import styled from 'styled-components'

export const STCardMovies = styled.div`
  margin-top: 7%;

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f6f6fe;
    margin-bottom: 2%;
    margin-left: 3%;
  }

  .description {
    height: 200px;

    .text-description {
      //Searched for this class in stackoverflow
      // https://es.stackoverflow.com/questions/511584/ocultar-la-mitad-del-texto-y-mostrar-puntos-suspensivos-al-final-si-un-p%C3%A1rrafo

      display: -webkit-box;
      height: 145px;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
  }

  .poster {
    height: 500px;
  }

  @media (max-width: 950px) {
    margin-top: 9%;
  }

  @media (max-width: 750px) {
    margin-top: 15%;
  }
`
