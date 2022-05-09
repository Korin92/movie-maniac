import { db } from '../utils/firebase'
import { collection, addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

const addFavs = async (favs) => {
    try {
        const docRef = await addDoc(collection(db, "favs"), {
          credential:favs
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

const removeFavs = async (favs) => {

    await deleteDoc(doc(db, "favs", favs));
    
    }

export const DatabaseServices = {
    addFavs,
    removeFavs
}

