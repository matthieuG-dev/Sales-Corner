<template>
	<div>
		<transition name="fade">
			<form class="auth__form">
				<input class="auth__form-input" placeholder="email" v-model="userRegister.username">
				<input class="auth__form-input" type="password" placeholder="mot de passe" v-model="userRegister.password">
				<input class="auth__form-input" type="password" placeholder="confirmer mot de passe" v-model="confirmPassword">
				<span class="auth__form-error-message">
					<p> {{ errorPassword}} </p>
					<p> {{ errorMessage}} </p>
				</span>
				<button class="auth__form-btn" @click="register">Créer mon compte</button>
			</form>
		</transition>
	</div>
</template>

<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>

<script>
import http from '@/http.js'

export default {
	
	name: "Register",
	data() {
		return {
			userRegister: {},
			confirmPassword: '',
			errorMessage: "",
			errorPassword: '',
		}
	},
	methods: {
		register () {
      //password confirmation 
    //    if (!this.confirmPassword) {
    //     this.errorPassword = 'Confirmez votre mot de passe'
    //   } else if (this.userRegister.password != this.confirmPassword) {
	// 			this.errorPassword = 'erreur de confirmation'
	// 		} else if (this.userRegister.password === this.confirmPassword) {
	// 			this.errorPassword = null
	// 		} else {
				http.post('/auth/signup', this.userRegister).then((response) => {
					this.$router.push({path: '/'})
				}) 
				.catch((error) => {
					this.errorMessage = error.response.data;
				})
			}
    	// }
	},
	computed: {
	},
	beforeCreate() {
		sessionStorage.clear();
	}
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/auth";
</style>
