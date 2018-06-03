<template>
    <div>
        <div class="new__form">
            <h2 class="new__form-title">Envoyer un message à {{ newMessage.receiver }} </h2>
            <input class="new__form-item" type="text" placeholder="title" v-model="newMessage.title">
            <!-- <input class="new__form-item" type="text" placeholder="destinataire" v-model="newMessage.receiver"> -->
            <textarea class="new__form-item" rows="6" cols="50" type="text" placeholder="message" v-model="newMessage.content"></textarea>
            <button class="new__form-btn" type="submit" @click="createMessage()">Envoyez</button>
        </div>
        <div class="register__error-message">{{ errorMessage }}</div>

    </div>
</template>

<script>

import http from '@/http'

export default {

    name: "NewMessageRespond",
    data() {
        return {
            newMessage: {
            },
            errorMessage: "",
        }
    },
    methods: {
        createMessage() {
            http.post('/messages', this.newMessage)
            .then((res) => {
                this.$router.push({path: '/messages'});
                alert('votre message a été envoyé')

            })
            .catch((error) => {
                this.errorMessage = error.response.data;
            })
        }
    },
    mounted() {
        this.newMessage.receiver = this.$route.params.userId
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/messages/new-message";

</style>