/* eslint-disable implicit-arrow-linebreak */
import styled from 'styled-components'

export const STDetails = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;

  .card-details {
    background-color: rgb(0 0 0 / 78%);

    .group-rating {
      border: none;
    }

    .info-rating {
      display: flex;
      color: #f6f6fe;
      align-items: center;

      .text-rating {
        margin-right: 10px;
        font-size: 1.5rem;
        text-shadow: 0 0 5px #f6f6fe, 0 0 10px #f6f6fe, 0 0 15px #f6f6fe, 0 0 20px #2814ca,
          0 0 30px #2814ca, 0 0 40px #2814ca, 0 0 55px #2814ca, 0 0 75px #2814ca;
      }
    }

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
          color: #253059e3;
        }
        filter: drop-shadow(-1px 0px 3px #f6f6fe);
      }
    }
  }

  .content {
    color: #f6f6fe;

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
    }
    @media (max-width: 860px) {
      .content-title {
        font-size: 1.5rem;
      }
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
  @media (max-width: 860px) {
    height: 500px;
    .title {
      font-size: 2rem;
    }
  }

  @media (max-width: 600px) {
    height: 450px;
    .title {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 498px) {
    height: 400px;
    .title {
      font-size: 1rem;
    }
  }

  @media (max-width: 390px) {
    height: 250px;
    .title {
      font-size: 1rem;
    }
  }
`
