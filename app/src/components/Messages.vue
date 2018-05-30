<template>
    <div>
        <Navbar-desk />
        <Navbar-mob />
            <div class="messages">
                <section class="messages__menu">
                    <ul class="messages__menu-container">
                        <router-link class="messages__menu-item" tag="div" to="/messages">Mes messages</router-link>
                                <!-- <router-link class="messages__menu-item" tag="div" to="/messages/read">Messages lus</router-link> -->
                        <router-link class="messages__menu-item" tag="div" to="/messages/new">Nouveau message</router-link>
                    </ul>
            </section>
            <!-- AFFICHAGE DE MA LISTE DE COMPONENTS ENFANTS (LIST, READ, NEW) -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import http from '@/http';

import NewMessage from './messages/NewMessage'
import ListMessages from './messages/ListMessages'
import ReadMessages from './messages/ReadMessages'

import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

export default {
    name: "Messages",
    components: {
    NewMessage,
    ListMessages,
    ReadMessages,
    NavbarDesk,
    NavbarMob
    },
   data () {
        return {
            success: false
        }
    },
    methods: {
        open: function() {
            this.success = true;
        },
         close: function() {
            this.success = false;

        }
    }
  
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/messages";
</style>