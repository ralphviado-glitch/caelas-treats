<!-- 
<script setup>

    import { watch, ref, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global.js';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router'
    import axios from "axios";

    import api from "../api"; 

    const router = useRouter();
    const { user } = useGlobalStore();

    const { getUserDetails } = useGlobalStore()

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    const notyf = new Notyf();

   


    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    async function handleSubmit(e){

        e.preventDefault();

        try{
          let res = await api.post("users/login",
            {
                email: email.value,
                password: password.value
            }
          )

          if(res.data.message == "User logged in successfully"){

             notyf.success("Login Successful");

             localStorage.setItem("token", res.data.access) 
             getUserDetails(res.data.access) 
             email.value = "";
             password.value = "";
             router.push({path: '/products'})
          }
        }catch(err){
            if(err.response.status === 404 || err.response.status === 401 || err.response.status === 400){ // <<
                notyf.error(err.response.data.message) // <<
            }
            else{
                notyf.error("Login failed. Please contact administrator")
            }
        }      
    }

    onBeforeMount(() => {
        if(user.token) { // <<
            router.push({path: '/products'})
        }
    })
</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" />
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
 -->

 <script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { useGlobalStore } from '../stores/global.js';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const store = useGlobalStore();
const { user, getUserDetails } = store;

const email = ref('');
const password = ref('');
const isEnabled = ref(false);

const notyf = new Notyf();

// Enable button only if both fields are filled
watch([email, password], (currentValue) => {
  isEnabled.value = currentValue.every((input) => input !== '');
});

// Handle login
async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await api.post('users/login', {
      email: email.value,
      password: password.value,
    });

    if (res.data.message === 'User logged in successfully') {
      notyf.success('Login Successful');

      localStorage.setItem('token', res.data.access);
      await getUserDetails(res.data.access);

      email.value = '';
      password.value = '';

      if (store.user.isAdmin) {
        router.push({ path: '/products' });
      } else {
        router.push({ path: '/products' });
      }
    }
  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 401 || err.response?.status === 400) {
      notyf.error(err.response.data.message);
    } else {
      notyf.error('Login failed. Please contact administrator');
    }
  }
}

// On refresh or visiting login while already logged in
onBeforeMount(async () => {
  const token = localStorage.getItem('token');

  if (token) {
    await getUserDetails(token);

    if (store.user.isAdmin) {
      router.push({ path: '/products' });
    } else {
      router.push({ path: '/products' });
    }
  }
});
</script>

<template>
  <div class="container-fluid">
    <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-md-5 border border rounded-3 mx-auto p-5">
        <form v-on:submit="handleSubmit">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordInput"
              v-model="password"
            />
          </div>
          <div class="d-grid mt-5">
            <button
              type="submit"
              class="btn btn-primary btn-block"
              v-if="isEnabled"
            >
              Login
            </button>
            <button
              type="submit"
              class="btn btn-danger btn-block"
              disabled
              v-else
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
