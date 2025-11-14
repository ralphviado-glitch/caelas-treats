<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">ECommerce</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">

           <router-link class="nav-link" :to="{ name: 'Products' }" v-if="isLoggedIn">
            {{ isAdmin ? 'Admin Dashboard' : 'Products' }}
          </router-link>
          <router-link class="nav-link" :to="{ name: 'CartView' }"
                       v-if="isLoggedIn">
            Cart View
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Register' }"
                       v-if="!isLoggedIn">
            Register
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Login' }"
                       v-if="!isLoggedIn">
            Login
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Logout' }"
                       v-if="isLoggedIn">
            Logout
          </router-link>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '../stores/global.js'

const store = useGlobalStore()
const isLoggedIn = computed(() => store.user?.token)
const isAdmin = computed(() => store.user?.isAdmin)
</script>
