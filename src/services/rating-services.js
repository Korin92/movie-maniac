import {
  collection, addDoc, doc, updateDoc, query, getDocs, where,
} from 'firebase/firestore'
import { db } from '../utils/firebase'

// Add rating
const addRating = async (movieId, rating) => {
  const q = query(
    collection(db, 'rating'),
    where('credential', '==', movieId),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const ratingRef = doc(db, 'rating', querySnapshot.docs[0].id)
    await updateDoc(ratingRef, {
      stars: querySnapshot.docs[0].data().stars + rating,
      votes: querySnapshot.docs[0].data().votes + 1,

    })
  } else {
    try {
      await addDoc(collection(db, 'rating'), {
        credential: movieId,
        stars: rating,
        votes: 1,
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
}

const getRating = async (movieId) => {
  const q = query(
    collection(db, 'rating'),
    where('credential', '==', movieId),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data()
  }
  return null
}

const getRatings = async () => {
  const q = query(
    collection(db, 'rating'),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((document) =>
      document.data())
  }
  return null
}

const getTopRated = async () => {
  const q = query(
    collection(db, 'rating'),
    where('stars', '>', 3.5),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const arrayRating = []
    querySnapshot.docs.map((movie) => {
      const data = movie.data()
      data.id = movie.id
      return arrayRating.push(data)
    })

    return arrayRating
  }
  return null
}

export const RatingServices = {
  addRating,
  getRating,
  getTopRated,
  getRatings,
}
