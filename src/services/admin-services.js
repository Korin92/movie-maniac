import { getAuth } from '@firebase/auth'
import {
  collection, doc, deleteDoc, query, getDocs, setDoc,
} from 'firebase/firestore'
import { db, auth } from '../utils/firebase'

// Reset the ratings of the movies
const deleteRatings = async () => {
  const q = query(collection(db, 'rating'))
  const querySnapshot = await getDocs(q)

  querySnapshot?.docs.map((rating) => {
    const data = rating.data()
    data.id = rating.id
    return deleteDoc(doc(db, 'rating', data.id))
  })
}

const getUsers = async () => {
  const arrayUsers = []
  const q = query(collection(db, 'users'))
  const querySnapshot = await getDocs(q)

  querySnapshot?.docs.map((user) => {
    const data = user.data()
    data.id = user.id
    return arrayUsers.push(data)
  })
  return arrayUsers
}

const getAdmins = async () => {
  const arrayAdmins = []
  const q = query(collection(db, 'admins'))
  const querySnapshot = await getDocs(q)

  querySnapshot?.docs.map((admin) => {
    const data = admin.data()
    data.id = admin.id
    return arrayAdmins.push(data)
  })
  return arrayAdmins
}

const addAdmin = async (user) => {
  try {
    await setDoc(doc(db, 'admins', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const AdminServices = {
  deleteRatings,
  getUsers,
  addAdmin,
  getAdmins,
}
