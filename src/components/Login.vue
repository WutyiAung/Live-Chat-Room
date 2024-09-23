<template>
    <h2>login</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <button>login</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
      setup(){
          let email = ref("");
          let password = ref("");
          let login = () => {
              
          }
          return {email,password}
  
      }
  }
  </script>
  
  <style>
  
  </style>