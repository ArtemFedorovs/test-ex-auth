<template>
  <q-card flat bordered class="my-card q-ma-md">
    <div v-if="isEditModeOn">
      <q-card-section class="bg-primary q-pa-none header-section">
        <div v-if="userData.role" class="text-h5 inline q-ma-sm">{{header}}</div>
        <q-input v-else :dense="true" class="inline q-pa-xs q-ml-sm q-my-auto header-section text-h5" v-model="header"/>
        <q-btn class="q-ma-xs float-right" color="secondary" label="Назад" @click="editModToogle"/>
        <q-btn class="q-ma-xs float-right" color="secondary" label="Сохранить" @click="saveEditNote"/>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-pa-none"  >
        <q-input class="q-ml-sm q-mb-sm" v-model="body" />
      </q-card-section>
    </div>
    <div v-else>
      <q-card-section class="bg-primary q-pa-none header-section">
        <span class="inline text-h5 q-ma-sm">{{header}} </span>
        <q-btn class="q-ma-xs float-right" v-if="!userData.role" color="secondary" label="Удалить" @click="deleteNote"/>
        <q-btn class="q-ma-xs float-right" color="secondary" label="Редактировать" @click="editModToogle"/>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-pa-sm body-section">
        <div >{{body}}</div>
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
      this.$axios.delete('http://localhost:3000/user-data/' + this.userData._id)
        .then((res) => { this.$emit("deleteOnClientSide", this.userData._id) }) // Передаем родителю id удаленного элеменда
        .catch((err) => { console.log(err) })
    },

    async saveEditNote () { // Сохраняем внесённые в запись изменения на бекенд
      const data = { header: this.header, body: this.body, role: this.userData.role }
      await this.$axios.patch(
        "http://localhost:3000/user-data/" + this.userData._id,
        data
      )
        .then((res) => {
          this.isEditModeOn = !this.isEditModeOn // Выходим из режима редактирования
          this.$emit("editOnClientSide", res.data) // Сигнализируем родительскому компоненту о необходимости внести изменения в ui согласно ответу с сервера
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

<style>
  .header-section{
    height: 48px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .body-section{
    min-height: 64px;
  }
</style>
