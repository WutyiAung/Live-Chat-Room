import { ref } from "vue";
import { auth } from '@/firebase/config';

let error = ref(null);
let userLogout = async() => {
    try{
        await auth.signOut();
        console.log("user logged out");
       }catch(err){
         error.value = err.message;
         console.log(error.value);
       }
}
let useLogout = () => {
    return {error,userLogout}
}
export default useLogout;