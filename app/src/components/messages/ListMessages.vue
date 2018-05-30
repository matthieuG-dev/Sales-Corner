<template>
    <div>
        <section class="list">
            <div class="list__block">
                <div  class="list__cards" v-for="message in listOfMessages" v-bind:class="{ active: message.read == true }"  :key="message._id"  @click="readMessage(message)">
                    <div class="list__cards-icon"  @click="deleteMessage(message._id)">
                        <font-awesome-icon class="list__cards-icon" :icon="trash"/>
                    </div>
                    <router-link class="list__cards-container" tag="div" :to="{name: 'CurrentMessage', params: {messageId: message._id, content: message}}">
                        <h3 class="list__cards-sender"> {{ message.senderId }} </h3> 
                        <h4 class="list__cards-title"> {{ message.title }} </h4>
                        <p class="list__cards-content"> {{ message.content }} </p>
                        <p class="list__cards-date"> {{ getDate(message.creationDate) }} </p>
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import http from '@/http';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

export default {

    
    name: "ListMessages",
    components: {
	FontAwesomeIcon
    },
    data() {
        return {
            listOfMessages: '',
            errorMessage: '',
            messageId: '',
            errorMessage: '',            
        }
    },
    methods: {
       readMessage: (message) => {  
            // STOCKAGE DE L'ID DU MESSAGE SUR LEQUEL ON CLIC
            //    this.messageId = _messageId
           http.put('/messages/' + message._id).then((response) => {
               console.log(response)
           })
           .catch((error) => {
               this.errorMessage = error.response.data
           })
        },
        getDate (date) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        deleteMessage (id) {
            http.delete('/messages/' + id).then((res) => {
                console.log('success')
                // this.$router.push({path: '/messages'})
                location.reload();

            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    computed: {
		trash () {
			return faTrash
        },
    },
    beforeCreate() {
        http.get('/messages')
        .then((response) => {
            this.listOfMessages = response.data.content.reverse()
        })
        .catch((error) => {
            console.log(error.response.data)
            this.errorMessage = error.response.data
        })
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/messages/list-messages";

</style>