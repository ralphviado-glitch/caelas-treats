<template>
  <div class="container py-4">
    <h2 class="mb-4">Search Product</h2>

    <form @submit.prevent="searchProduct" class="mb-4" style="max-width: 500px">
      <div class="input-group">
        <input
          type="text"
          v-model="productName"
          class="form-control"
          placeholder="Enter product name"
          required
        />
        <button class="btn btn-primary" type="submit" :disabled="loading">
          {{ loading ? "Searching..." : "Search" }}
        </button>
      </div>
    </form>

    <div v-if="product.length">
      <h5>Results:</h5>
      <div class="row">
        <ProductComponent v-for="product in product" :key="product._id" :productData="product"/>
      </div>
    </div>

    <div v-else-if="!loading && hasSearched">
      <p class="text-muted">No product found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import ProductComponent from "./ProductComponent.vue";
import api from '../api'

const productName = ref('')
const product = ref([])
const loading = ref(false)
const hasSearched = ref(false)

const notyf = new Notyf()

const searchProduct = async () => {
  if (!productName.value.trim()) {
    notyf.error('Please enter a product name.')
    return
  }

  loading.value = true
  hasSearched.value = true

  try {
    const response = await api.post('/products/search-by-name', {
      name: productName.value.trim(),
    })
    
    product.value = response.data || []
    if (product.value.length) {
      notyf.success(`Found ${product.value.length} product(s).`)
    } else {
      notyf.error('No product found.')
    }
  } catch (error) {
    console.error(error)
    notyf.error('Something went wrong while searching.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Optional: Add some spacing to results */
.list-group-item + .list-group-item {
  margin-top: 0.5rem;
}
</style>
