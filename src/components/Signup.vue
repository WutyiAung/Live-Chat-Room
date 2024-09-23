<template>
  <h2>Sign up</h2>
  <form @submit.prevent="signUp">
    <input type="text" placeholder="display name" v-model="displayName">
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button>Sign Up</button>

  </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '../composables/useSignup'
import { useRouter } from 'vue-router';

export default {
  emits: ['enterChatRoom'],
    setup(props, { emit }){
        let displayName = ref("");
        let email = ref("");
        let password = ref("");
        let router = useRouter();
        let {error,createAccount} = useSignup();
        let signUp = async() => {
          let res = await  createAccount(email.value,password.value,displayName.value);
            if(res){
              emit('enterChatRoom');
            } else{
             console.log(error.value);
            }
        }
        return {displayName,email,password,createAccount,error,signUp}

    }
}
</script>

<style>

</style>