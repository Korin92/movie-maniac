import styled from 'styled-components'

export const STDetails = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;

  .card-details {
    background-color: rgb(0 0 0 / 78%);

    .skeleton {
      background-color: #b7b4b4a6;
      width: 100%;
      height: 100%;

      .skeleton-img {
        width: 100%;
        height: 500px;
      }
      .skeleton-title {
        background-color: #b7b4b4a6;
        height: 50px;
      }
    }

    .container-title {
      width: 100%;
      margin-left: 3%;
      margin-bottom: 2%;
      .stars {
        font-size: 2.5rem;
        font-weight: bold;
        .css-1c99szj-MuiRating-icon {
          color: #b7b4b4a6;
          filter: drop-shadow(7px 5px 4px rgb(0 0 0 / 75%));
        }
      }
    }
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
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
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

    margin-bottom: 1.5%;
    margin-left: 3%;
    display: flex;
  }
`
