<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import api from "../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import FooterComponent from "../components/FooterComponent.vue";

const route = useRoute();
const product = ref(null);
const quantity = ref(1);
const notyf = new Notyf();

onBeforeMount(async () => {
  try {
    const { productId } = route.params;
    const res = await api.get(`/products/${productId}`);
    product.value = res.data;
  } catch (error) {
    console.error("Error loading product:", error.response?.data || error.message);
  }
});

const addToCart = async () => {
  try {
    const payload = {
      productId: product.value._id,
      quantity: quantity.value,
      subtotal: product.value.price * quantity.value,
    };

    await api.post("/cart/add-to-cart", payload);
    notyf.success("Added to cart!");
  } catch (error) {
    console.error("Add to cart error:", error.response?.data || error.message);
    notyf.error("Failed to add to cart");
  }
};
</script>

<template>
  <div class="container py-5" v-if="product">
    <div class="row">
       <div class="col-md-6 text-center">
        <img
            :src="product.image || 'https://via.placeholder.com/400'"
            class="img-fluid rounded product-detail-img"
            :alt="product.name"
          />

      </div>

      <div class="col-md-6">
        <h2>{{ product.name }}</h2>
        <p class="lead">{{ product.description }}</p>
        <h4 class="mb-4">$ {{ product.price.toFixed(2) }}</h4>

        <div class="d-flex align-items-center mb-3">
          <label for="qty" class="me-2">Quantity:</label>
          <input
            id="qty"
            type="number"
            class="form-control w-auto"
            min="1"
            v-model="quantity"
          />
        </div>

        <button @click="addToCart" class="btn custom-banner-btn border-3 rounded-pill px-5">
          <i class="bi bi-cart-plus me-1"></i> Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
