import React, { useRef, useContext } from 'react'

// MaterialUI
import SearchIcon from '@mui/icons-material/Search'

// Styles
import { Search, SearchIconWrapper, StyledInputBase } from './style'

// Context
import SearchContext from './context'

export default function SearchBar() {
  // useRef
  const inputRef = useRef(null)

  // Context
  const { searchInput, updateSearchInput } = useContext(SearchContext)

  // Handlers
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
