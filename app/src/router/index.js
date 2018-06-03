import Vue from 'vue'
import Router from 'vue-router'

//import des components
import Auth from '@/components/auth/Auth'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'


import Profil from '@/components/Profil'
import Home from '@/components/Home'

import Messages from '@/components/Messages'
import NewMessage from '@/components/messages/NewMessage'
import NewMessageRespond from '@/components/messages/NewMessageRespond'

import ListMessages from '@/components/messages/ListMessages'
import ReadMessages from '@/components/messages/ReadMessages'
import CurrentMessage from '@/components/messages/CurrentMessage'

import Products from '@/components/Products'
import ListProducts from '@/components/products/ListProducts'
import NewProduct from '@/components/products/NewProduct'
import CurrentProduct from '@/components/products/CurrentProduct'
import MyProducts from '@/components/products/MyProducts'

Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path:'/',
      name: 'Auth',
      component: Auth
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    }, 
    {
      path:'/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profil',
      name: 'Profil',
      component: Profil
    },
    //modules messages components routes
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      children: [
        {
          path:'/messages',
          name: 'ListMessages',
          component: ListMessages
        },
        {
          path:'/messages/new',
          name: 'NewMessage',
          component: NewMessage
        },
        {
          path:'/messages/new/:userId',
          name: 'NewMessageRespond',
          component: NewMessageRespond,
        },
        {
          path:'/messages/:messageId',
          name: 'CurrentMessage',
          component: CurrentMessage
        }
      ]
    },
        //modules products components routes

    {
      path: '/products',
      name: 'Products',
      component: Products,
      children: [
        {
          path: '/products/myProducts',
          name: "MyProducts",
          component: MyProducts,
        },
        {
          path: '/products',
          name: 'ListProducts',
          component: ListProducts,
        }
      ]
    },
    {
      path: '/product/:productId',
      name: 'CurrentProduct',
      component: CurrentProduct
    },
    {
      path: '/products/newProduct',
      name: 'NewProduct',
      component: NewProduct
    }
  ]
})
