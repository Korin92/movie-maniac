import React from 'react'
import TopRated from '../../components/top-rated/component'
import SearchPage from '../search/component'

import { STtopRated } from './style'

export default function TopRatedPage({ user, searchText }) {
  return (
    <STtopRated>
      {searchText.searchInput !== '' ? (
        <SearchPage user={user} />
      ) : (
        <TopRated user={user} />
      )}
    </STtopRated>
  )
}
