import React, { useRef, useContext } from 'react'
import { useNavigate } from 'react-router'

// MaterialUI
import SearchIcon from '@mui/icons-material/Search'

// Styles
import { Search, SearchIconWrapper, StyledInputBase } from './style'
import SearchContext from './context'

export default function SearchBar() {
  const inputRef = useRef(null)

  const { searchInput, updateSearchInput } = useContext(SearchContext)

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
          value={searchInput}
          ref={inputRef}
          onChange={(e) =>
            updateSearchInput(e.currentTarget.value)}
        />

      </Search>
    </form>
  )
}
