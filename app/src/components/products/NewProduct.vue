<template>
<div>
    <Navbar-desk />
    <Navbar-mob />
    <form class="create">
        <header class="create__header">
            <h1 class="create__header-title">Vendez votre produit</h1>
        </header>
        <div class="create__container">
            <h2 class="create__container-title">Votre produit</h2>
            <label class="create__label">titre :</label>
            <input class="create__title" type="text" v-model="newProduct.title">
            <label class="create__label">categories :</label>
            <select class="create__categories" name="text" v-model="newProduct.category" placeholder="Sélectionner la catégorie"> 
                <option value="" disabled selected>Sélectionner la catégorie</option>
                <option value="menuiserie">Menuiserie</option>
                <option value="plomberie">Plomberie</option>
                <option value="maconnerie">Maçonnerie</option>
                <option value="jardinerie">Jardinerie</option>
            </select>
            <label class="create__label">Décrivez votre produit :</label>
            <textarea class="create__desc" cols="40" rows="10" v-model="newProduct.description"></textarea>
            <label class="create__label">Prix :</label>
            <div class="create__price">
                <input class="create__price-input" type="text" v-model="newProduct.price">
            </div>
            <!-- <input class="" type="file" name="photo"> -->
            <p class="create__errormessage"> {{ errorMessage }}</p>
            <button class="create__btn" type="text" @click="createProduct()" box-action="redirect()">Valider</button>
            
        </div>
        <button @click="open">
            <sweet-modal icon="success" ref="modal" id="tab1">
	            This is a success!
            </sweet-modal>
        </button>

    </form>

</div>
</template>

<script>
import http from '@/http';
import NavbarDesk from '../navbars/NavbarDesk'
import NavbarMob from '../navbars/NavbarMob'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
    name: "NewProduct",
    components: {
        NavbarDesk,
        NavbarMob,
        SweetModal,
        SweetModalTab,
    },
    data() {
        return {
            newProduct: {},
            errorMessage: ''
        }
    },
    methods: {
       createProduct() {
           http.post('/products', this.newProduct).then((res) => {
                this.$refs.modal.open() 
           }).catch((err) => {
                this.errorMessage = err.response.data
            })
        },
        redirect () {
            this.$router.push({path: 'products'})
        },
        open () {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/sass/partials/products/new-product";

.titre {
    color: red;
}

</style>