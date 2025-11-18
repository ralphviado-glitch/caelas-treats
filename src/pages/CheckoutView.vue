<script setup>
import { ref, onBeforeMount } from "vue";
import api from "../api";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";

const cart = ref([]);
const totalPrice = ref(0);
const notyf = new Notyf();
const router = useRouter();

const loadCart = async () => {
  try {
    const res = await api.get("/cart/get-cart");

    const itemsWithNames = await Promise.all(
      res.data.cartItems.map(async (item) => {
        try {
          const productRes = await api.get(`/products/${item.productId}`);
          return {
            ...item,
            productName: productRes.data.name,
            productPrice: productRes.data.price,
          };
        } catch {
          return {
            ...item,
            productName: "Unknown Product",
            productPrice: 0,
          };
        }
      })
    );

    cart.value = itemsWithNames;
    totalPrice.value = res.data.totalPrice;
  } catch (err) {
    console.error("Error loading cart:", err);
  }
};

const placeOrder = async () => {
  try {
    // Call checkout (backend already clears the cart)
    await api.post("/orders/checkout", {
      items: cart.value,
      totalAmount: totalPrice.value,
    });

    // Update UI cart manually (no backend call needed)
    cart.value = [];
    totalPrice.value = 0;

    notyf.success("Order placed successfully!");

    router.push({ name: "OrderSuccess" });
  } catch (err) {
    console.error(err);
    notyf.error("Failed to place order");
  }
};

onBeforeMount(loadCart);
</script>

<template>
  <div class="container py-5">
    <h2 class="text-primary mb-4">Checkout</h2>

    <div v-if="cart.length > 0">
      <table class="table table-bordered text-center align-middle">
        <thead class="table-light">
          <tr>
            <th>Product</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Subtotal ($)</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in cart" :key="item.productId">
            <td>{{ item.productName }}</td>
            <td>{{ item.productPrice }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.subtotal.toFixed(2) }}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr class="table-info">
            <td colspan="3" class="text-end fw-bold">Total:</td>
            <td class="fw-bold">$ {{ totalPrice.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="text-end mt-3">
        <button class="btn btn-success" @click="placeOrder">
          Place Order
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>
