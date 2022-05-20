import { AdminServices } from '../../services/admin-services'

const handleAdmin = (user) => {
  AdminServices.addAdmin(user)
}

export const HandlerButtonsAdmin = {
  handleAdmin,
}
