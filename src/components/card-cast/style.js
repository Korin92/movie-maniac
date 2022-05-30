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

  @media (max-width: 860px) {
    .card {
      width: 120px;
    }
    .img-actor {
      height: 160px;
    }
    .description {
      height: 70px;
      .description-name {
        font-size: 0.8rem;

      }
    }
  }
`
