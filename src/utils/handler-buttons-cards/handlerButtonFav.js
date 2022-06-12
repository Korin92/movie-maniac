import { FavServices } from '../../services/fav-services'
// Firebase
import { auth } from '../firebase'

// handler button for add fav
const handleFav = (movie) => {
  FavServices.addFavs(movie.id)
}

// handler button for remove fav
const handleRemoveFav = (favs, id) => {
  const idRemove = favs.findIndex((fav) =>
    fav.credential === id)
  FavServices.removeFavs(favs[idRemove].id)
}

// handler button for get fav
const favoriteMovies = async (user, favs) => {
  const arrayCredentialsFav = []

  if (user) {
    if (favs.length > 0) {
      favs.map((fav) =>
        arrayCredentialsFav.push(fav.credential))
    }
  }
  return arrayCredentialsFav
}

export const HandlerButtonFav = {
  handleFav,
  handleRemoveFav,
  favoriteMovies,
}
