<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from './stores/todo.store'

const store = useTodoStore()

const title = ref('')

let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await store.fetchTodos()

  stopRealtime = store.startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

async function addTodo() {
  await store.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="container">
    <h1>Vue + Hasura Todo</h1>

    <div class="add-box">
      <input
        v-model="title"
        placeholder="Enter todo"
        @keyup.enter="addTodo"
      />

      <button @click="addTodo">
        Add
      </button>
    </div>

    <p v-if="store.loading">
      Loading...
    </p>

    <p v-if="store.error">
      {{ store.error }}
    </p>

    <ul>
      <li
        v-for="todo in store.todos"
        :key="todo.id"
      >
        <label>
          <input
            type="checkbox"
            :checked="todo.is_done"
            @change="store.toggleTodo(todo)"
          />

          <span :class="{ done: todo.is_done }">
            {{ todo.title }}
          </span>
        </label>

        <button @click="store.deleteTodo(todo.id)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  flex: 1;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
