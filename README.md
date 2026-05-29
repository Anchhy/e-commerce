# Vue + Hasura GraphQL Todo

A full-stack todo application built with **Vue 3**, **Hasura GraphQL**, **Apollo Client**, and **Pinia** state management with real-time subscription support.

## Features

✅ **List todos** — Display all todos from Hasura database  
✅ **Add todo** — Create new todos with mutations  
✅ **Toggle done** — Mark todos as complete/incomplete  
✅ **Delete todo** — Remove todos from database  
✅ **Real-time updates** — WebSocket subscription for live data sync  
✅ **Type-safe** — Full TypeScript support  
✅ **State management** — Pinia store for centralized state  
✅ **GraphQL integration** — Apollo Client with HTTP + WebSocket links

## Project Setup

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment Variables

Create `.env` file in the project root:

```dotenv
VITE_HASURA_HTTP=https://<your-project>.hasura.app/v1/graphql
VITE_HASURA_WS=wss://<your-project>.hasura.app/v1/graphql
VITE_HASURA_ROLE=anonymous
VITE_HASURA_ADMIN_SECRET=<your-admin-secret>
```

Get these values from:

- **Hasura Cloud Console** → Settings → API Keys
- **Neon Database** → Connection string

### 3. Database Setup

In Hasura Console:

1. Go to **Data** → **Create Table**
2. Create table `todos` with columns:
   - `id` (uuid, default: `gen_random_uuid()`, PK)
   - `title` (text, NOT NULL)
   - `is_done` (boolean, default: false)
   - `created_at` (timestamptz, default: `now()`)

3. Set permissions for `anonymous` role:
   - **SELECT**: All rows
   - **INSERT**: Columns `title`, `is_done`
   - **UPDATE**: Columns `tit
   le`, `is_done`
   - **DELETE**: All rows (optional)

## Development

### Run Development Server

```sh
npm run dev
```

Opens at `http://localhost:5173/`

### Run Type Checking

```sh
npm run type-check
```

### Build for Production

```sh
npm run build
```

### Lint & Format

```sh
npm run lint
```

## Project Structure

```
src/
├── apollo/
│   └── client.ts         # Apollo Client setup (HTTP + WebSocket)
├── graphql/
│   └── todos.ts          # GraphQL queries, mutations, subscriptions
├── stores/
│   └── todo.store.ts     # Pinia store (fetchTodos, addTodo, etc.)
├── App.vue               # Main component (UI wiring)
├── main.ts               # Vue app initialization
└── assets/
    └── main.css          # Styles
```

## How It Works

### Apollo Client Setup

- **HTTP Link**: Handles queries & mutations
- **WebSocket Link**: Handles subscriptions in real-time
- **Split Logic**: Routes operations to correct link

### Pinia Store

Centralized state management for todos:

- `fetchTodos()` — Fetch all todos from Hasura
- `addTodo(title)` — Insert new todo
- `toggleTodo(todo)` — Update `is_done` status
- `deleteTodo(id)` — Delete todo
- `startRealtime()` — Subscribe to live updates

### Vue Component

`App.vue` wires the store to UI:

- v-for loop displays todos
- Checkbox calls `toggleTodo()`
- Delete button calls `deleteTodo()`
- Form calls `addTodo()`

## Technology Stack

| Tech              | Purpose                 |
| ----------------- | ----------------------- |
| **Vue 3**         | Frontend framework      |
| **Vite**          | Build tool & dev server |
| **TypeScript**    | Type safety             |
| **Apollo Client** | GraphQL client          |
| **graphql-ws**    | WebSocket subscriptions |
| **Pinia**         | State management        |
| **Hasura**        | GraphQL backend         |
| **Neon**          | Postgres database       |

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue.js DevTools browser extension](https://devtools.vuejs.org/guide/installation.html)

## Troubleshooting

| Issue                       | Solution                                              |
| --------------------------- | ----------------------------------------------------- |
| `Client not found` error    | Ensure `ApolloClient` is provided in `main.ts`        |
| GraphQL queries not working | Check `.env` URLs match Hasura project                |
| WebSocket connection fails  | Verify `VITE_HASURA_WS` uses `wss://` protocol        |
| Empty todo list             | Check Hasura permissions for `anonymous` role         |
| Real-time not updating      | Ensure subscription logic is started in `onMounted()` |

## Key Concepts

### Permissions

This app uses the `anonymous` role for classroom demos. In production:

- Use authentication (JWT tokens)
- Implement user-based row-level security (RLS)
- Never expose admin secrets in frontend code

### Fetching Strategy

After mutations, the app calls `fetchTodos()` to refresh. For optimization:

- Update Apollo cache manually instead of refetching
- Use optimistic UI updates

### Subscriptions (Optional)

Real-time updates are enabled by default:

- `startRealtime()` establishes WebSocket connection
- Unsubscribed on component unmount
- Errors logged but don't crash the app

## Extensions & Challenges

### Filtering

- Pinia computed: `activeTodos`, `doneTodos`
- UI tabs: All / Active / Done

### Apollo Cache Optimization

- Manual cache updates instead of `fetchTodos()`
- Reduce network requests

### Multiple Roles

- Add student/teacher roles in Hasura
- Switch roles dynamically or per deployment

## Links

- [Hasura Docs](https://hasura.io/docs/)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vite Docs](https://vite.dev/)
