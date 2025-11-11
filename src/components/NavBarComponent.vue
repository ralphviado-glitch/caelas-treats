<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">
      <router-link :to="{name: 'Home'}" class="navbar-brand">ECommerce</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" :to="{ name: 'Products'}" v-if="user.token">
            Products
          </router-link>
           <router-link class="nav-link" :to="{ name: 'Register'}" v-if="!user.token">Register</router-link>
          <router-link class="nav-link" :to="{ name: 'Login'}" v-if="!user.token">Login</router-link>
          <router-link class="nav-link" :to="{ name: 'Logout'}" v-else>Logout</router-link>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>


import {onBeforeMount, ref} from 'vue';
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../stores/global.js'

const globalStore = useGlobalStore()
const { user } = storeToRefs(globalStore);
const email = ref("");




</script>
