import React, { forwardRef } from 'react'

// Material UI
import MuiAlert from '@mui/material/Alert'

// Styles
import { STAlert } from './style'

// Constants
const Alert = forwardRef((props, ref) =>
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />)

export default function AlertMessage(props) {
  // Props
  const { severity, message } = props

  return (
    <STAlert>
      <Alert className="alert" severity={severity} sx={{ width: '90%' }}>
        {message}
      </Alert>
    </STAlert>
  )
}
