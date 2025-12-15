<script>

  
  export default {

    props: {
      bannerProps: Object
    },
  }
</script>

<template>
  <div class="container-fluid">
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 text-center text-md-start mx-auto">
        <h1 id="banner-title">{{bannerProps.title}}</h1>
        <p id="motto">
          {{bannerProps.tagline}}
        </p>
        <router-link class="btn custom-banner-btn btn-lg border-4 rounded-pill px-5" :to="{ name: bannerProps.destination }">{{bannerProps.buttonLabel}}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>




</style>
