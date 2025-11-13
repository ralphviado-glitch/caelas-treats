<template>
  <div class="table-responsive">
    <table class="table table-striped align-middle">
      <thead class="table-primary">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Active?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>${{ product.price }}</td>
          <td>
            <span
              :class="product.isActive ? 'badge bg-success' : 'badge bg-secondary'"
            >
              {{ product.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" @click="openEditModal(product)">Edit</button>
            <button
              class="btn btn-sm"
              :class="product.isActive ? 'btn-outline-danger' : 'btn-outline-success'"
              @click="toggleActive(product)"
            >
              {{ product.isActive ? 'Deactivate' : 'Activate' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <ProductFormComponent
      v-if="editingProduct"
      :product="editingProduct"
      @close="editingProduct = null"
      @updated="handleProductUpdated"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import api from "../api";
import ProductFormComponent from "./ProductFormComponent.vue";

const props = defineProps({
  products: Array
});
const emit = defineEmits(["refresh"]);

const notyf = new Notyf();
const editingProduct = ref(null);

function openEditModal(product) {
  editingProduct.value = product;
}

async function toggleActive(product) {
  try {
    const endpoint = product.isActive
      ? `/products/${product._id}/archive`
      : `/products/${product._id}/activate`;
    await api.patch(endpoint);
    notyf.success(
      product.isActive ? "Product deactivated" : "Product reactivated"
    );
    emit("refresh");
  } catch (err) {
    console.error(err);
    notyf.error("Action failed");
  }
}

function handleProductUpdated() {
  editingProduct.value = null;
  emit("refresh");
}
</script>
