<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ product ? 'Edit Product' : 'Create Product' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
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
              <input v-model="price" type="number" class="form-control" required />
            </div>
            <button class="btn btn-primary w-100">
              {{ product ? 'Update' : 'Create' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
  product: Object
});
const emit = defineEmits(["close", "created", "updated"]);

const notyf = new Notyf();
const name = ref(props.product?.name || "");
const description = ref(props.product?.description || "");
const price = ref(props.product?.price || "");

async function submitForm() {
  try {
    if (props.product) {
      // Update
      const { data } = await api.patch(`/products/${props.product._id}/update`, {
        name: name.value,
        description: description.value,
        price: price.value,
      });
      notyf.success("Product updated");
      emit("updated", data);
    } else {
      // Create
      const { data } = await api.post("/products", {
        name: name.value,
        description: description.value,
        price: price.value,
      });
      notyf.success("Product created");
      emit("created", data);
    }
  } catch (err) {
    console.error(err);
    notyf.error("Operation failed");
  }
}
</script>
