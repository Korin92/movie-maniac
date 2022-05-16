import React from 'react'

import Details from '../../components/details/component'

import { STDetailsPage } from './style'

export default function DetailsPage(props) {
  const { user } = props
  return (
    <STDetailsPage>
      <Details user={user} />
    </STDetailsPage>
  )
}
