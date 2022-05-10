import { db, auth } from '../utils/firebase'
import { collection, addDoc, getDoc, doc, deleteDoc } from 'firebase/firestore'

const addFavs = async (favs) => {
  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/favs`), {
      credential: favs,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

const removeFavs = async (favs) => {
  const favRef = doc(db, 'users', auth.currentUser.uid, 'favs', favs)
  await deleteDoc(favRef)
}

const isUserAdmin = async (uid) => {
  const q = collection(db, 'admins')

  const document = doc(q, uid)

  const response = await getDoc(document)

  return response.exists()
}

export const DatabaseServices = {
  addFavs,
  removeFavs,
  isUserAdmin,
}
