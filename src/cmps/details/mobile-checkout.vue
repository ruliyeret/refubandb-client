<template>
	<section class="mobile-checkout-container">
		<div class="mobile-checkout-header">
			<h2>
				<span @click.stop="closeModal" class="material-icons">
					chevron_left
				</span>
				Confirm and reserve
			</h2>
		</div>
		<div class="mobile-checkout-details">
			<div class="img">
				<img :src="stay.imgUrls[0]" alt="main stay image" />
			</div>
			<div class="details">
				<div class="first">
					<p>Entire {{ stay.propertyType }} in {{ stay.loc.address.split(',')[0] }}</p>
				</div>
				<div class="second">
					<p>{{ stay.name }}</p>
					<span>{{ bedsCount }} &middot; {{ bathsCount }}</span>
				</div>
				<div class="third">
					<span class="material-icons"> star </span>
					<p>
						{{ avg }} <small>({{ reviewsCount }})</small>
					</p>
				</div>
			</div>
		</div>
		<div class="mobile-checkout-summary">
			<h3>Your trip</h3>
			<div>
				<h4>Dates</h4>
				<div class="datepicker">
					<div>
						<span>Check-in date:</span>
						<input type="date" v-model="dates[0]" />
					</div>
					<div>
						<span>Check-out date:</span>
						<input type="date" v-model="dates[1]" />
					</div>
				</div>
			</div>
			<div>
				<h4>Guests</h4>
				<p>{{ guestsCount }}</p>
			</div>
		</div>
		<div class="mobile-checkout-price">
			<h3>Price details</h3>
			<p>
				<span>{{ computedPrice.price }} x {{ nights }}</span
				><span>{{ computedPrice.accomodation }}</span>
			</p>
			<p>
				<span>Service fee</span><span>{{ computedPrice.service }}</span>
			</p>
			<p class="total">
				<small>Total(USD)</small><span>{{ computedPrice.total }}</span>
			</p>
		</div>
		<div class="mobile-checkout-button">
			<button @click="checkout">Confirm and pay</button>
		</div>
	</section>
</template>

<script>
export default {
	props: { stay: Object },
	data() {
		return {
			dates: ['', ''],
			total: 0,
			guests: 1,
		}
	},
	computed: {
		guestsCount() {
			let postfix = ' guest'
			postfix += this.guests === 1 ? '' : 's'
			return this.guests + postfix
		},
		bedsCount() {
			let postfix = ' bed'
			postfix += this.stay.accommodates === 1 ? '' : 's'
			return this.stay.accommodates + postfix
		},
		bathsCount() {
			let postfix = ' bath'
			postfix += this.stay.accommodates === 1 ? '' : 's'
			return this.stay.accommodates + postfix
		},
		avg() {
			if (!this.reviewsCount) return 0
			const sum = this.stay.reviews.reduce((acc, review) => {
				return acc + review.rate
			}, 0)
			return (sum / this.reviewsCount).toFixed(1)
		},
		reviewsCount() {
			return this.stay.reviews.length
		},
		nights() {
			let postfix = ' night'
			postfix += this.computedPrice.nights === 1 ? '' : 's'
			return this.computedPrice.nights + postfix
		},
		computedPrice() {
			const checkin = new Date(this.dates[0]).getTime()
			const checkout = new Date(this.dates[1]).getTime()
			const nights = (checkout - checkin) / 1000 / 60 / 60 / 24
			const accomodation = this.stay.price * nights
			const service = accomodation / 10
			const total = accomodation + service

			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			})

			if (!nights || !accomodation) {
				this.total = this.stay.price + this.stay.price / 10
				return {
					accomodation: formatter.format(this.stay.price),
					service: formatter.format(this.stay.price / 10),
					total: formatter.format(this.stay.price + this.stay.price / 10),
					price: formatter.format(this.stay.price),
					nights: 1,
					totalNumber: this.stay.price + this.stay.price / 10,
				}
			}

			this.total = total
			return {
				accomodation: formatter.format(accomodation),
				service: formatter.format(service),
				total: formatter.format(total),
				price: formatter.format(this.stay.price),
				nights,
				totalNumber: total,
			}
		},
	},
	methods: {
		closeModal() {
			this.$emit('closeModal', true)
		},
		checkout() {
			if (!this.dates[0] || !this.dates[1] || this.total || this.guests) return
			this.dates = [new Date(this.dates[0]).getTime(), new Date(this.dates[1]).getTime()]
			this.$emit('checkout', { date: this.dates, total: this.total, guests: this.guests })
			this.dates = []
			this.guests = 0
			this.total = 0
			this.closeModal()
		},
	},
	created() {},
}
</script>
