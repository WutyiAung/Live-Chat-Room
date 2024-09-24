<template>
    <form>
         <textarea placeholder="text message and hit enter to send" 
             v-model="message"
             @keypress.enter.prevent="handleSubmit">
         </textarea>
    </form>
 </template>
 
 <script>
 import { ref } from 'vue';
 import getUser from '@/composables/getUser';
import { serverTimestamp } from 'firebase/firestore'; 
 export default {
     setup(){
         let message = ref("");
         let { user } = getUser();
         let handleSubmit = () => {
           if (message.value.trim() !== "") { // Check if message is not empty
             let chat = {
               message: message.value,
               name: user.value.displayName,
               created_at: serverTimestamp() // Using serverTimestamp for correct timestamp
             };
             console.log(chat);
             message.value = "";
           }
         };
         return { message, handleSubmit };
     }
 }
 </script>
 
 <style>
     form {
        margin: 10px;
      }
      textarea {
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        font-family: inherit;
        outline: none;
      }
 </style>
 