<template>
  <div class="col-md-4">
    <div class="card p-3 h-100">
      <div class="card-body">
        <h4>{{ productData.name }}</h4>
        <p>{{ productData.description }}</p>
        <p>Price: ${{ productData.price }}</p>

        <div class="d-grid">
    
          <router-link
            class="btn btn-outline-primary mb-2"
            :to="`/products/${productData._id}`"
          >
            View Product
          </router-link>

          <button
            v-if="user.value?.isAdmin"
            class="btn btn-outline-success mb-2"
            @click="openEditModal"
          >
            Edit
          </button>

          <button
            v-if="user.value?.isAdmin"
            class="btn btn-outline-danger"
            @click="archiveProduct"
          >
            Archive
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" :id="`editModal-${productData._id}`" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Edit Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label>Name</label>
                <input v-model="name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label>Description</label>
                <textarea v-model="description" class="form-control" required></textarea>
              </div>
              <div class="mb-3">
                <label>Price</label>
                <input type="number" v-model="price" class="form-control" required />
              </div>
              <button class="btn btn-primary w-100">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Notyf } from "notyf";
import api from "../api";
import { useGlobalStore } from "../stores/global";
import * as bootstrap from "bootstrap";

const notyf = new Notyf();

const props = defineProps({ productData: Object });
const emit = defineEmits(["product-updated", "product-archived"]);

const { user } = useGlobalStore(); // <-- pinia store with user info
const name = ref(props.productData.name);
const description = ref(props.productData.description);
const price = ref(props.productData.price);

watch(
  () => props.productData,
  (newData) => {
    name.value = newData.name;
    description.value = newData.description;
    price.value = newData.price;
  },
  { deep: true }
);

</script>
