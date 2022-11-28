<template>
    <q-card-section class="absolute-top text-h6 text-center">
      Поздравляем, Вы успешно вошли в свой аккаунт! Можете приступать к редактированию данных.
    </q-card-section>
    <q-card-section class="absolute-bottom-right">
      <q-btn @click="logOut" color="secondary" label="Выйти" />
    </q-card-section>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'LogOutComponent',
  methods: {
    logOut () {
      localStorage.setItem('AuthToken', "")
      this.$router.go(0) // Перезагрузка страницы
    }
  }

})
</script>
