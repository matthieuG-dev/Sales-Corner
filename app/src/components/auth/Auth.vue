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
          <div>
            <div class="auth__block">
            <!-- display login component -->
              <login v-if="selected == true"/>
              <!-- display register component -->
              <register v-if="selected == false" />
            </div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>

<script>
import http from '@/http.js'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'


export default {
	
  name: "Auth",
  components: {
    Login,
    Register
  },
	data() {
		return {
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
