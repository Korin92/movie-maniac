import { PendingWatchServices } from '../../services/pending-watch-services'

// handler button for add pending
const handlePending = (movie) => {
  PendingWatchServices.addPending(movie.id)
}

// handler button for remove pending
const handleRemovePending = (pendings, id) => {
  const idRemove = pendings.findIndex((pending) =>
    pending.credential === id)
  PendingWatchServices.removePending(pendings[idRemove].id)
}

// handler button for get pending
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
