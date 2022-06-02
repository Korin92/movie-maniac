import { AdminServices } from '../../services/admin-services'

const handleDeleteAdmin = (user, setLoading) => {
  setLoading(true)
  AdminServices.deleteAdmin(user).then(() => {
    console.log('Admin deleted')
    setLoading(false)
  })
}

export const HandlerButtonsOwner = {
  handleDeleteAdmin,
}
