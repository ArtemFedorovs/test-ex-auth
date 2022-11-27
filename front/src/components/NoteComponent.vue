<template>
  <q-card flat bordered class="my-card q-ma-md">
    <div v-if="isEditModeOn">
      <q-card-section class="bg-primary">
        <div v-if="userData.role" class="text-h6">{{header}}</div>
        <div v-else class="text-h6">
          <q-input v-model="header"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-pt-none">
        <q-input v-model="body" />
      </q-card-section>
      <q-card-section class="text-right">
        <q-btn  color="secondary" label="Сохранить" @click="saveEditNote"/>
        <q-btn color="secondary" label="Назад" @click="editModToogle"/>
      </q-card-section>
    </div>
    <div v-else>
      <q-card-section class="bg-primary">
        <div class="text-h6">{{header}} </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div>{{body}}</div>
      </q-card-section>
      <q-card-section class="text-right">
        <q-btn  color="secondary" label="Редактировать" @click="editModToogle"/>
        <q-btn v-if="!userData.role" color="secondary" label="Удалить" @click="deleteNote"/>
      </q-card-section>
    </div>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'NoteComponent',
  props: ["userData"],

  data (): {header: string, body: string, isEditModeOn: boolean, backup: {header: string, body: string}} {
    return {
      header: this.userData.header,
      body: this.userData.body,
      isEditModeOn: false,
      backup: { header: "", body: "" }
    }
  },
  methods: {
    deleteNote () {
      this.$axios.delete(
        'http://localhost:3000/user-data/' + this.userData._id,
        { headers: { authorization: localStorage.getItem('AuthToken') } }
      )
        .then((res) => { this.$emit("deleteOnClientSide", this.userData._id) }) // Передаем родителю id удаленного элеменда
        .catch((err) => { console.log(err) })
    },

    async saveEditNote () {
      const data = { header: this.header, body: this.body, role: this.userData.role }
      await this.$axios.patch(
        "http://localhost:3000/user-data/" + this.userData._id,
        data,
        { headers: { authorization: localStorage.getItem('AuthToken') } }
      )
        .then((res) => {
          this.isEditModeOn = !this.isEditModeOn
          this.$emit("editOnClientSide", res.data)
        })
        .catch((err) => { console.log(err) })
    },

    editModToogle () { // Включение/выключение редактирования записи
      if (!this.isEditModeOn) {
        this.backup = { header: this.header, body: this.body } // Сохраняем значение полей перед их редактированием
      } else {
        this.header = this.backup.header // Восстанавливем значение полей в случае отмены редактирование
        this.body = this.backup.body
      }
      this.isEditModeOn = !this.isEditModeOn
    }

  }

})
</script>
