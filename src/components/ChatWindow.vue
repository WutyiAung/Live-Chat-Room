<template>
    <div class="chat-window">
        <div class="messages">
            <div v-for="message in messages" :key="message.id" class="single">
                <span class="created-at">{{ message.created_at.toDate() }}</span>
                <span class="name">{{ message.name }}</span>
                <span class="message">{{ message.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default {
    setup() {
        const messages = ref([]);

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
        const formatDate = (timestamp) => {
            if (timestamp) {
                const date = timestamp.toDate();
                const now = new Date();
                const minutesAgo = Math.floor((now - date) / (1000 * 60));
                return minutesAgo === 0 ? 'just now' : `${minutesAgo} mins ago`;
            }
            return 'unknown time';
        };

        return { messages, formatDate };
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
