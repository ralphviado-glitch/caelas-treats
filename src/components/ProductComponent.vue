<template>
  <div class="col-md-4">
    <div class="card h-100">
       <img
          :src="productData.image"
          class="card-img-top"
          :alt="productData.name"
        />
      <div class="card-body">
        <h4>{{ productData.name }}</h4>
       <!--  <p>{{ productData.description }}</p> -->
        <p>Price: ${{ productData.price }}</p>

        <div class="d-grid">
    
          <router-link
            class="btn custom-banner-btn border-3 rounded-pill"
            :to="`/products/${productData._id}`"
          >
            View Product
          </router-link>

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

const { user } = useGlobalStore();
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
