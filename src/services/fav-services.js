import {
  collection, addDoc, doc, deleteDoc, query, getDocs, where,
} from 'firebase/firestore'
import { db, auth } from '../utils/firebase'

// Add favorties to the user
const addFavs = async (favs) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/favs`),
    where('credential', '==', favs),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return
  }

  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/favs`), {
      credential: favs,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// Delete favorties from the user
const removeFavs = async (favs) => {
  const favRef = doc(db, 'users', auth.currentUser.uid, 'favs', favs)
  await deleteDoc(favRef)
}

// Get all favorties from the user
const getFavs = async (user) => {
  const arrayFavs = []
  if (user.auth.currentUser) {
    const q = query(collection(db, `users/${auth?.currentUser.uid}/favs`))
    const querySnapshot = await getDocs(q)

    querySnapshot?.docs.map((movie) => {
      const data = movie.data()
      data.id = movie.id
      return arrayFavs.push(data)
    })
  }

  return arrayFavs
}

// Find favs in the database
const findFavs = async (favs) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/favs`),
    where('credential', '==', favs),
  )
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return true
  }
  return false
}

export const FavServices = {
  addFavs,
  removeFavs,
  getFavs,
  findFavs,
}
