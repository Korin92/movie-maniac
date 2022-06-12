import { AdminServices } from '../../services/admin-services'

// handler button for delete admin
const handleDeleteAdmin = (user, setLoading) => {
  setLoading(true)
  AdminServices.deleteAdmin(user).then(() => {
    setLoading(false)
  })
}

export const HandlerButtonsOwner = {
  handleDeleteAdmin,
}
