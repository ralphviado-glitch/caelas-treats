<template>
  <footer class="footer bg-light pt-5">
    <div class="container">
      <div class="row gy-4 align-items-start">

        <!-- LEFT: Logo + Brand -->
        <div class="col-md-4 text-center text-md-start">
          <img
            src="/images/logo.svg"
            alt="Caela's Treats"
            class="footer-logo mb-3"
          />
          <p class="footer-text">
            Freshly baked treats made with love.
          </p>
        </div>

        <!-- CENTER: Footer Links -->
        <div class="col-md-4 ">
          <h6 class="footer-heading">Quick Links</h6>
          <ul class="list-unstyled footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </div>

        
 <!--        <div class="col-md-4 text-center text-md-end">
          <h6 class="footer-heading">Follow Us</h6>
          <div class="d-flex justify-content-center justify-content-md-end gap-3 mt-3">
             <a href="#" aria-label="Facebook">
              <img src="/images/logo-facebook.png" class="footer-icon" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/images/logo-ig.png" class="footer-icon" />
            </a>
          </div>
        </div> -->

      </div> 

      <hr class="my-4" />

      <div class="text-center pb-3 footer-bottom">
        © 2025 Ralph Viado | Full Stack Developer. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
