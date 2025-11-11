<script>
	
	import BannerComponent from '../components/BannerComponent.vue';
	import HighlightsComponent from '../components/HighlightsComponent.vue';

	export default {
		components: {
			BannerComponent,
			HighlightsComponent
		},
		data() {
			return {
				bannerProps: {
					title: "Caela's Treats",
					//tagline: "Opportunities for every, everywhere",
					destination: "Products",
					buttonLabel: "View Our Products"
				}
			}
		}
	}
</script>

<template>
  <div class="container-fluid">
    <BannerComponent :bannerProps="bannerProps" />
    <HighlightsComponent />
  </div>
</template>