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
                <option value="maçonnerie">Maçonnerie</option>
                <option value="jardinerie">Jardinerie</option>
            </select>
            <label class="create__label">Décrivez votre produit :</label>
            <textarea name="" id="" cols="30" rows="10" class="create__desc" v-model="newProduct.description"></textarea>
            <label class="create__label">Prix :</label>
            <div class="create__price">
                <input class="create__price-input" type="text" v-model="newProduct.price">
            </div>
            <input type="file" name="photo">
            <p class="create__errormessage"> {{ errorMessage }}</p>
            <button class="create__btn" type="text" @click="createProduct()">Valider</button>
        </div>

    </form>

</div>
</template>

<script>
import http from '@/http';
import NavbarDesk from '../navbars/NavbarDesk'
import NavbarMob from '../navbars/NavbarMob'
export default {
    name: "NewProduct",
    components: {
        NavbarDesk,
        NavbarMob
        
    },
    data() {
        return {
            newProduct: {
                title: '',
                category: '',
                description:'',
                price: ''
            },
            errorMessage: ''
        }
    },
    methods: {
       createProduct() {
           http.post('/products', this.newProduct).then((res) => {
               console.log(res.data.content)
           }).catch((err) => {
                this.errorMessage = err.response.data
            })
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