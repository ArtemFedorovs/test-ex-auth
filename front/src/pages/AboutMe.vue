<template>
  <q-page class="row items-center justify-evenly container">
    <div v-if="auth" id="q-app" style="min-height: 100vh;">
        <NoteComponent v-for="item in userData"
          :key="item._id" :userData="item"
          @deleteOnClientSide = "deleteOnClientSide"
          @editOnClientSide = "editOnClientSide">
        </NoteComponent>
        <q-card flat bordered class="my-card q-ma-md">
          <q-card-section class="bg-primary relative-position q-pa-xs">
            <q-input class="q-ml-sm inline" :dense="true" v-model="dataHeader" label="Заголовок" />
            <q-btn color="secondary" class="q-ma-none q-ma-xs float-right" label="Создать запись" @click="newData"/>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-none">
            <q-input class="q-ml-sm q-mb-sm" v-model="dataBody" label="Новая запись"/>
          </q-card-section>
        </q-card>
    </div>
    <q-card v-else rounded class="my-card relative-position log-in-container bg-primary">
      <q-card-section class="absolute-top text-h6 text-center">
        Для начала работы авторизуйтесь!
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import NoteComponent from 'src/components/NoteComponent.vue'
type userDataType = {_id?: string,
header: string,
body: string,
role?: string,
user?: string,
createdAt?: string,
updatedAt?: string,
__v?: number}[] | any[]

export default defineComponent({
  name: 'IndexPage',
  components: { NoteComponent },
  data (): {dataHeader: Ref<string>, dataBody: Ref<string>, userData: userDataType, auth: string } {
    return {
      userData: [],
      dataHeader: ref(''),
      dataBody: ref(''),
      auth: ""
    }
  },

  methods: {
    async newData () { // Создание новой строки данных
      const data = { header: this.dataHeader, body: this.dataBody }
      await this.$axios.put(
        "/user-data",
        data,
        { headers: { authorization: localStorage.getItem('AuthToken') } }
      )
        .then((res) => { // Вносим новую запись в ui и сбрасываем поля для заполнения новой записи
          this.userData.push(res.data)
          this.dataHeader = ""
          this.dataBody = ""
        })
        .catch((err) => { console.log(err) })
    },

    deleteOnClientSide (id: string) { // После внесения изменений на backend (удаление записи) данная функция вызывается из дочернего компонента и актуализирует информацию в ui
      this.userData.splice(this.userData.findIndex((element) => { return element._id === id }), 1)
    },

    editOnClientSide (editedUserData: any) { // После внесения изменений на backend (редактирование записи) данная функция вызывается из дочернего компонента и актуализирует информацию в ui
      let indexOfNote = this.userData.findIndex((element) => { return element._id === editedUserData._id }) // ищем по id
      if (indexOfNote === -1) { // Если мы не находим данную запись по id, то значит это впервые введенное значение минимально необходимых полей
        indexOfNote = this.userData.findIndex((element) => { return element.role === editedUserData.role }) // ищем по роли
      }
      this.userData.splice(indexOfNote, 1, editedUserData) // Подставляем полученное из backend значение
    }

  },

  created () {
    this.$axios.interceptors.response.use( // Сценарий истечения токена. Выходим из учетной записи чтобы пользователь вновь ввел логин/пароль
      (response) => response,
      async (err) => {
        if (err?.response?.status === 403) {
          localStorage.setItem('AuthToken', "")
          this.$router.go(0) // Перезагрузка страницы
        }
        return err
      }
    )
    this.auth = localStorage.getItem('AuthToken') || "" // проверка авторизации
    this.$axios.get("/user-data")
      .then((res) => {
        this.userData = res.data
        this.userData.find(element => element.role === "email") || this.userData.push({ // Добавление в ui минимально необходимых полей, если их нет
          header: "E-mail",
          body: "",
          role: "email"
        })
        this.userData.find(element => element.role === "tel") || this.userData.push({
          header: "Телефон",
          body: "",
          role: "tel"
        })
        this.userData.find(element => element.role === "address") || this.userData.push({
          header: "Адрес",
          body: "",
          role: "address"
        })
        this.userData.find(element => element.role === "info") || this.userData.push({
          header: "О себе",
          body: "",
          role: "info"
        })
      })
      .catch((err) => { console.log(err) })
  }
})
</script>
