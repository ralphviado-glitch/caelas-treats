<template>
  <div class="container py-5">
    <h1 class="text-center text-primary mb-4">Admin Dashboard</h1>

    <!-- Create Product Button -->
    <div class="text-end mb-3">
      <button class="btn btn-primary" @click="openCreateModal">+ Add New Product</button>
    </div>

    <!-- Product Table -->
    <ProductTableComponent
      :products="products"
      @refresh="fetchProducts"
    />

    <!-- Create Modal -->
    <ProductFormComponent
      v-if="showCreateModal"
      @close="closeCreateModal"
      @created="handleProductCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import ProductTableComponent from "../components/ProductTableComponent.vue";
import ProductFormComponent from "../components/ProductFormComponent.vue";

const products = ref([]);
const showCreateModal = ref(false);

async function fetchProducts() {
  try {
    const { data } = await api.get("/products/all");
    products.value = data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

function openCreateModal() {
  showCreateModal.value = true;
}

function closeCreateModal() {
  showCreateModal.value = false;
}

function handleProductCreated(newProduct) {
  products.value.push(newProduct);
  closeCreateModal();
}

onMounted(fetchProducts);
</script>
