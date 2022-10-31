<template>
	<section class="reviews-ratings-container">
		<div class="review-header">
			<span class="material-icons">
				star
			</span>
			<p>{{ avg }}</p>
			&middot;
			<span>{{ reviewsCount }}</span>
		</div>
		<section class="review-ratings">
			<div>
				<p>Cleaniness</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[0] + '%' }"></div>
					</div>
					<span>{{ rating(bars[0]) }}</span>
				</section>
			</div>
			<div>
				<p>Communication</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[1] + '%' }"></div>
					</div>
					<span>{{ rating(bars[1]) }}</span>
				</section>
			</div>
			<div>
				<p>Check-In</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[2] + '%' }"></div>
					</div>
					<span>{{ rating(bars[3]) }}</span>
				</section>
			</div>
			<div>
				<p>Accuracy</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[3] + '%' }"></div>
					</div>
					<span>{{ rating(bars[3]) }}</span>
				</section>
			</div>
			<div>
				<p>Location</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[4] + '%' }"></div>
					</div>
					<span>{{ rating(bars[4]) }}</span>
				</section>
			</div>
			<div>
				<p>Value</p>
				<section>
					<div class="bar">
						<div class="progress" :style="{ width: bars[5] + '%' }"></div>
					</div>
					<span>{{ rating(bars[5]) }}</span>
				</section>
			</div>
		</section>
	</section>
</template>

<script>
import { utilService } from '@/services/util-service.js'
export default {
	props: { reviews: Array },
	data() {
		return {
			bars: [
				utilService.getRandomInt(85, 100),
				utilService.getRandomInt(85, 100),
				utilService.getRandomInt(85, 100),
				utilService.getRandomInt(85, 100),
				utilService.getRandomInt(85, 100),
				utilService.getRandomInt(85, 100),
			],
		}
	},
	computed: {
		avg() {
			if (!this.reviews.length) return 0
			const sum = this.reviews.reduce((acc, review) => {
				return acc + review.rate
			}, 0)
			return (sum / this.reviews.length).toFixed(1)
		},
		reviewsCount() {
			if (this.reviews.length === 1) return '1 review'
			return this.reviews.length + ' reviews'
		},
	},
	methods: {
		rating(percentage) {
			if (percentage > 99) return '5.0'
			return (percentage / 20).toFixed(1)
		},
	},
}
</script>
