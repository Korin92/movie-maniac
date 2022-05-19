import styled from 'styled-components'

export const STProfileComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .container-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:0;

    .title-profile {
      font-size: 3.5rem;
      font-weight: bold;
      margin: 10px 0 30px 0;

      @media screen and (max-width: 600px) {
        font-size: 2.5rem;
      }

      @media screen and (max-width: 468px) {
        font-size: 2rem;
      }
    }

    .css-e53awj-MuiStack-root{
      display: flex;
      justify-content: center;
      width: 40vh;
      height: 40vh;
    }

    .image-avatar{
      display: flex;
      justify-content: center;
      width: 40vh;
      height: 40vh;

    }
  }

  .container-menu-profile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
    .title-menu-profile {
      font-size: 2.5rem;
      font-weight: bold;
    }
    .button-profile {
      font-size: 1.5rem;
      font-weight: bold;
      color: #f6f6fe;
      transition: all 0.3s ease;

      &.active {
        color: #f6f6fe;
      }
      &:hover {
        color: #120a52ad;
      }
    }

    @media (max-width: 768px) {
      .title-menu-profile {
        font-size: 2rem;
      }
      .button-profile {
        font-size: 1rem;
      }
    }

    @media screen and (max-width: 600px) {
      .title-profile {
        font-size: 2.5rem;
      }

      .title-menu-profile {
        font-size: 1.5rem;
      }

      .button-profile {
        font-size: 1rem;
      }
    }

    @media screen and (max-width: 468px) {
      .title-profile {
        font-size: 2rem;
      }
      .title-menu-profile {
        font-size: 1rem;
      }
      .button-profile {
        font-size: 0.7rem;
      }

    }
  }
`
