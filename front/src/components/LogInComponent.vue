<template>
    <q-card-section class="absolute-top text-h6 text-center text-weight-bold text-secondary">
      Зарегистрируйтесь или войдите в систему.
    </q-card-section>
    <q-card-section class="inputs absolute-center text-h5">
      <q-input class="q-ma-sm" v-model="emailValue" label="E-mail" />
      <q-input class="q-ma-sm" v-model="passwordValue" label="Password" />
    </q-card-section>
    <q-card-section class="absolute-bottom">
      <q-btn class="q-ma-sm float-left" color="secondary" label="Зарегистрировать нового пользователя" @click="register"/>
      <q-btn class="q-ma-sm float-right" color="secondary" label="Войти" @click="login"/>
    </q-card-section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref
} from 'vue'

export default defineComponent({
  name: 'LogInComponent',
  data (): {emailValue: Ref<string>, passwordValue: Ref<string>, auth: string} {
    return {
      auth: '',
      emailValue: ref(''),
      passwordValue: ref('')
    }
  },
  methods: {
    register () {
      this.$axios.post('http://localhost:3000/register', { email: this.emailValue, password: this.passwordValue })
        .then((res) => {
          localStorage.setItem('AuthToken', res.data)
          this.$router.push('/about-me')
        })
        .catch((err) => { if (err.response.status === 400) { alert("Такой пользователь уже есть") } })
    },

    login () {
      this.$axios.post('http://localhost:3000/login', { email: this.emailValue, password: this.passwordValue })
        .then((res) => {
          localStorage.setItem('AuthToken', res.data)
          this.$router.push('/about-me')
        })
        .catch((err) => { if (err.response.status === 400) { alert("Неверные логин и/или пароль") } })
    }
  }

})
</script>

<style>
  .inputs {
    width: 80%;
  }
</style>
