import styled from 'styled-components'

export const STFooter = styled.div`
  background-color: #0c0735;
  color: #f6f6fe;
  width: 100%;
  height: 100px;
  display: grid;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  .icon {
    color: #f6f6fe;
    font-size: 1.5rem;
    margin-left: 3%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    text-decoration: none;

    transition: all 0.3s ease;
    &:hover {
      color: #00a5c7;
    }

    .container-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`
