<template>
    <div class="row my-5">
        <div class="container">
            <div class="container">
                <h2 class="text-center mb-5">Our Bestsellers!</h2>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                  <div class="col">
                    <div class="card h-100">
                      <img src="/images/PistachioCrunch.webp" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h3 class="card-title">Pistachio Crunch</h3>
                        <p class="card-text">$35.00</p>
                        <router-link
                          class="btn custom-banner-btn border-3 rounded-pill"
                          :to="{ name: 'ProductDetail', params: { productId: '68f0d382fe3a455e6f0c71e3' } }"
                        >
                          View Product
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card h-100">
                      <img src="/images/BlueberryCheesecake.webp" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h3 class="card-title">Blueberry Cheesecake</h3>
                        <p class="card-text">$35.00</p>
                        <router-link
                          class="btn custom-banner-btn border-3 rounded-pill"
                          :to="{ name: 'ProductDetail', params: { productId: '68f0d39afe3a455e6f0c71e5' } }"
                        >
                          View Product
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card h-100">
                      <img src="/images/ChocoOverload.webp" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h3 class="card-title">Choco Overload</h3>
                        <p class="card-text">$35.00</p>
                        <router-link
                          class="btn custom-banner-btn border-3 rounded-pill"
                          :to="{ name: 'ProductDetail', params: { productId: '68f0d3affe3a455e6f0c71e7' } }"
                        >
                          View Product
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>
