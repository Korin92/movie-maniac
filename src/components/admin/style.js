import styled from 'styled-components'

export const STAdmin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  margin: 10px 0 0 10px;

  .title {
    font-size: 2.5em;
    font-weight: bold;
    margin-top: 20px;
  }

  .title-rating {
    font-size: 1.5em;
    margin-top: 40px;
  }

  .admin-btn {
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1em;
    }
    .title-rating {
      font-size: 0.9em;
      margin-top: 20px;
    }
    .admin-btn {
      font-size: 10px;
    }
  }
`
export const STContainer = styled.div`
  display: flex;
  width: 100%;

  .table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btn {
      margin-top: 10px;
      margin-left: 10px;
      border-radius: 5px;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      font-size: 14px;
      font-weight: bold;
      color: #000;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 10px;
    .table {
      width: 60%;
      height: 300px;
      margin-left: 10px;

      .btn {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 980px) {
    flex-direction: column;
    margin-bottom: 10px;
    .table {
      width: 90%;
      margin-left: 10px;

      .btn {
        font-size: 10px;
      }
    }
  }
`
