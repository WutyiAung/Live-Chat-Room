import { ref } from "vue";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config";

// Reactive error variable
let error = ref(null);

// Function for signing in
let signIn = async (email, password) => {
    error.value = null;  // Reset the error at the beginning
    try {
        // Attempt to sign in using email and password
        let res = await signInWithEmailAndPassword(auth, email, password);
        if (!res) {
            throw new Error("Cannot log in to account.");
        }
        return res;
    } catch (err) {
        error.value = err.message;
    }
};

// Hook function to use login
let useLogin = () => {
    return { error, signIn };
};

// Export the `useLogin` hook as default
export default useLogin;
