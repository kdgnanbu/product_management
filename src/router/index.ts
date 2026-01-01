import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import New from '@/views/new.vue'
import LoginComplete from '@/views/loginComplete.vue'
import Category from '@/views/categoryCreate.vue'
import Product from '@/views/productCreate.vue'
import Pass from '@/views/pass.vue'
import UserList from '@/views/userList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
     { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/new', component: New },
    { path: '/login-complete',component: LoginComplete},
    { path: '/category', component: Category },
    { path: '/product',component: Product},
    { path: '/pass',component: Pass},
    { path: '/user-list',component: UserList},
  ]
})

export default router
