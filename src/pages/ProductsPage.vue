<script setup>
import { ref, onBeforeMount } from "vue";
import ProductComponent from "../components/ProductComponent.vue";
import ProductSearch from "../components/ProductSearchComponent.vue";
import api from "../api";

const products = ref([]);

onBeforeMount(async () => {
  try {
    const { data } = await api.get("/products/active");
    products.value = data;
  } catch (error) {
    console.error("Error loading products:", error);
  }
});

function handleProductUpdate(updatedProduct) {
  const index = products.value.findIndex(p => p._id === updatedProduct._id);
  if (index !== -1) {
    products.value[index] = { ...updatedProduct };
    products.value = [...products.value];
  }
}

function handleProductArchive(archivedProductId) {
  products.value = products.value.filter(p => p._id !== archivedProductId);
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col my-5 text-center">
        <h1 class="text-primary">Our Products</h1>
        <p>Browse our available items below!</p>
         <ProductSearch />
      </div>
    </div>

    <div class="row g-4">
      <ProductComponent
        v-for="product in products"
        :key="product._id"
        :productData="product"
        @product-updated="handleProductUpdate"
        @product-archived="handleProductArchive"
      />
    </div>
  </div>
</template>
