import styled from 'styled-components'

export const STCardCast = styled.div`
  display: flex;
  justify-content: flex-start;
  .card {
    width: 200px;
  }
  .img-actor {
    width: 100%;
    height: 250px;
  }

  .description {
    height: 100px;
    .description-name {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .show-more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
  }
`
