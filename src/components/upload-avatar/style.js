import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'

export const STDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.palette.mode === 'dark' ? '#1c1c1c' : '#fafafa',
}))

export const STAddPhotoAlternateIcon = styled(AddPhotoAlternateIcon)(({ theme }) => ({
  justifyContent: 'center',
  border: 'dashed',
  cursor: 'pointer',
  fontSize: '100px',
  color: '#ccc',
}))

export const STTypography = styled(Typography)(({ theme }) => ({
  marginTop: '10px',
}))

export const STDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'center',
  background: theme.palette.mode === 'dark' ? '#1c1c1c' : '#fafafa',
}))
