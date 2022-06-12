import {
  collection, doc, deleteDoc, query, getDocs, setDoc,
} from 'firebase/firestore'
import { db } from '../utils/firebase'

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

// get users
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

// get admins
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

// add admin
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

// delete admin
const deleteAdmin = async (user) => {
  try {
    await deleteDoc(doc(db, 'admins', user.uid))
  } catch (e) {
    console.error('Error deleting document: ', e)
  }
}

// get owner
const getOwners = async () => {
  const arrayOwners = []
  const q = query(collection(db, 'owner'))
  const querySnapshot = await getDocs(q)

  querySnapshot?.docs.map((owner) => {
    const data = owner.data()
    data.id = owner.id
    return arrayOwners.push(data.id)
  })
  return arrayOwners
}

export const AdminServices = {
  deleteRatings,
  getUsers,
  addAdmin,
  getAdmins,
  deleteAdmin,
  getOwners,
}
