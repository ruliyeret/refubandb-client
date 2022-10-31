<template>
	<header class="main-layout">
		<div class="heder-container">
			<div class="logo">
				<router-link to="/">
					<font-awesome-icon class="icon" :icon="airbnb" />
					<h1>RefuBNB</h1>
				</router-link>
			</div>
			<div class="header-search">
				<form action="" @submit.prevent>
					<input
						type="text"
						list="city-options"
						placeholder="Start your search"
						v-model="filterBy.city"
					/>
					<datalist id="city-options" v-if="correctCitySearched">
						<option>Amsterdam</option>
						<option>New York</option>
						<option>Paris</option>
						<option>Tokyo</option>
					</datalist>
					<div v-else class="no-data">No Data</div>
					<button class="search-btn" @click="setFilter">
						<span class="material-icons-outlined">
							search
						</span>
					</button>
					<button class="back-btn" @click="goBack">
						<span class="material-icons-outlined">
							arrow_back
						</span>
					</button>
				</form>
			</div>
			<stay-filter :class="{ scrolled: this.isScrolled }" />
			<div class="header-controls">
				<a class="host" @click.stop="toBecomeHost">Become a host</a>
				<router-link class="host" to="/stay">Explore</router-link>
				<button class="i18n">
					<span class="material-icons">
						language
					</span>
				</button>
				<div @click.stop="toggleProfile" class="profile-btn">
					<div class="user-notifications-count" v-if="notification">
						<small>{{ notification }}</small>
					</div>
					<span class="material-icons">
						menu
					</span>
					<img :src="imgUrl" alt="your image" />
					<profile-menu
						@toggleLogin="toggleLogin"
						@toggleSignUp="toggleSignUp"
						@logout="logout"
						@closeModal="closeModal"
						:isProfileModalOpen="isProfileModalOpen"
					/>
				</div>
			</div>
		</div>
	</header>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import profileMenu from '@/cmps/profile/profile-menu.vue'
import stayFilter from './stay-filter.vue'
export default {
	props: { isProfileModalOpen: Boolean },
	data() {
		return {
			airbnb: faAirbnb,
			isScrolled: false,
			searching: false,
			filterBy: {
				price: [0, 1500],
				types: [],
				amenities: [],
				city: '',
			},
		}
	},
	created() {
		window.addEventListener('scroll', this.handleScroll)
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		handleScroll(event) {
			let scrollDiff = event.path[1].scrollY
			if (scrollDiff > 0) {
				this.isScrolled = true
				this.$emit('scrolled', true)
				this.$emit('hideSearch', false)
			} else if (!scrollDiff) {
				this.isScrolled = false
				this.$emit('scrolled', false)
			}
		},
		toggleScroll(val) {
			this.isScrolled = val
		},
		toggleProfile() {
			this.$emit('toggleProfile')
		},
		closeModal() {
			this.$emit('closeModal', false)
		},
		toggleLogin() {
			this.$emit('toggleLogin', true)
			this.$emit('closeModal', false)
		},
		toggleSignUp() {
			this.$emit('toggleSignUp', true)
			this.$emit('closeModal', false)
		},
		logout() {
			this.$emit('logout')
			this.$emit('closeModal', false)
		},
		setFilter() {
			this.$store.commit({ type: 'setFilter', filterBy: this.filterBy })
			const regex = new RegExp('stay', 'i')
			if (!regex.test(this.$route.fullPath)) this.$router.push('/stay')
			this.$store.dispatch({ type: 'loadStays' })
		},
		goBack() {
			this.$router.back()
		},
		toBecomeHost() {
			if (!this.loggedInUser) {
				this.$emit('toggleLogin', true)
				return
			}
			this.$router.push(`/profile/${this.loggedInUser._id}/add-stay`)
		},
	},
	computed: {
		loggedInUser() {
			return this.$store.getters.loggedinUser
		},
		imgUrl() {
			const user = this.$store.getters.loggedinUser
			if (user && user?.imgUrl) {
				return user.imgUrl
			} else {
				return 'http://res.cloudinary.com/dandan-img-cloud/image/upload/v1626521972/johtdlkck2tptcawkglt.png'
			}
		},
		correctCitySearched() {
			const regex = new RegExp(this.filterBy.city, 'i')
			const cities = ['Amsterdam', 'New York', 'Paris', 'Tokyo']
			return cities.some(city => regex.test(city))
		},
		notification() {
			return this.$store.getters.notificationsCount
		},
	},
	watch: {
		'$route.params.city'() {
			const { city } = this.$route.params
			if (city) this.filterBy.city = city
			else this.filterBy.city = ''
		},
	},
	components: { FontAwesomeIcon, stayFilter, profileMenu },
}
</script>
