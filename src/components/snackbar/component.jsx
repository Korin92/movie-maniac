import * as React from 'react'

// Material UI
import Snackbar from '@mui/material/Snackbar'

// Components
import AlertMessage from '../alert/component'

export default function SnackbarComponent({
  message, open, severity, handleClose,
}) {
  // States
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
