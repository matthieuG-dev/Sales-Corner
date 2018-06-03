<template>
<div>
    <navbar-desk />
    <navbar-mob />
    <section class="current" v-for="product in listOfProducts" :key="product.id" v-if="product._id === $route.params.productId">
        <div class="current__container">
            <div class="current__item">
                <img class="current__item-img" src="http://via.placeholder.com/900x550" alt="image">
                <div class="current__item-infos">
                    <h2 class="current__item-title"> {{ product.title }} </h2>
                    <p class="current__item-price"> {{ product.price }} € </p>
                </div>
                <p class="current__item-date"> {{ getDate(product.creationDate) }} </p>

            </div>
            <div class="current__desc">
                <h2 class="current__desc-title">Description :</h2>
                <p class="current__desc-content">

                    {{ product.description}}
                </p>
            </div>
        </div>
        <div class="current__contact" v-show="product.userId !== currentUser">
            <h2 class="current__contact-sender"> {{ product.userId}} </h2>
            <router-link tag="span" :to="{name: 'NewMessageRespond', params: {userId: product.userId, content: product}}">
                <button class="current__contact-btn">envoyer message</button>
            </router-link>
        </div>
    </section>
</div>
</template>

<script>
import http from '@/http';
import moment from 'moment';

import NavbarDesk from '@/components/navbars/NavbarDesk'
import NavbarMob from '@/components//navbars/NavbarMob'

export default {
    name: "CurrentProduct",
    components: {
        NavbarDesk,
        NavbarMob,
    },
    data() {
        return {
            listOfProducts: '',
            currentUser: '',
            load: false,
        }
    },
    methods: {
        getDate : function (date) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
    },
    beforeCreate() {
        http.get('/products').then((res) => {
            this.listOfProducts = res.data.content;
            var token = this.$jwt.decode(sessionStorage.token)
            this.currentUser = token.username                        
        })
        .catch((err) => {
            console.log((err))
        })
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products/current-product";

.titre {
    color: green;
}
</style>