<script setup>
import { ref, onBeforeMount } from "vue";
import api from "../api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const cart = ref([]);
const totalPrice = ref(0);
const notyf = new Notyf();

const loadCart = async () => {
  try {
    const res = await api.get("/cart/get-cart");
    const cartItems = res.data.cartItems;
    const itemsWithNames = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const productRes = await api.get(`/products/${item.productId}`);
          return {
            ...item,
            productName: productRes.data.name,
          };
        } catch (err) {
          return {
            ...item,
            productName: "Unknown Product",
          };
        }
      })
    );

    cart.value = itemsWithNames;
    totalPrice.value = res.data.totalPrice;
  } catch (error) {
    console.error("Error loading cart:", error.response?.data || error.message);
  }
};

const updateQuantity = async (item) => {
  try {
    await api.patch("/cart/update-cart-quantity", {
      productId: item.productId,
      quantity: item.quantity,
    });
    notyf.success("Cart updated!");
    await loadCart();
  } catch (error) {
    notyf.error("Failed to update");
  }
};

const removeItem = async (productId) => {
  try {
    await api.patch(`/cart/${productId}/remove-from-cart`);
    notyf.success("Item removed!");
    await loadCart();
  } catch (error) {
    notyf.error("Failed to remove item");
  }
};

const clearCart = async () => {
  try {
    await api.put("/cart/clear-cart");
    notyf.success("Cart cleared!");
    await loadCart();
  } catch (error) {
    notyf.error("Failed to clear cart");
  }
};

onBeforeMount(loadCart);
</script>

<template>
  <div class="container py-5">
    <h2 class="text-primary mb-4">Your Shopping Cart</h2>

    <div v-if="cart.length > 0">
      <table class="table table-bordered text-center align-middle">
        <thead class="table-light">
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Subtotal ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.productId">
            <td>{{ item.productName }}</td>
            <td>
              <input
                type="number"
                class="form-control text-center"
                min="1"
                v-model.number="item.quantity"
                @change="updateQuantity(item)"
              />
            </td>
            <td>{{ item.subtotal.toFixed(2) }}</td>
            <td>
              <button
                @click="removeItem(item.productId)"
                class="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-info">
            <td colspan="2" class="text-end fw-bold">Total:</td>
            <td colspan="2" class="fw-bold">$ {{ totalPrice.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="text-end mt-3">
        <button class="btn btn-outline-danger" @click="clearCart">
          Clear Cart
        </button>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <p>Your cart is empty</p>
    </div>
  </div>
</template>
