<template>
    <div>
        <Navbar-mob />        
        <Navbar-desk />
        <div class="messages">
            <section class="messages__menu">
                <div class="messages__menu-container">
                    <router-link class="messages__menu-item" tag="div" to="/messages">Mes messages</router-link>
                    <router-link class="messages__menu-item" tag="div" to="/messages/new">Envoyer message</router-link>
                </div>
            </section>
            <!-- AFFICHAGE DE MA LISTE DE COMPONENTS ENFANTS (LIST, READ, NEW) -->
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import http from '@/http';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

import NewMessage from './messages/NewMessage'
import ListMessages from './messages/ListMessages'
import ReadMessages from './messages/ReadMessages'

export default {
    name: "Messages",
    components: {
    NavbarDesk,
    NavbarMob, 
    NewMessage,
    ListMessages,
    ReadMessages,
    FontAwesomeIcon
    },
   data () {
        return {
        }
    },
    methods: {
    
    },
    computed: {
		plus () {
			return faPlus
		}
  }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/messages";
</style>