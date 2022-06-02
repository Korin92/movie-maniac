import { AdminServices } from '../../services/admin-services'

const handleAdmin = (user, setLoading) => {
  setLoading(true)
  AdminServices.addAdmin(user).then(() => {
    console.log('Admin added')
    setLoading(false)
  })
}

export const HandlerButtonsAdmin = {
  handleAdmin,
}
