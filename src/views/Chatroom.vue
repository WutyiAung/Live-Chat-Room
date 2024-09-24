<template>
  <div class="container">
    <Navbar></Navbar>
    <ChatWindow></ChatWindow>
    <NewChatForm></NewChatForm>
  </div>
</template>

<script>
import ChatWindow from '../components/ChatWindow'
import NewChatForm from '../components/NewChatForm'
import Navbar from '../components/Navbar';
import { watch } from 'vue';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
export default {
  components: {
    ChatWindow,
    NewChatForm, Navbar },
  setup(){
    let {user} = getUser();
    let router = useRouter();
    // redirect
    watch(user,() => {
      if(!user.value){
       router.push({name:"Welcome"});
      }
    })
  }
}
</script>

<style>

</style>