<template>
  <q-layout view="lHh Lpr lFf">
    <q-header items-center class="shadow-4">
      <q-toolbar class="container q-px-md">
        <q-toolbar-title>
          <router-link to="/" class="float-left">Авторизация</router-link>
        </q-toolbar-title>
        <q-toolbar-title>
          <router-link to="/about-me" class="float-right">Данные о пользователе</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>
