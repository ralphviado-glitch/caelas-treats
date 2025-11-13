<!-- <script setup>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/global.js'
import ProductsPage from './ProductsPage.vue'
import AdminDashboard from './AdminDashboard.vue'

const store = useGlobalStore()

const currentComponent = computed(() => {
  if (user.isLoading) return null // still loading
  return user.isAdmin ? AdminDashboard : ProductsPage
})
</script>

<template>
  <div v-if="store.user.isLoading" class="text-center p-5">Loading user info...</div>
  <component v-else :is="currentComponent" />
</template>
 -->

<!-- <script setup>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/global.js'
import ProductsPage from './ProductsPage.vue'
import AdminDashboard from './AdminDashboard.vue'

const store = useGlobalStore()        
const user = store.user               


const currentComponent = computed(() => {
  if (user.isLoading) return null // still loading
  return user.isAdmin ? AdminDashboard : ProductsPage
})
</script> -->

<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/global.js'
import ProductsPage from './ProductsPage.vue'
import AdminDashboard from './AdminDashboard.vue'

const store = useGlobalStore()
const user = store.user   // THIS is a reactive object (not a ref)

const currentComponent = computed(() => {
  if (user.isLoading) return null
  return user.isAdmin ? AdminDashboard : ProductsPage
})
</script>

<template>
  <div v-if="user.isLoading" class="text-center p-5">
    Loading user info...
  </div>
  <component v-else :is="currentComponent" />
</template>

