<template>
    <div>
        <Navbar-desk />
        <Navbar-mob />
        <div class="products">
                <section class="products__menu">
                    <ul class="products__menu-container">
                        <!-- <input class="products__searchfields" type="search"> -->
                        <select class="products__categories" name="text" placeholder="Sélectionner la catégorie"> 
                            <option value="toutes"  selected>Toutes</option>
                            <option value="menuiserie">Menuiserie</option>
                            <option value="plomberie">Plomberie</option>
                            <option value="maçonnerie">Maçonnerie</option>
                            <option value="jardinerie">Jardinerie</option>
                        </select>
                        <button class="products__btn" type="text">rechercher</button>
                        <!-- <router-link class="products__menu-item" tag="div" to="/products/read">products lus</router-link> -->
                    </ul>
            </section>
            <!-- AFFICHAGE DE MA LISTE DE COMPONENTS ENFANTS (LIST, READ, NEW) -->
        </div>
        <router-view/>
    </div>
</template>
<script>

import http from '@/http';
import store from '@/store/Store'

import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

import ListProducts from './products/ListProducts'
import NewProduct from './products/NewProduct'
import CurrentProduct from './products/CurrentProduct'



export default {
    name: "Products",
    components: {
    NavbarDesk,
    NavbarMob,
    ListProducts,
    NewProduct,
    CurrentProduct
    }
}   
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products";

.btn {
    padding: 0.3vw;
    background-color: rgb(0, 183, 255);
    border: none;
    color: #fff;
    border-radius: 3px;
    padding: 10px;
}


</style>
