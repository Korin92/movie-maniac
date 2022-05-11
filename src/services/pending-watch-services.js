import {
  collection, addDoc, doc, deleteDoc, query, getDocs, where,
} from 'firebase/firestore'
import { db, auth } from '../utils/firebase'

// Add favorties to the user
const addPending = async (pending) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/pending`),
    where('credential', '==', pending),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return
  }

  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/pending`), {
      credential: pending,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// Delete favorties from the user
const removePending = async (pending) => {
  const pendingRef = doc(db, 'users', auth.currentUser.uid, 'pending', pending)
  await deleteDoc(pendingRef)
}

// Get all favorties from the user
const getPending = async () => {
  const q = query(collection(db, `users/${auth.currentUser.uid}/pending`))
  const querySnapshot = await getDocs(q)
  const arrayPending = []

  querySnapshot?.docs.map((movie) => {
    const data = movie.data()
    data.id = movie.id
    return arrayPending.push(data)
  })

  return arrayPending
}

export const PendingWatchServices = {
  addPending,
  getPending,
  removePending,
}
