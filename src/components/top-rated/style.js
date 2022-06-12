import styled from 'styled-components'

export const STNotFilm = styled.div`
  .not-film {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    > a {
      text-align: center;
      text-decoration: none;
      color: #f6f6fe;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
      height: 35px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #1c1c1c;
        color: #f6f6fe;
      }
    }
  }
`
