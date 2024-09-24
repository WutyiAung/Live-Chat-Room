<template>
    <div class="chat-window">
        <div class="messages" ref="msgBox">
            <div v-for="message in formattedMessages" :key="message.id" class="single">
                <span class="created-at">{{ message.created_at }}</span>
                <span class="name">{{ message.name }}</span>
                <span class="message">{{ message.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted,computed, onUpdated } from 'vue';
import { db } from '@/firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export default {
    setup() {
        const messages = ref([]);
        let msgBox = ref(null);
        // auto scrolling feature
        onUpdated( () => {
            msgBox.value.scrollTop = msgBox.value.scrollHeight;
        })
        let formattedMessages = computed( () => {
            return messages.value.map( (msg) => {
                let formatTime = formatDistanceToNow(msg.created_at.toDate());
                return {...msg,created_at:formatTime}
            })
        })
        // Fetching messages from Firestore using the modular SDK
        onMounted(() => {
            const q = query(collection(db, "messages"), orderBy("created_at"));
            onSnapshot(q, (snapshot) => {
                let results = [];
                snapshot.docs.forEach(doc => {
                    let document = { ...doc.data(), id: doc.id };
                    if(doc.data().created_at){
                       results.push(document);
                   }
                });
                messages.value = results;
            });
        });

        // Formatting timestamp
        // const formatDate = (timestamp) => {
        //     if (timestamp) {
        //         const date = timestamp.toDate();
        //         const now = new Date();
        //         const minutesAgo = Math.floor((now - date) / (1000 * 60));
        //         return minutesAgo === 0 ? 'just now' : `${minutesAgo} mins ago`;
        //     }
        //     return 'unknown time';
        // };

        return { messages, formattedMessages, msgBox };
    }
};
</script>

<style>
  .chat-window {
        background: #fafafa;
        padding: 30px 20px;
  }
  .single {
        margin: 18px 0;
  }
  .created-at {
        display: block;
        color: #999;
        font-size: 12px;
        margin-bottom: 4px;
  }
  .name {
        font-weight: bold;
        margin-right: 6px;
  }
  .messages {
        max-height: 400px;
        overflow: auto;
  }
</style>
