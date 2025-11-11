<template>
	<div class="container-fluid">
		<h1 class="my-5 pt-3 text-primary text-center">Register Page</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border round-3 mx-auto p-5">
				<form v-on:submit="handleSubmit">
					<div class="mb-3">

						<label for="fName" class="form-label">
							First Name
						</label>
						<input type="text" class="form-control" id="fName" v-model="firstName">

						<label for="lName" class="form-label">
							Last Name
						</label>
						<input type="text" class="form-control" id="lName" v-model="lastName">

						<label for="mobile" class="form-label">
							Mobile Number
						</label>
						<input type="text" class="form-control" id="mobile" v-model="mobileNo">



						<label for="emailInput" class="form-label">
							Email Address
						</label>
						<input type="email" class="form-control" id="emailInput" v-model="email">
					</div>

					<div class="mb-3">
						<label for="passwordInput" class="form-label">
							Password
						</label>
						<input type="password" class="form-control" id="passwordInput" v-model="password">
					</div>

					<div class="mb-3">
						<label for="cpasswordInput" class="form-label">
							Confirm Password
						</label>
						<input type="password" class="form-control" id="cpasswordInput" v-model="confirmPass">
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
	import 'notyf/notyf.min.css';
	import axios from "axios";

	import api from "../api"; 

	const firstName = ref("");
	const lastName = ref("");
	const mobileNo = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPass = ref("");

	const isEnabled = ref(false);
	const router = useRouter()
	const { user } = useGlobalStore();

	const notyf = new Notyf();

	watch([email, password, confirmPass], (currentValue, oldValue) => {

		if(currentValue.every(input => input !== "") && currentValue[1] === currentValue[2]) {

			isEnabled.value = true
		} else {
			isEnabled.value = false
		}
	})

	async function handleSubmit(e) {
		e.preventDefault();

		try{
			let res = await api.post('/users/register', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                mobileNo: mobileNo.value,
                password: password.value
            })

			if(res.data.message == "User Registered Successfully"){	
				notyf.success("Registration Successful");

				firstName.value = "";
				lastName.value= "";
				mobileNo.value="";
				email.value = "";
				password.value = "";
				confirmPass.value = "";

				setTimeout(() => {
		        router.push({ path: '/login' });
		      }, 1000);
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

		
	}

	onBeforeMount(() => {
		if(user.email) {
			router.push({path: '/products'})
		}
	})

</script>