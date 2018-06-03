<template>
	<div>
		<transition name="fade">
			<form class="auth__form">
				<input class="auth__form-input" type="text" required placeholder="email" v-model="user.username">
				<input class="auth__form-input" type="password" required placeholder="mot de passe" v-model="user.password">
				<span class="auth__form-error-message">
					<p> {{ errorMessage}} </p>
				</span>
				<button class="auth__form-btn" @click="login">Se Connecter</button>
			</form>
		</transition>
	</div>
</template>

<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>

<script>
import http from '@/http.js'

export default {
	
	name: "Login",
	data() {
		return {
			user: {},
			errorMessage: "",
			errorPassword: '',
		}
	},
	methods: {
		login() {
			http.post('auth/login', this.user).then((response)=> {
				sessionStorage.setItem('token', response.data.token) // store the token in localstorage      
				this.$router.push({path: 'products'})
			})
			.catch((error) => {
				//traitenement des erreurs
				this.errorMessage = error.response.data;
			})
		}
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
