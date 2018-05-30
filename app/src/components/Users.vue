<template>
  <div>
    <Navbar-desk />
    <Navbar-mob />

      <section class="users">
        <div class="users__container">
          <ul class="users__list">
            <div v-for="user in listUsers" :key="user.username">
              <div class="users__cards">
                <div class="users__cards-header">
                  <h2 class="users__cards-name">
                    {{ user.firstname }} {{ user.lastname }}
                  </h2>
                  <h3 class="users__cards-mail">
                  {{ user.username}}
                  </h3>
                </div>
                <div class="users__cards-footer">
                    
                </div>
              </div>
            </div>
          </ul>
        </div> 
      </section>
  </div>
</template>

<script>
import http from '@/http';
import NavbarDesk from './navbars/NavbarDesk'
import NavbarMob from './navbars/NavbarMob'

export default {
  name: 'Users',
  components: {
    NavbarDesk,
    NavbarMob
  },
  data () {
    return {
      listUsers: ''
    }
  },
  beforeCreate() {
    http.get('/users').then((response) => {
      this.listUsers = response.data.content;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/sass/partials/users";
</style>