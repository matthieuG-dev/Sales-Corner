<template>
	<div>
		<section class="auth">
			<div class="auth__desk-container">
 				<div class="auth__header">
          <h1 class="auth__title">Sales<br />Corner</h1>
      	</div>
			  <div class="auth__container">
				  <div class="auth__menu">
            <button class="auth__menu-item" :class="{display: selected === true }" @click.prevent="selected = true">Sign In</button>
            <button class="auth__menu-item" :class="{display: selected === false}" @click.prevent="selected = false">Sign Up</button>
        	</div>
					<div class="auth__block">
						<transition name="fade">
							<form class="auth__form" v-show="selected">
								<input class="auth__form-input" type="text" required placeholder="email" v-model="userLogin.username">
								<input class="auth__form-input" type="password" required placeholder="mot de passe" v-model="userLogin.password">
								<span class="auth__form-error-message">
									<p> {{ errorMessage}} </p>
								</span>
								<button class="auth__form-btn" @click="login">Se Connecter</button>
							</form>
						</transition>
						<transition name="fade">
							<form class="auth__form" v-show="!selected">
								<input class="auth__form-input" placeholder="email" v-model="userRegister.username">
								<input class="auth__form-input" placeholder="mot de passe" v-model="userRegister.password">
								<input class="auth__form-input" placeholder="confirmer mot de passe" v-model="confirmPassword">
								<span class="auth__form-error-message">
									<p> {{ errorPassword}} </p>
									<p> {{ errorMessage}} </p>
								</span>
								<button class="auth__form-btn" @click="register">Créer mon compte</button>
							</form>
						</transition>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>

<script>
import http from '@/http.js'

export default {
	
	name: "AuthSafe",
	data() {
		return {
			userLogin: {},
			userRegister: {},
			errorMessage: '',
			confirmPassword: '',
			errorPassword: '',
			selected: true
		}
	},
	methods: {
		login () {
			http.post('auth/login', this.userLogin).then((response)=> {
				sessionStorage.setItem('token', response.data.token) // store the token in localstorage      
				this.$router.push({path: 'products'})
			})
			.catch((error) => {
				//traitenement des erreurs
				this.errorMessage = error.response.data;
			})
		},
		register () {
      //password confirmation 
       if (!this.confirmPassword) {
        this.errorPassword = 'Confirmez votre mot de passe'
      } else if (this.userRegister.password != this.confirmPassword) {
				this.errorPassword = 'erreur de confirmation'
			} else if (this.userRegister.password === this.confirmPassword) {
				this.errorPassword = null
			} else {
				http.post('/auth/signup', this.userRegister).then((response) => {
					this.$router.push({path: '/'})
				}) 
				.catch((error) => {
					this.errorMessage = error.response.data;
				})
			}
    }
	},
	beforeCreate() {
    //sessionStorage empty fonction
		sessionStorage.clear();
	},
	beforeDestroy() {
    //refresh application fonction
		location.reload();
	}
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/auth";
</style>
