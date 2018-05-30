<template>
    <div>
       <!-- <div class="list__cards" v-for="message in listOfMessages" :key="message._id"  @click="getMessageId(message._id)" v-if="message.read === true">
                <h3 class="list__cards-sender"> {{ message.senderId }} </h3> 
                <h4 class="list__cards-title"> {{ message.title }} </h4>
                <p class="list__cards-content"> {{ message.content }} </p>
                <p class="list__cards-date"> {{ message.creationDate }} </p>
        </div> -->
        <div class="current">
            <section class="current__container" v-for=" message in listOfMessages" :key="message.id" v-if="message._id == $route.params.messageId">
                <div class="current__header">
                    <h2 class="current__header-title"> {{ message.title }} </h2>
                    <p class="current__header-sender">  {{ message.senderId }} </p>
                </div>
                <div class="current__content">
                    <p class="current__content-text"> {{ message.content }} </p>
                </div>
                <!-- <input type="text" class="class__receiver" "> -->
            </section>
            <section class="response">
                <div class="response__container">
                </div>

            </section>
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
        }
    },
    methods: {
    
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