import styled from 'styled-components'

export const STDetails = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;

  .card-details {
    background-color: rgb(0 0 0 / 78%);
  }

  .content {
    color: #f6f6fe;
    text-align: justify;

    .content-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1%;
      margin-left: 2%;
      margin-top: 2%;
    }

    .trailer {
      height: 750px;
      width: 100%;
      border: none;
      border-radius: 10px;

      @media (max-width: 450px) {
        height: 200px;
      }
      /* @media (max-width: 450px) {
        height: 300px;
      } */
    }
  }
`

export const STPoster = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 700px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: 10%;

  .title {
    color: #f6f6fe;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2%;
    margin-left: 3%;
    display: flex;
  }
`
