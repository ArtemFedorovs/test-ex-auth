<template>
  <q-page class="row items-center justify-evenly container">
    <div id="q-app" style="min-height: 100vh;">
        <NoteComponent v-for="item in userData"
          :key="item._id" :userData="item"
          @deleteOnClientSide = "deleteOnClientSide"
          @editOnClientSide = "editOnClientSide">
        </NoteComponent>
        <q-card flat bordered class="my-card q-ma-md">
          <q-card-section class="bg-primary relative-position">
            <q-input v-model="dataHeader" label="Заголовок" />
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pt-none">
            <q-input v-model="dataBody" label="Новая запись"/>
          </q-card-section>
          <q-card-section class="q-pt-none text-right">
            <q-btn color="secondary" class="q-ma-sd" label="Создать запись" @click="newData"/>
          </q-card-section>
        </q-card>
    </div>
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
  data (): {dataHeader: Ref<string>, dataBody: Ref<string>, userData: userDataType } {
    return {
      userData: [],
      dataHeader: ref(''),
      dataBody: ref('')
    }
  },

  methods: {
    async newData () {
      const data = { header: this.dataHeader, body: this.dataBody }
      await this.$axios.put(
        "http://localhost:3000/user-data",
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
    this.$axios.get("http://localhost:3000/user-data", { headers: { authorization: localStorage.getItem('AuthToken') } })
      .then((res) => {
        this.userData = res.data
        this.userData.find(element => element.role === "email") || this.userData.push({ // Добавление в ui минимально необходимых полей, если их нет
          header: "Электронная почта",
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
          header: "Информация о себе",
          body: "",
          role: "info"
        })
      })
      .catch((err) => { console.log(err) })
  }
})
</script>
