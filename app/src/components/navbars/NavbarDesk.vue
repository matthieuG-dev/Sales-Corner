<template>
    <div>
        <section class="navdesk">
            <div class="navdesk__container">
                <ul class="navdesk__menu">
                    <router-link class="navdesk__menu-item" tag="li" to="/products/newProduct">Déposer une annonce</router-link>
                    <router-link class="navdesk__menu-item" tag="li" to="/products">Annonces</router-link>
                    <li class="navdesk__menu-item" @click="displaySubmenu">Mon compte</li>
                    <ul class="navdesk__submenu" v-bind:class="{on: active, off: !active}">
                        <router-link class="navdesk__submenu-item" tag="div" to="/profil">Mon profil</router-link>
                        <router-link class="navdesk__submenu-item" tag="div" to="/products/myProducts">Mes anonces</router-link>
                        <router-link class="navdesk__submenu-item" tag="div" to="/messages">Messages</router-link>
                    </ul>
                </ul>    
                <router-link class="navdesk__deconnect" tag="div" to="/" >
                    <p>Se déconnecter</p>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

export default {
    name: "NavbarDesk",
    data () {
        return {
            active: false,
        }
    },
    methods: {
        displaySubmenu () {
			this.active = !this.active;
		}
    },
    	computed: {
		bars () {
			return faBars
		},
		times () {
			return faTimes
		}
    },
    components: {
        FontAwesomeIcon
    }
   
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/navbar-desk";
 
</style>