import { MoviesSeenServices } from '../../services/movies-seen-services'

// handler button for add seen
const handleSeen = (movie) => {
  MoviesSeenServices.addMoviesSeen(movie.id)
}

// handler button for remove seen
const handleRemoveSeen = (pendings, id) => {
  const idRemove = pendings.findIndex((pending) =>
    pending.credential === id)
  MoviesSeenServices.removeMovieSeen(pendings[idRemove].id)
}

// handler button for get seen
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
