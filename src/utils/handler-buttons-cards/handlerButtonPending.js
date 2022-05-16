import { PendingWatchServices } from '../../services/pending-watch-services'

const handlePending = (movie) => {
  PendingWatchServices.addPending(movie.id)
}

const handleRemovePending = (pendings, id) => {
  const idRemove = pendings.findIndex((pending) =>
    pending.credential === id)
  PendingWatchServices.removePending(pendings[idRemove].id)
}

const pendingsMovies = async (user, pendings) => {
  const arrayCredentialsPendings = []

  if (user) {
    if (pendings.length > 0) {
      pendings.map((pending) =>
        arrayCredentialsPendings.push(pending.credential))
    }
  }
  return arrayCredentialsPendings
}

export const HandlerButtonPending = {
  handlePending,
  handleRemovePending,
  pendingsMovies,
}
