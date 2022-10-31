<template>
	<section v-if="stay" class="stay-details">
		<div class="details-mobile-header">
			<div class="left" @click.stop="goBack">
				<span class="material-icons">
					chevron_left
				</span>
				Back
			</div>
			<div class="right">
				<div class="share">
					<button @click.stop="toggleShare">
						<i class="el-icon-upload2"></i>
					</button>
				</div>
				<div class="save">
					<button @click.stop="toggleWishlist">
						<span class="material-icons">
							favorite_border
						</span>
					</button>
				</div>
			</div>
		</div>
		<div class="details-mobile-footer">
			<div class="left">
				<p class="price">${{ stay.price }} <span>/ night</span></p>
				<p class="review">
					<span class="material-icons">
						star
					</span>
					{{ avg }} (<span>{{ reviewsLength }} reviews</span>)
				</p>
			</div>
			<div class="right">
				<button @click.stop="toggleCheckout">{{ orderStatus }}</button>
			</div>
		</div>
		<section class="header">
			<section class="details">
				<div class="stay-header-top">
					<h2>{{ stay.name }}</h2>
				</div>
				<div class="stay-header-bottom">
					<div class="left">
						<p>
							<span v-if="reviewsLength">
								<i class="el-icon-star-on"></i>
								{{ avg }}
								<span class="details-reviews">({{ reviewsLength }} reviews)</span>
								&middot;
							</span>
							<span class="details-location">{{ address }}</span>
						</p>
					</div>
					<div class="right">
						<div class="share">
							<i class="el-icon-upload2"></i>
							<button @click.stop="toggleShare"><span>Share</span></button>
						</div>
						<div class="save">
							<span class="material-icons">
								favorite_border
							</span>
							<button><span>Save</span></button>
						</div>
					</div>
				</div>
			</section>
			<section class="actions"></section>
		</section>
		<section class="images">
			<img :src="stay.imgUrls[0]" v-if="stay.imgUrls[0]" />
			<img v-else :src="require('@/assets/imgs/no_img.jpeg')" alt="" />
			<section class="secondary">
				<img :src="stay.imgUrls[1]" v-if="stay.imgUrls[1]" />
				<img v-else :src="require('@/assets/imgs/no_img.jpeg')" alt="" />
				<img :src="stay.imgUrls[2]" v-if="stay.imgUrls[2]" />
				<img v-else :src="require('@/assets/imgs/no_img.jpeg')" alt="" />
				<img :src="stay.imgUrls[3]" v-if="stay.imgUrls[3]" />
				<img v-else :src="require('@/assets/imgs/no_img.jpeg')" alt="" />
				<img :src="stay.imgUrls[4]" v-if="stay.imgUrls[4]" />
				<img v-else :src="require('@/assets/imgs/no_img.jpeg')" alt="" />
			</section>
		</section>
		<el-carousel
			v-if="stay.imgUrls.length"
			class="details-carousel"
			trigger="click"
			arrow="always"
			height="250px"
			:autoplay="false"
			:loop="true"
		>
			<el-carousel-item v-for="(imgUrl, idx) in stay.imgUrls" :key="idx">
				<img :src="imgUrl" />
			</el-carousel-item>
		</el-carousel>
		<section class="flex-container">
			<section class="stay-info">
				<section class="info-header">
					<div>
						<h2>{{ infoHeader }}</h2>
						<span
							>{{ stay.accommodates }} guests &middot; {{ stay.propertyType }} &middot;
							{{ beds }} &middot; {{ baths }}</span
						>
					</div>
					<img :src="stay.host.imgUrl" alt="" />
				</section>
				<section class="info-about">
					<h2>All about {{ stay.host.fullname }}'s place</h2>
					<p>{{ stay.summary + '.' }}</p>
				</section>
				<section class="amenities">
					<h2>What this place offers</h2>
					<section>
						<article v-for="(amenity, idx) in stay.amenities" :key="idx">
							<font-awesome-icon v-if="amenity.fa" :icon="icons[amenity.icon]" />
							<i v-else :class="amenity.icon"></i>
							{{ amenity.txt }}
						</article>
					</section>
				</section>
			</section>
			<stay-checkout
				:price="stay.price"
				:reviews="stay.reviews"
				:accommodates="stay.accommodates"
				@checkout="checkout"
			/>
		</section>
		<review-ratings :reviews="stay.reviews" />
		<el-button v-if="loggedInUser" @click.stop="toggleReview">Add Review</el-button>
		<review-add v-if="isScreenOpen" @add-review="onAddReview" @toggle-review="toggleReview" />
		<review-list v-if="stay.reviews.length" :reviews="stay.reviews" />
		<section v-else class="no-reviews">
			<h2>No reviews (yet)</h2>
		</section>
		<stay-map :loc="stay.loc" />
		<section class="host-info">
			<div class="left">
				<section class="host-info-header">
					<img :src="stay.host.imgUrl" alt="" />
					<div>
						<h2>Hosted by {{ stay.host.fullname }}</h2>
						<p>Joined in December 2014</p>
					</div>
				</section>
				<section class="badges">
					<p><span class="material-icons"> star </span>{{ stay.reviews.length }} Reviews</p>
					<p>
						<font-awesome-icon :icon="icons.userShield" />
						Identity verified
					</p>
				</section>
				<p class="host-description">
					My name is {{ stay.host.fullname }} living in Israel for many years. speak English and
					Hebrew.
				</p>
			</div>
			<div class="right">
				<section class="host-details">
					<p>Response rate: 86%</p>
					<p>Response time: within an hour</p>
					<button @click.stop="toggleChat">Contact host</button>
					<div class="details-alert">
						<img src="@/assets/imgs/svgs/shield.svg" />
						<small>
							To protect your payment, never transfer money or communicate outside of the RefuBNB
							website or app.</small
						>
					</div>
				</section>
			</div>
		</section>
		<chat
			v-if="isChatOpen"
			class="chat"
			@close="toggleChat"
			:stay="stay"
			:msgHistory="stay.chatMsgs"
		/>
		<mobile-checkout
			@closeModal="toggleCheckout"
			v-if="isMobileCheckoutOpen"
			@checkout="checkout"
			:stay="stay"
		/>
	</section>
