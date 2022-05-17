import styled from 'styled-components'

export const STProfileComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  

  .container-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title-profile {
      font-size: 3.5rem;
      font-weight: bold;
      margin: 10px 0 30px 0;
    }

    .avatar-image{
      width: 100% ;
      height: 100% ;
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

  @media  (max-width: 768px) {
    .title-menu-profile {
      font-size: 2rem;
    }
    .button-profile {
      font-size: 1rem;
    }
  }
}

`
