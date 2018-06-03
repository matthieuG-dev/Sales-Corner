<template>
  <div>
    <Navbar-desk />
    <Navbar-mob />

      <section class="profil">
        <div class="profil__header">
          <h2 class="profil__title">Mes informations personnelles</h2>
        </div>
        <div v-for="user in listUsers" :key="user.username">
          <form class="profil__container" v-show="user.username === currentUser">
            <label class="profil__label">Email :</label>
            <input type="text" disabled :placeholder="currentUser">

            <label class="profil__label" v-if="active">Mot de passe :</label>
            <label class="profil__label" v-if="!active">Nouveau mot de passe :</label>

            <div class="block">
            <input :type="type" v-if="active" :disabled="value" :value="password">
            
            <input :type="type" v-if="!active" :disabled="value" v-model="newPassword">
            <font-awesome-icon v-if="!active" class="profil__eye-icon" @click="test" :icon="eye" />
            </div>


            <label class="profil__label" v-if="!active">Confirmer votre mot de passe :</label>
            <input :type="type" v-if="!active" :disabled="value" :value="password" v-model="confirmPassword">
            
            <div class="profil__buttons">

              <button class="profil__btn-update" @click="swithDisabledValue" v-if="active" @click.prevent="active = false">Modifier votre mot de passe</button>
              <button @click="cancel" v-if="!active" @click.prevent="active = true">Annuler</button>
              <button @click="updatePassword" v-if="!active" @click.prevent="active = true">Enregistrer</button>

            </div>

          </form>
        </div> 
      </section>
  </div>
</template>

<script>
import http from '@/http';
import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'

export default {
  name: 'Profil',
  components: {
    NavbarDesk,
    NavbarMob,
    FontAwesomeIcon
  },
  data () {
    return {
      listUsers: '',
      currentUser: '',
      inputType: 'password',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      type: "password",
      value : true,
      active: true
    }
  },
  methods: {
    swithDisabledValue () {
      this.value = false
      this.newPassword = ""
      this.confirmPassword = ""
    },
    cancel () {
      this.value = true
      this.type="password"
    },
    test () {
      if (this.type === "password") {
        this.type = "text"
      } else {
        this.type = "password"
      }
    }
  },
  computed: {
    eye () {
			return faEye
    },

  },
  beforeCreate() {
    http.get('/users').then((response) => {
      this.listUsers = response.data.content;

    var token = this.$jwt.decode(sessionStorage.token)
    this.currentUser = token.username
    this.password = token.password
    this.newPassword = this.password
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/sass/partials/profil";
.block {
  display: flex;
  position: relative;
}

</style>