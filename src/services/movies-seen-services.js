import {
  collection, addDoc, doc, deleteDoc, query, getDocs, where,
} from 'firebase/firestore'
import { db, auth } from '../utils/firebase'

// Add favorties to the user
const addMoviesSeen = async (seen) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/movies-seen`),
    where('credential', '==', seen),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return
  }

  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/movies-seen`), {
      credential: seen,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// Delete favorties from the user
const removeMovieSeen = async (seen) => {
  const movieSeenRef = doc(db, 'users', auth.currentUser.uid, 'movies-seen', seen)
  await deleteDoc(movieSeenRef)
}

// Get all favorties from the user
const getMovieSeen = async (user) => {
  const arrayMoviesSeen = []
  if (user?.auth.currentUser) {
    const q = query(collection(db, `users/${auth.currentUser.uid}/movies-seen`))
    const querySnapshot = await getDocs(q)

    querySnapshot?.docs.map((movie) => {
      const data = movie.data()
      data.id = movie.id
      return arrayMoviesSeen.push(data)
    })
  }

  return arrayMoviesSeen
}

export const MoviesSeenServices = {
  addMoviesSeen,
  removeMovieSeen,
  getMovieSeen,
}
