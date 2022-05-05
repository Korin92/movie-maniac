import styled from 'styled-components'

export const STProviders = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  margin: 0;
  padding: 2%;
  margin-top: 2%;

  .item{
      display: flex;
      margin: auto;
      background-color: transparent;
  }
  .container-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        margin-top: 2%;
        background-color: transparent;

  }
  .item-name{
      display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.2rem;
        font-weight: bold;
       ;

  }
  .img-providers {
    width: 100px;
    height: 100px;
    background-color: transparent;
    border-radius: 10px;

  }
`
