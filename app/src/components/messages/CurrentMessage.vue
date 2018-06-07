<template>
    <div>
        <div class="current">
            <section class="current__container" v-for=" message in listOfMessages" :key="message.id" v-if="message._id == $route.params.messageId">
                {{test(message.title, message.senderId)}}
                <div class="current__header">
                    <p class="current__header-title"> {{ message.title }} </p>
                    <p class="current__header-sender">message envoyé par {{ message.senderId }} </p>
                </div>
                <div class="current__content">
                    <p class="current__content-text"> {{ message.content }} </p>
                </div>
                <!-- <input type="text" class="class__receiver" "> -->
            </section>
        </div>
            <div class="response">
                <div class="response__container">
                <textarea class="response__textarea" rows="7" v-model="responseMessage.content" placeholder="Répondre ici"></textarea>
                {{errorMessage}}
                    <button class="response__btn" @click="createMessage">envoyer message</button>
                </div>
            </div>
    </div>
</template>

<script>
import http from '@/http'

export default {
    
    name: "CurrentMessage",
    data() {
        return {
            listOfMessages: "",
            responseMessage: {},
            errorMessage: ""
        }    
    },
    methods: {
        createMessage() {
            console.log(this.responseMessage)
            http.post('/messages', this.responseMessage).then((res) => {
                alert('votre message a été envoyé')
                this.$router.push({path: '/messages'});
            })
            .catch((error) => {
                this.errorMessage = error.response.data;
            })
        },
        test (first, second) {
            this.responseMessage.title = first
            this.responseMessage.receiver = second
        },
        display () {
            console.log(this.responseMessage)
        }
    },
    beforeCreate() {
        http.get('/messages')
        .then((response) => {
            this.listOfMessages = response.data.content
        })
        .catch((error) => {
            console.log(error.response.data)
            this.errorMessage = error.response.data
        })
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/messages/current-message";

</style>