</template>

<script>
import { orderService } from '@/services/order-service.js'
import { showMsg } from '@/services/event-bus.service.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faWifi,
	faPaw,
	faSnowflake,
	faUserShield,
	faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import reviewList from '@/cmps/details/review-list'
import stayMap from '@/cmps/details/stay-map'
import chat from '@/cmps/details/chat'
import stayCheckout from '@/cmps/details/stay-checkout'
import reviewAdd from '@/cmps/details/review-add'
import reviewRatings from '@/cmps/details/review-ratings'
import mobileCheckout from '@/cmps/details/mobile-checkout.vue'

export default {
	props: { isScreenOpen: Boolean },
	components: {
		FontAwesomeIcon,
		reviewList,
		stayMap,
		stayCheckout,
		chat,
		reviewAdd,
		reviewRatings,
		mobileCheckout,
	},
	data() {
		return {
			isChatOpen: false,
			icons: {
				wifi: faWifi,
				paw: faPaw,
				snowflake: faSnowflake,
				userShield: faUserShield,
				shieldAlt: faShieldAlt,
			},
			isLoading: true,
			isReadyToReserve: false,
			isMobileCheckoutOpen: false,
		}
	},
	computed: {
		address() {
			return this.stay.loc.countryCode === 'NY'
				? this.stay.loc.address + 'United States'
				: this.stay.loc.address
		},
		reviewsLength() {
			return this.stay.reviews.length
		},
		infoHeader() {
			return this.stay.propertyType + ' hosted by ' + this.stay.host.fullname
		},
		beds() {
			return this.stay.accommodates === 1
				? this.stay.accommodates + ' bed'
				: this.stay.accommodates + ' beds'
		},
		baths() {
			return this.stay.accommodates === 1
				? this.stay.accommodates + ' bath'
				: this.stay.accommodates + ' baths'
		},
		loggedInUser() {
			return this.$store.getters.loggedinUser
		},
		stay() {
			return this.$store.getters.watchedStay
		},
		avg() {
			if (!this.stay.reviews.length) return 0
			const sum = this.stay.reviews.reduce((acc, review) => {
				return acc + review.rate
			}, 0)
			return (sum / this.stay.reviews.length).toFixed(1)
		},
		orderStatus() {
			if (this.isReadyToReserve) {
				return 'Reserve'
			} else {
				return 'Check availability'
			}
		},
	},
	methods: {
		async checkout({ dates, total, guests }) {
			const orderToSave = orderService.getEmptyOrder()
			orderToSave.startDate = dates[0].getTime()
			orderToSave.endDate = dates[1].getTime()
			orderToSave.total = total
			orderToSave.guests = guests

			if (!this.loggedInUser) {
				this.$emit('toggleLogin', true)
				return
			}

			try {
				await this.$store.dispatch({
					type: 'saveOrder',
					order: orderToSave,
					stay: this.stay,
				})

				showMsg('order sent')
			} catch (err) {
				showMsg('order failed', 'error')
			}
		},
		toggleShare() {
			this.$emit('toggleShare', true)
		},
		toggleChat() {
			if (!this.loggedInUser) {
				this.$emit('toggleLogin', true)
				return
			}
			this.isChatOpen = !this.isChatOpen
		},
		toggleReview() {
			this.$emit('screen', !this.isScreenOpen)
		},
		goBack() {
			this.$router.back()
		},
		async onAddReview(review) {
			try {
				const newStay = await this.$store.dispatch({
					type: 'addReview',
					stay: this.stay,
					review,
				})
				this.$store.commit({ type: 'setWatchedStay', stay: newStay })
				this.toggleReview()
				showMsg('Review added successfully')
			} catch {
				showMsg('There was a problem posting the review', 'error')
			}
		},
		toggleCheckout() {
			this.isMobileCheckoutOpen = !this.isMobileCheckoutOpen
		},
		closeModal(val) {
			this.isMobileCheckoutOpen = val
		},
	},
	async created() {
		window.scrollTo(0, 0)
		this.$emit('remove', true)
		this.$emit('toggleLoading', true)
		try {
			this.$emit('scrolled', true)
			const { stayId } = this.$route.params
			await this.$store.dispatch({ type: 'loadAndWatchStay', stayId })
			this.$emit('toggleLoading', false)
		} catch (err) {
			console.log('Cannot get stay with id:', stayId)
		}
	},
	destroyed() {
		this.$emit('remove', false)
	},
}
</script>
