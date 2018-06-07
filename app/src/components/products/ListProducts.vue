<template>
<div>
    <section class="list">
        <div class="list__container" v-if="load">
            <div  v-for="product in filteredProducts" :key="product.id">
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
    props: ['filter'],
    methods: {
        getDate : function (date) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        //fonction optimisée pour le filtrage des annonces avec pasage de parametres
        //probleme: le component apparait vide sans annonces !
        filterProduct (category) {
            if (this.filter === category) {
                return this.listOfProducts.filter(product => product.category === category)
            }
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
    },
    computed: {
        //computed retournant liste des annonces filtrée: non optimisée !!!
        filteredProducts () {
            if (this.filter === 'menuiserie') {
                return this.listOfProducts.filter(product => product.category === 'menuiserie')
            } else if (this.filter === 'plomberie') {
                return this.listOfProducts.filter(product => product.category === 'plomberie')
            } else if (this.filter === 'maconnerie') {
                return this.listOfProducts.filter(product => product.category === 'maconnerie')
            } else if (this.filter === 'jardinerie') {
                return this.listOfProducts.filter(product => product.category === 'jardinerie')
            } else {
                return this.listOfProducts
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products/list-products";

</style>