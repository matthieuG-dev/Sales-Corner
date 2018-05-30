<template>
<div>
    <section class="list">
        <div class="list__container" v-if="load">
            <div  v-for="product in listOfProducts" :key="product.id">
                <router-link class="list__item" tag="div" :to="{name: 'CurrentProduct', params: {productId: product._id, content: product}}">
                    <img class="list__item-img" src="http://via.placeholder.com/220x180" alt="image">
                    <div class="list__item-infos">
                        <h2 class="list__item-title"> {{ product.title }} </h2>
                        <p class="list__item-category"> {{ product.category }} </p>
                        <p class="list__item-desc"> {{ product.description }} </p>
                        <p class="list__item-price"> {{ product.price }} € </p>
                        <p class="list__item-date"> {{ getDate(product.creationDate) }} </p>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import http from '@/http';
import moment from 'moment';



export default {
    name: "ListProducts",
    data() {
        return {
            listOfProducts: '',
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
            this.listOfProducts = res.data.content.reverse();
            this.load = true;
        })
        .catch((err) => {
            console.log((err))
        })
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products/list-products";

</style>