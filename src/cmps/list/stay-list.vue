<template>
	<section>
		<section class="stay-list" v-if="stays.length">
			<section v-for="stay in stays" :key="stay._id" class="stay-preveiw-container">
				<stay-preview @click.stop :stay="stay"> </stay-preview>
			</section>
		</section>
		<section v-else>No Available places</section>
	</section>
</template>

<script>
import stayPreview from './stay-preview'
export default {
	props: {
		stays: Array,
	},
	data() {
		return {
			currCity: '',
		}
	},
	computed: {
		place() {
			if (this.currCity) {
				return `Places in ${this.currCity}`
			} else {
				return `Entire places`
			}
		},
	},
	created() {
		this.currCity = this.$route.params.city
	},

	components: {
		stayPreview,
	},
}
</script>
