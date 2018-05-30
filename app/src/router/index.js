import Vue from 'vue'
import Router from 'vue-router'

//import des components
import Auth from '@/components/auth/Auth'

import Users from '@/components/Users'
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





// import Navigation from '@/components/Navigation'

Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path:'/',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
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
    {
      path: '/products',
      name: 'Products',
      component: Products,
      children: [
        {
          path: '/products',
          name: 'ListProducts',
          component: ListProducts
        },
        {
          path: '/products/myProducts',
          name: "MyProducts",
          component: MyProducts
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
