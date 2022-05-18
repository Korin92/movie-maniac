import styled from 'styled-components'

export const STFooter = styled.div`
  background-color: #0c0735;
  color: #f6f6fe;
  width: 100%;
  height: 100px;
  display: grid;
  align-items: center;
  justify-content: space-around;

  .icon{
    color: #f6f6fe;
    font-size: 1.5rem;
    margin-left: 3%;
    width: 60px;
    height: 60px;
    cursor: pointer;

    transition: all 0.3s ease;
    &:hover{
      color: #120a52ad;
  }

  .container-grid{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}



`
