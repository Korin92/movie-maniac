import React from 'react'
import TopRated from '../../components/top-rated/component'
import SearchPage from '../search/component'

export default function TopRatedPage({ user, searchText }) {
  return (
    searchText.searchInput !== '' ? (
      <SearchPage user={user} />
    ) : (
      <TopRated user={user} />
    )
  )
}
