<template>
    <div>
        <Navbar-desk />
        <Navbar-mob />
        <div class="products">
                <section class="products__menu">
                    <ul class="products__menu-container">
                        <!-- <input class="products__searchfields" type="search"> -->
                        <label>Choississez une catégorie:</label>
                        <select class="products__categories" name="text" placeholder="Sélectionner la catégorie" v-model="categoryValue"> 
                            <option value="all" selected="selected">Toutes</option>
                            <option value="menuiserie">menuiserie</option>
                            <option value="plomberie">Plomberie</option>
                            <option value="maconnerie">Maçonnerie</option>
                            <option value="jardinerie">Jardinerie</option>
                        </select>
                        <!-- <button class="products__btn" type="text">rechercher</button> -->
                        <!-- <router-link class="products__menu-item" tag="div" to="/products/read">products lus</router-link> -->
                    </ul>
            </section>
            <!-- AFFICHAGE DE MA LISTE DE COMPONENTS ENFANTS (LIST, READ, NEW) -->
        </div>
        <router-view :filter="categoryValue" />
    </div>
</template>
<script>

import http from '@/http';

import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

import ListProducts from './products/ListProducts'
import NewProduct from './products/NewProduct'
import CurrentProduct from './products/CurrentProduct'
import MyProducts from '@/components/products/MyProducts'

export default {
    name: "Products",
    components: {
    NavbarDesk,
    NavbarMob,
    ListProducts,
    NewProduct,
    CurrentProduct,
    MyProducts
    },
    data () {
        return {
            categoryValue: null
        }
    },
    beforeCreated () {
        this.categoryValue = "selectionner une catégorie"
    }
}   
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products";
</style>
