<template>
    <div>
        <section class="navdesk">
            <div class="navdesk__container">
                <ul class="navdesk__menu">
                    <router-link class="navdesk__menu-item" tag="div" to="/products/newProduct">Déposer une annonce</router-link>
                    <router-link class="navdesk__menu-item" tag="div" to="/messages">Mes messages</router-link>
                    
                    <router-link class="navdesk__menu-item" tag="div" to="/products">Products</router-link>
                    <router-link class="navdesk__menu-item" tag="div" to="/products/MyProducts"> Mes produits</router-link>

                    <!-- <span @click="deconnexion()"> deconnexion</span> -->
                    <router-link class="navdesk__icon" tag="div" to="/">
                        <i class="fas fa-sign-out-alt"></i>
                    </router-link>
                </ul>     
            </div>
        </section>
    </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
    name: "NavbarDesk",
    methods: {
    }
   
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/navbar-desk";

</style>