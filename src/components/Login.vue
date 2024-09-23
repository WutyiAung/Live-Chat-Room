<template>
    <h2>login</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <div class="error" v-if="error">{{  error }}</div>
      <button>login</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import useLogin from '@/composables/useLogin';


  export default {
     emits: ['enterChatRoom'],
      setup(props,{ emit }){
          let email = ref("");
          let password = ref("");
          let { error, signIn } = useLogin();
          let login = async () => {
            let res = await signIn(email.value,password.value);
            if(res){
              emit("enterChatRoom");
            } 
          };

          return {email,password,login,error}
  
      }
  }
  </script>
  
  <style>
  
  </style>