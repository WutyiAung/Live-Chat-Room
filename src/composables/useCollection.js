import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore"; // import Firestore methods
import { db } from "@/firebase/config"; // db instance

let useCollection = (collectionName) => {
  let error = ref(null);

  // Add document function
  let addDocument = async (doc) => {
    error.value = null;
    try {
      // Use Firestore modular syntax for adding a document
      const colRef = collection(db, collectionName); // Get reference to the collection
      await addDoc(colRef, doc); // Add document to collection
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
    }
  };

  return { error, addDocument }; // return the updated function
};

export default useCollection;
