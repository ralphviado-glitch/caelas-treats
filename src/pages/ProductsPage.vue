<script setup>
import { ref, onBeforeMount } from "vue";
import ProductComponent from "../components/ProductComponent.vue";
import ProductSearch from "../components/ProductSearchComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import api from "../api";
import { useGlobalStore } from "../stores/global";

const products = ref([]);
const { user } = useGlobalStore(); // get logged-in user

onBeforeMount(async () => {
  try {
    let data;
      const res = await api.get("/products/active"); 
      data = res.data;
    products.value = data;
  } catch (error) {
    console.error("Error loading products:", error.response?.data || error.message);
  }
});

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col my-5 text-center">
        <h1>Our Products</h1>
        <p>Browse our available items below!</p>
        <ProductSearch />
      </div>
    </div>

    <div class="row g-4 mb-5">
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
