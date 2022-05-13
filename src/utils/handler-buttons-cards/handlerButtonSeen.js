import { MoviesSeenServices } from '../../services/movies-seen-services'

const handleSeen = (movie) => {
  MoviesSeenServices.addMoviesSeen(movie.id)
}

const handleRemoveSeen = (pendings, id) => {
  const idRemove = pendings.findIndex((pending) =>
    pending.credential === id)
  MoviesSeenServices.removeMovieSeen(pendings[idRemove].id)
}

const seenMovies = async (user, seen) => {
  const arrayCredentialsSeen = []
  if (user) {
    if (seen.length > 0) {
      seen.map((seenMovie) =>
        arrayCredentialsSeen.push(seenMovie.credential))
    }
  }
  return arrayCredentialsSeen
}

export const HandlerButtonSeen = {
  handleSeen,
  handleRemoveSeen,
  seenMovies,
}
