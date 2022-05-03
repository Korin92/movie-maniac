import styled from 'styled-components'

export const STProfileComponent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  .container-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .title-profile {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 10px 0 30px 0;
    }
  }

  .divider {
    border-color: #f6f6fe;
  }
`
