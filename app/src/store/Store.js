import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    products: null
}

export default new Vuex.Store({
    state
})