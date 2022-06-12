import React from 'react'

// Components
import TopRated from '../../components/top-rated/component'
import SearchPage from '../search/component'
import Footer from '../../components/footer/component'

// Styles
import { STtopRated } from './style'

export default function TopRatedPage({ user, searchText }) {
  return (
    <>
      <STtopRated>
        {searchText.searchInput !== '' ? (
          <SearchPage user={user} />
        ) : (
          <TopRated user={user} />
        )}
      </STtopRated>
      <footer>
        <Footer />
      </footer>

    </>
  )
}
