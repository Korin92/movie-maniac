import styled from 'styled-components'

export const STCardContent = styled.div`
.description {
    height: 160px;
    background-color: #f6f6fe;

    .text-description {
      //Searched for this class in stackoverflow
      // https://es.stackoverflow.com/questions/511584/ocultar-la-mitad-del-texto-y-mostrar-puntos-suspensivos-al-final-si-un-p%C3%A1rrafo

      display: -webkit-box;
      height: 100px;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
    }
  }

`