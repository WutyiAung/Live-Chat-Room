<template>
  <div>
   <nav v-if="user">
       <div>
        <p>Hi {{ user?.displayName || 'Guest'}}</p>
        <p class="email">Login in as {{ user?.email || 'login as guest' }}</p>
      </div>
       <button @click="logout">Logout</button>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser'; 

export default {
    setup(){
        let { error,userLogout} = useLogout();
        let {user} = getUser();
        let logout = async() => {
         await userLogout();
        }
        
        return { logout,user }
    }
}
</script>

<style>
 nav{
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
 }
 nav p{
    margin: 2px auto;
    font-size: 16px;
    color: #444;
 }
 nav p.email{
    font-size: 14px;
    color: #999;
 }
</style>