import { forwardRef } from 'react'

import MuiAlert from '@mui/material/Alert'

import { STAlert } from './style'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AlertMessage(props) {
  const { severity, message } = props


  return (
    <STAlert>
      <Alert className="alert" severity={severity} sx={{ width: '90%' }}>
        {message}
      </Alert>
    </STAlert>
  )
}