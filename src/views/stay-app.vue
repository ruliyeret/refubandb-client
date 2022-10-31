<template>
	<section v-if="stays">
		<section class="explore">
			<div class="head-title">
				<p class="head-title-visits">{{ stays.length }}+ stays</p>
				<h1>{{ place }}</h1>
			</div>
			<stay-list-filter
				v-if="stays && unfilteredStays"
				:filterBy="filterBy"
				:stays="stays"
				@filter="setFilter"
				:unfilteredStays="unfilteredStays"
			/>
			<div class="head-banner" v-if="city">
				<p>
					More than {{ visitors }} guests have stayed in {{ currCity }}.
					<span>On average they rated their stays 4.8 out of 5 stars.</span>
				</p>
				<img :src="require('@/assets/imgs/chalice.gif')" />
			</div>
			<stay-list :stays="stays" v-if="stays" />
		</section>
	</section>
</template>

<script>
import stayList from '@/cmps/list/stay-list'
import stayListFilter from '@/cmps/list/stay-list-filter'

export default {
	components: {
		stayList,
		stayListFilter,
	},
	data() {
		return {
			currCity: '',
			isLoading: false,
			isCleared: false,
		}
	},
	methods: {
		setFilter(filterBy) {
			this.$store.commit({ type: 'setFilter', filterBy })
			this.isLoading = true
			this.$store.dispatch({ type: 'loadStays' })
			this.isLoading = false
			this.isCleared = true
		},
	},
	computed: {
		stays() {
			return this.$store.getters.stays
		},
		filterBy() {
			return this.$store.getters.filterBy
		},
		unfilteredStays() {
			return this.$store.getters.unfilteredStays
		},
		place() {
			if (this.currCity && !this.isCleared) {
				return `Places in ${this.currCity}`
			} else {
				return `Entire places`
			}
		},
		city() {
			if (this.currCity && !this.isCleared) {
				return this.currCity
			} else {
				this.currCity = false
			}
		},
	},
	async created() {
		window.scrollTo(0, 0)
		this.$emit('toggleLoading', true)
		this.$emit('scrolled', true)
		const { city } = this.$route.params
		this.currCity = city
		if (city) {
			var filterBy = this.$store.getters.filterBy
			filterBy.city = city
			this.visitors = {
				'New York': '550,000',
				Paris: '400,000',
				Tokyo: '350,000',
				Amsterdam: '200,000',
			}[city]

			this.$store.commit({ type: 'setFilter', filterBy })
		}

		await this.$store.dispatch({ type: 'loadUnfilteredStays' })
		await this.$store.dispatch({ type: 'loadStays' })
		this.$emit('toggleLoading', false)
	},
	destroyed() {
		this.$store.commit({
			type: 'setFilter',
			filterBy: {
				price: [0, 1500],
				types: [],
				amenities: [],
				city: '',
			},
		})
	},
}
</script>
