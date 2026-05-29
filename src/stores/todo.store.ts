import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from '../apollo/client'

import {
  GET_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  TODOS_SUB,
} from '../graphql/todos'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos() {
    loading.value = true
    error.value = null

    try {
      const { data } = await apolloClient.query({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      })

      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    if (!title.trim()) return

    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: {
        title,
      },
    })

    await fetchTodos()
  }

  async function toggleTodo(todo: Todo) {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: {
        id: todo.id,
        done: !todo.is_done,
      },
    })

    await fetchTodos()
  }

  async function deleteTodo(id: string) {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: {
        id,
      },
    })

    await fetchTodos()
  }

  function startRealtime() {
    const observable = apolloClient.subscribe({
      query: TODOS_SUB,
    })

    const subscription = observable.subscribe({
      next({ data }) {
        if (data?.todos) {
          todos.value = data.todos
        }
      },

      error(error) {
        console.error(error)
      },
    })

    return () => subscription.unsubscribe()
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})
