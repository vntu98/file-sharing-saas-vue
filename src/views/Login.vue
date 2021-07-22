<template>
  <div>
    <form action="" @submit.prevent="login">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),

    login() {
      this.loginAction({ email: 'vntu98@gmail.com', password: 'password'})
    }
  },
}
</script>
