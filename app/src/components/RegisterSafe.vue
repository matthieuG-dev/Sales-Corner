<template>
<div class="main">
    <div class="header">
        <div class="header__first"></div>
        <div class="header__second"></div>
    </div>
    <div class="register">
        <div class="register__container">
            <div class="register__content">
              <div class="register__link">
                  <router-link tag="div" to="/">
                        <a class="register__link-login" href="#">login</a>
                  </router-link>
            </div>
            <h2 class="register__title">Register</h2>
            
            <form class="register__form">
                <input class="register__username" placeholder="username" v-model="user.username">
                <input class="register__firstname" placeholder="firstname" v-model="user.firstname">
                <input class="register__lastname" placeholder="lastname" v-model="user.lastname">
                <input class="register__password" placeholder="password" type="password" v-model="user.password">

                <button class="register__btn" v-on:click="signup()">
                    <i class="fas fa-long-arrow-alt-right"></i>
                </button>
            </form>
            <div class="register__error-message">{{ errorMessage }}</div>
        </div>
    </div>
  </div>
  <div class="third"></div>
      <div class="fourth"></div>
  </div>
  </template>

<script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
<script>
import http from '@/http.js'

export default {
    
    name: 'RegisterSafe',
    data() {
        return {
            user: {
                username: "",
                password: "",
                firstname: "",
                lastname: ""
            },
            errorMessage: "",
        }
    },
    methods: {
        signup() {
            http.post('/auth/signup', this.user).then((response) => {
                this.$router.push({path: '/'})
            }) 
            .catch((error) => {
                this.errorMessage = error.response.data;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/sass/partials/register';


</style>