import styled from 'styled-components'

export const STDetailsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 60px;
  background-color: transparent;

  // RESPONSIVE
  //========================================================================= //

  // Móviles en horizontal o tablets en vertical
  //------------------------------------------------------------------------- //
  @media (min-width: 768px) {
    margin-top: 60px;
  }
  @media (max-width: 600px) {
    margin-top: 54px;
  }

  // Tablets en horizonal y escritorios normales
  //------------------------------------------------------------------------- //
  @media (min-width: 1024px) {
    margin-top: 63px;
  }

  // Escritorios muy anchos
  //------------------------------------------------------------------------- //
  @media (min-width: 1200px) {
    margin-top: 61px;
  }
`
