<template>
<div>
    <!-- <Navbar-desk />
    <Navbar-mob /> -->
    <section class="list">
        <div class="list__container" v-if="load">
            <div class="list__block"  v-for="product in filteredProducts" :key="product.id">
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

import NavbarDesk from '../navbars/NavbarDesk'
import NavbarMob from '../navbars/NavbarMob'

export default {
    name: "MyProducts",
    components: {
    FontAwesomeIcon,
    NavbarDesk,
    NavbarMob
  },
    data() {
        return {
            listOfProducts: '',
            load: false
            }
    },
    props: ['filter'],
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
                console.log(this.listOfProducts)
                return this.listOfProducts
            }
        }
    },
    beforeCreate() {
        http.get('/products/:userId').then((res) => {
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