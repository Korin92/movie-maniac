import { AdminServices } from '../../services/admin-services'

// handler button for add admin
const handleAdmin = (user, setLoading) => {
  setLoading(true)
  AdminServices.addAdmin(user).then(() => {
    setLoading(false)
  })
}

export const HandlerButtonsAdmin = {
  handleAdmin,
}
