import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Upload from '../views/Upload.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import Swap from '../views/Swap.vue'
import Download from '../views/Download.vue'

import auth from '../middleware/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/uploads',
    name: 'upload',
    component: Upload,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    props: route => ({ plan: route.query.plan }),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/swap',
    name: 'swap',
    component: Swap,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/download/:uuid',
    name: 'download-uuid',
    component: Download,
    props: route => ({ uuid: route.params.uuid, token: route.query.token })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware

  return middleware[0]({
    store: store,
    next: next
  })
})

export default router
