import React from 'react'
import { useNavigate } from 'react-router'

// MaterialUI
import SearchIcon from '@mui/icons-material/Search'

// Styles
import { Search, SearchIconWrapper, StyledInputBase } from './style'

export default function SearchBar({ search }) {
  // hooks
  const navigate = useNavigate()

  // handlers
  const handleChange = (event) => {
    navigate(`/?search=${event.target.value}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar película..."
          inputProps={{ 'aria-label': 'search' }}
          value={search ?? ''}
          onChange={handleChange}
        />

      </Search>
    </form>
  )
}
