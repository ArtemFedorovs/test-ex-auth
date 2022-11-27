<template>
  <q-page class="row items-center justify-evenly">
    <q-card rounded class="my-card relative-position log-in-container bg-primary">
      <log-in-component v-if="!auth" title="Log In Component" active></log-in-component>
      <log-out-component v-else title="Log Out Component" active></log-out-component>
    </q-card>
  </q-page>
</template>

<script lang="ts">

import LogInComponent from 'components/LogInComponent.vue'
import LogOutComponent from 'components/LogOutComponent.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { LogInComponent, LogOutComponent },
  data (): {auth: string } {
    return {
      auth: ""
    }
  },

  created () {
    this.auth = localStorage.getItem('AuthToken') || ""
  }
})
</script>
