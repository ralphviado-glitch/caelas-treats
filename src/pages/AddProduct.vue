<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">Add Product</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border round-3 mx-auto p-5">
				<form v-on:submit="handleSubmit">
					<div class="mb-3">

						<label for="name" class="form-label">
							Name
						</label>
						<input type="text" class="form-control" id="name" v-model="name">

						<label for="description" class="form-label">
							Description
						</label>
						<input type="text" class="form-control" id="description" v-model="description">

						<label for="price" class="form-label">
							Price
						</label>
						<input type="text" class="form-control" id="price" v-model="price">
					 </div>
					<div class="d-grid mt-5">
						<button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Submit</button>
						<button type="submit" class="btn btn-danger btn-block" v-else disabled>Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	
	import { watch, ref, onBeforeMount } from "vue";
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global.js'

	import { Notyf } from 'notyf';
	import axios from "axios";

	import api from "../api"; // Everytime, you want to do the shorten syntax in creating a request to server, import api

	const name = ref("");
	const description = ref("");
	const price = ref("");

	const isEnabled = ref(false);
	const router = useRouter()
	const { user } = useGlobalStore();

	const notyf = new Notyf();

	watch([name, description, price], (currentValue, oldValue) => {

		if (currentValue.every(input => input !== "")) {
			  isEnabled.value = true
			} else {
			  isEnabled.value = false
			}
	})

	async function handleSubmit(e) {
		e.preventDefault();

		try{
			let res = await api.post('/products', {
                name: name.value,
                description: description.value,
                price: price.value,
            })

			if (res.status === 201) {
			      notyf.success("Product added successfully! Redirecting to products...");
			      name.value = "";
			      description.value = "";
			      price.value = "";
			      
			      setTimeout(() => {
			        router.push({ path: "/products" });
			      }, 1500);
			  }
		}
		catch(err){
			if(err.response.status === 404 || err.response.status === 401 || err.response.status === 400){ // <<
			    notyf.error(err.response.data.message) // <<
			}
			else{
			    notyf.error("Registration failed. Please contact administrator")
			}
		}

		// console.log(email.value);
		// console.log(password.value);
		// console.log(confirmPass.value);

		
	}

	onBeforeMount(() => {
		if(user.email) {
			router.push({path: '/'})
		}
	})

</script>