import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import New from '@/views/new.vue'
import Category from '@/views/categoryCreate.vue'
import Product from '@/views/productCreate.vue'
import Pass from '@/views/pass.vue'
import UserList from '@/views/userList.vue'
import Layout from '@/views/Layout.vue'

const router = createRouter({
  history: createWebHistory('/product_management/'),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/new', component: New },
    {
      path: '/LoginComplete',
      component: Layout,
      children: [
        { path: 'category', component: Category },
        { path: 'product', component: Product },
        { path: 'user-list', component: UserList },
        { path: 'pass', component: Pass },
        { path: '', redirect: 'category' }
      ]
    }
  ]
})

export default router