import styled from 'styled-components'

export const STMenuProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 20px 0 0 10px;

  .box-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    border: none;

    .bottom-navigation {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: 0;
      margin-right: 30px;
      border-radius: 0;
      box-shadow: none;
      border: none;
      padding: 0;
      background-color: transparent;

      span {
        color: #f6f6fe;
      }
    }

    .css-cveggr-MuiListItemIcon-root {
      min-width: 30px;
    }

    .css-cvhtoe-MuiButtonBase-root-MuiListItemButton-root.Mui-selected {
      background-color: rgb(0 0 0 / 4%);
    }

    .icon-menu-profile {
      width: 2em;
      height: 3em;
      margin: 0;
      padding: 0;

      @media screen and (max-width: 600px) {
        width: 1.5em;
        height: 2em;
      }

      @media screen and (max-width: 468px) {
        width: 1em;
        height: 1.5em;
      }
    }
  }
`
