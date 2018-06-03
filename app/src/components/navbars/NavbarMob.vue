<template>
	<div>
		<section class="navmob">
			<div class="navmob__container">
				<div class="navmob__icon">
						<font-awesome-icon class="navmob__icon-item" @click.prevent="success = true" :icon="bars" v-show="success === false"/>
            <font-awesome-icon class="navmob__icon-item" @click.prevent="success = false  " :icon="times" v-show="success === true"/>
					<router-link class="navmob__icon-content" tag="div" to="/" >
            <font-awesome-icon class="navmob__icon--out" :icon="times" />
					</router-link>
				</div>
				<div class="navmob__icon">
					<i class="fas fa-times navmob__icon-content"></i>
				</div>
          <transition name="fade">
            <ul class="navmob__menu" v-show="success === true">
							<router-link class="navmob__menu-item" tag="div" to="/products/newProduct" @click="close">Déposer une annonce</router-link>
              <router-link class="navmob__menu-item" tag="div" to="/products" @click="close">Annonces</router-link>
							<li class="navmob__menu-item" @click="displaySubmenu">Mon compte</li>
								<ul class="navmob__submenu" v-bind:class="{on: active, off: !active}">
									<router-link class="navmob__submenu-item" tag="div" to="/profil" @click="close">Mon profil</router-link>
									<router-link class="navmob__submenu-item" tag="div" to="/products/MyProducts" @click="close">Mes annonces</router-link>
									<router-link class="navmob__submenu-item" tag="div" to="/messages" @click="close">Messages</router-link>
							</ul>
            </ul>
          </transition>
			</div>
		</section>
	</div>
</template>
<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

// import faDoorOpen from '@fortawesome/fontawesome-free-solid/faDoorOpen'



export default {
	name: "NavbarMob",
	components: {
	FontAwesomeIcon
	},
	data() {
		return {
			success: false,
			active: false
		}
	},
	methods: {
		close: function() {
			this.success = false;
		},
		open: function() {
			this.success = true;
		},
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
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/navbar-mob";
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

 .on {
 display:block;
 }

 .off {
	 display: none;
 }

</style>