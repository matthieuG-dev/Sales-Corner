<template>
<div>
    <section class="list">
        <div class="list__container" v-if="load">
            <div class="list__block"  v-for="product in listOfProducts" :key="product.id">
                <router-link class="list__item" tag="div" :to="{name: 'CurrentProduct', params: {productId: product._id, content: product}}">
                    <img class="list__item-img" src="http://via.placeholder.com/220x180" alt="image">
                    <div class="list__item-infos">
                        <h2 class="list__item-title"> {{ product.title }} </h2>
                        <p class="list__item-category"> {{ product.category }} </p>
                        <p class="list__item-desc"> {{ product.description }} </p>
                        <p class="list__item-price"> {{ product.price }} € </p>
                        <p class="list__item-date"> {{ getDate(product.creationDate) }} </p>
                    </div>
                    
                    <div class="list__item-icon">
                        <font-awesome-icon class="list__icon" :icon="trash" @click="deleteProduct(product._id)"/>
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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'

export default {
    name: "ListProducts",
    data() {
        return {
            listOfProducts: '',
            load: false,
        }
    },
    methods: {
        getDate (date) {
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        deleteProduct (id) {
            http.delete('/products/' + id).then((res) => {
                console.log('success')
				this.$router.push({path: '/products/myProducts'})
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
        http.get('/products/:userId').then((res) => {
            this.listOfProducts = res.data.content;
            this.load = true;
            console.log(this.listOfProducts)
        })
        .catch((err) => {
            console.log((err))
        })
    },
    components: {
	FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products/list-products";

</style>