import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

let error = ref(null);

let createAccount = async (email, password, displayName) => {
  error.value = null; // Reset error before a new attempt
  try {
    // Create user with email and password
    let res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Could not create new user");
    }
    // Update the user's profile with displayName
    await updateProfile(res.user, {
      displayName: displayName,
    });
    // console.log(res.user)
    return res;
  } catch (err) {
    error.value = err.message; // Update reactive error value
    // console.log(error.value);
  }
};

let useSignup = () => {
  return { error, createAccount };
};

export default useSignup;
