<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
import { useGlobalStore } from './stores/global.js'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const store = useGlobalStore()
const router = useRouter()

onBeforeMount(async () => {
  const token = localStorage.getItem('token')
  console.log('[App] starting getUserDetails, token:', token)
  await store.getUserDetails(token)


  console.log('[App] after getUserDetails -> store.user:', JSON.parse(localStorage.getItem('user') || 'null'), store.user)

  const current = router.currentRoute.value.path
  const publicPages = ['/', '/login', '/register']


  if (store.user?.token && publicPages.includes(current)) {
    console.log('[App] redirecting to /products. isAdmin=', store.user.isAdmin)
    router.push('/products')
  }
})
</script>

<template>
  <NavbarComponent />
  <router-view />
</template>

