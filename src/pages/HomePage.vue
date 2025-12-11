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
					tagline: "Say it with a Sweet Treat",
					destination: "Products",
					buttonLabel: "View Our Products"
				}
			}
		}
	}
</script>

<template>

    <BannerComponent :bannerProps="bannerProps" />
    <div class="container-fluid">
    	<HighlightsComponent />
  	</div>
    
  
</template>