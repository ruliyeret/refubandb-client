<template>
	<section class="user-wishlist-container">
		<h2>Wishlist</h2>
		<wishlist v-if="stays" :stays="stays" />
		<h2 v-if="!loggedinUser || !stays">No items in your wishlist yet</h2>
	</section>
</template>

<script>
import wishlist from '@/cmps/list/wishlist-list.vue'
export default {
	components: { wishlist },
	props: {},
	data() {
		return {
			loggedinUser: null,
		}
	},
	computed: {
		stays() {
			return this.$store.getters.stays
		},
	},
	methods: {},
	async created() {
		window.scrollTo(0, 0)
		this.$emit('scrolled', true)
		this.$emit('hideSearch', true)
		await this.$store.dispatch({ type: 'loadStays' })
		this.loggedinUser = this.$store.getters.loggedinUser
		console.log(this.$store.getters.loggedinUser)
	},
}
</script>
