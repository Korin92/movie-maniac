import { db, auth } from '../utils/firebase'
import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore'

const addFavs = async (favs) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/favs`),
    where('credential', '==', favs)
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

const removeFavs = async (favs) => {
  const favRef = doc(db, 'users', auth.currentUser.uid, 'favs', favs)
  await deleteDoc(favRef)
}

const getFavs = async (setFavs) => {
  const q = query(collection(db, `users/${auth.currentUser.uid}/favs`))
  const querySnapshot = await getDocs(q)
  const arrayFavs = []

  querySnapshot?.docs.map((movie) => {
    const data = movie.data()
    data.id = movie.id
    return arrayFavs.push(data)
  })
  setFavs(arrayFavs)
}

const findFavs = async (favs) => {
  const q = query(
    collection(db, `users/${auth.currentUser.uid}/favs`),
    where('credential', '==', favs)
  )
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return true
  }else{
    return false
  }
  
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
  getFavs,
  findFavs
}
