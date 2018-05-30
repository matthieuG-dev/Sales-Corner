<template>
    <div>
       <div class="list__cards" v-for="message in listOfMessages" :key="message._id" v-if="message.read === true">
            <h3 class="list__cards-sender"> {{ message.senderId }} </h3> 
            <h4 class="list__cards-title"> {{ message.title }} </h4>
            <p class="list__cards-content"> {{ message.content }} </p>
            <p class="list__cards-date"> {{ message.creationDate }} </p>
        </div>
    </div>
</template>

<script>

import http from '@/http'

export default {
    
    name: "ReadMessages",
    data() {
        return {
            listOfMessages: '',
            errorMessage: '',
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
@import "src/sass/partials/messages/read-messages";

</style>