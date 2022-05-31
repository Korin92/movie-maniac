import * as React from 'react'

import Snackbar from '@mui/material/Snackbar'
import AlertMessage from '../alert/component'

export default function SnackbarComponent({
  message, open, severity, handleClose,
}) {
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  })

  const { vertical, horizontal } = state

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <div>
          <AlertMessage message={message} severity={severity} />
        </div>
      </Snackbar>
    </div>
  )
}
