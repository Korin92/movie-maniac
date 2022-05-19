import React from 'react'

import Details from '../../components/details/component'

import { STDetailsPage } from './style'

export default function DetailsPage(props) {
  const { user } = props
  return (
    <STDetailsPage sx={{ m: '0' }}>
      <Details sx={{ m: '0' }} user={user} />
    </STDetailsPage>
  )
}
