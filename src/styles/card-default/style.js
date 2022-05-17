import styled from 'styled-components'

export const STCard = styled.div`
  margin-top: 7%;

.css-12n0uxm-MuiGrid-root > .MuiGrid-item {
  padding-top: 16px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #f6f6fe;
  margin-bottom: 2%;
  margin-left: 3%;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);
  }

  .content-buttons {
    display: flex;
    justify-content: space-around;
    background-color: #f6f6fe;
    .css-i4bv87-MuiSvgIcon-root {
      font-size: 1.5rem;
      cursor: pointer;

      transition: all 0.3s ease;
      &:hover {
        color: #120a52ad;
      }

      .colorPrimary{
      color: #0c0735 !important;
    }

    .colorCliked{
      color: #fb0f03 !important;
    }
    }
    .more {
      font-weight: bold;
    }

   
  }

  .skeleton {
    width: 450px;
    height: 500px;
  }

  .skeleton-animation {
    height: 160px;
  }
}

@media (max-width: 950px) {
  margin-top: 9%;
}

@media (max-width: 750px) {
  margin-top: 15%;
}
.progress{
    display: flex; 
    justify-content: center;
    align-items: flex-end;
    margin: 30px;
    

}
`
