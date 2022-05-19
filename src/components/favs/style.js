import styled from 'styled-components'

export const STCardFav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 50px;
  /* margin: 0 25px 8px 25px; */

  .card {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);
    }

    .skeleton {
      width: 160px;
      height: 250px;
    }
    .skeleton2{
      margin: 4px;
    }

    .poster {
      width: 100%;
      height: 250px;
    }

    .content-buttons {
      background-color: #f6f6fe;
      .css-i4bv87-MuiSvgIcon-root {
        font-size: 1.5rem;
        cursor: pointer;
        color: #0c0735;
        transition: all 0.3s ease;
        &:hover {
          color: #120a52ad;
        }
      }
      .more {
        font-weight: bold;
        color: #0c0735;
      }
    }
  }
`
