import React from 'react'

// Components
import Details from '../../components/details/component'
import SearchPage from '../search/component'
import Footer from '../../components/footer/component'

// Styles
import { STDetailsPage } from './style'

export default function DetailsPage(props) {
  // Props
  const { user, searchText } = props
  return (
    searchText.searchInput !== '' ? (
      <SearchPage user={user} />
    ) : (
      <>
        <STDetailsPage sx={{ m: '0' }}>
          <Details sx={{ m: '0' }} user={user} />
        </STDetailsPage>
        <footer>
          <Footer />
        </footer>

      </>
    )
  )
}
