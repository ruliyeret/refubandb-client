<template>
	<section class="add-container" v-if="isAddOpen && stayToAdd && !isLoading">
		<ValidationObserver v-slot="{ invalid }">
			<el-form ref="form" :model="stayToAdd">
				<el-form-item label="Property name">
					<ValidationProvider
						name="Property type"
						rules="required|alpha_spaces"
						v-slot="{ errors }"
					>
						<el-input v-model="stayToAdd.name" :class="nameError"></el-input>
						<span class="err">{{ errors[0] }}</span>
					</ValidationProvider>
				</el-form-item>
				<div class="middle">
					<div class="middle-left">
						<el-form-item label="Price per night">
							<ValidationProvider rules="between:1,5000" name="Price amount" v-slot="{ errors }">
								<el-input v-model.number="stayToAdd.price" :class="priceError"></el-input>
								<span class="err">{{ errors[0] }}</span>
							</ValidationProvider>
						</el-form-item>
						<el-form-item label="Max guests">
							<ValidationProvider rules="between:1,5000" name="Guests amount" v-slot="{ errors }">
								<el-input v-model.number="stayToAdd.accommodates" :class="accError"></el-input>
								<span class="err">{{ errors[0] }}</span>
							</ValidationProvider>
						</el-form-item>
						<el-form-item label="Activity zone">
							<ValidationProvider rules="required" name="Country" v-slot="{ errors }">
								<el-select v-model="stayToAdd.loc.country" placeholder="please select your country">
									<el-option label="Netherlands" value="Netherlands"></el-option>
									<el-option label="France" value="France"></el-option>
									<el-option label="New York" value="New York"></el-option>
									<el-option label="Japan" value="Japan"></el-option>
								</el-select>
								<span class="err">{{ errors[0] }}</span>
							</ValidationProvider>
						</el-form-item>
						<el-form-item label="Activity type">
							<ValidationProvider rules="required" name="Stay type" v-slot="{ errors }">
								<el-select
									v-model="stayToAdd.propertyType"
									placeholder="please select property type"
								>
									<el-option label="Apartment" value="Apartment"></el-option>
									<el-option label="House" value="House"></el-option>
									<el-option label="Hotel" value="Hotel"></el-option>
									<el-option label="Loft" value="Loft"></el-option>
									<el-option label="Vila" value="Vila"></el-option>
								</el-select>
								<span class="err">{{ errors[0] }}</span>
							</ValidationProvider>
						</el-form-item>
					</div>
					<div class="middle-right">
						<div class="imgs">
							<div class="upload">
								<img-upload @save="saveStaysImg" />
							</div>
							<div class="imgs-container">
								<img v-for="stayUrl in stayUrls" :key="stayUrl" :src="stayUrl" alt="" />
							</div>
						</div>
					</div>
				</div>

				<el-form-item class="Amenities" label="Amenities">
					<el-checkbox-group v-model="stayToAdd.amenities">
						<el-checkbox
							label="TV"
							name="TV"
							:value="{ txt: 'TV', icon: 'el-icon-monitor' }"
							:checked="!!stayToAdd.amenities[0]"
						></el-checkbox>
						<el-checkbox
							label="Wifi"
							name="Wifi"
							:value="{ txt: 'Wifi', icon: 'wifi', fa: true }"
							:checked="!!stayToAdd.amenities[1]"
						></el-checkbox>
						<el-checkbox
							label="Kitchen"
							name="Kitchen"
							:value="{ txt: 'Kitchen', icon: 'el-icon-knife-fork' }"
							:checked="!!stayToAdd.amenities[2]"
						></el-checkbox>
						<el-checkbox
							label="Pets allowed"
							name="Pets"
							:value="{ txt: 'Pets allowed', icon: 'paw', fa: true }"
							:checked="!!stayToAdd.amenities[3]"
						></el-checkbox>
						<el-checkbox
							label="Air conditioning"
							name="Air conditioning"
							:value="{ txt: 'Air conditioning', icon: 'snowflake', fa: true }"
							:checked="!!stayToAdd.amenities[5]"
						></el-checkbox>
						<el-checkbox
							label="Smoking allowed"
							name="Smoking allowed"
							:value="{ txt: 'Smoking allowed', icon: 'el-icon-smoking' }"
							:checked="!!stayToAdd.amenities[6]"
						></el-checkbox>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item label="Summary">
					<el-input type="textarea" class="house-input" v-model="stayToAdd.summary"></el-input>
				</el-form-item>
				<div class="errors" v-if="errors.length">
					<p class="error" v-for="error in errors" :key="error">{{ error }}</p>
				</div>
				<el-form-item>
					<el-button @click="saveStay" :disabled="invalid">Create</el-button>
					<el-button @click="closeAdd">Cancel</el-button>
				</el-form-item>
			</el-form>
		</ValidationObserver>
	</section>
	<section v-else>Loading...</section>
</template>

<script>
import { stayService } from '@/services/stay-service.js'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import imgUpload from '@/cmps/profile/stay-img-upload'
import { showMsg } from '@/services/event-bus.service.js'
Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule])
})
export default {
	props: { stay: Object },
	components: {
		ValidationProvider,
		ValidationObserver,
		imgUpload,
	},
	data() {
		return {
			stayToAdd: null,
			isAddOpen: true,
			errors: [],
			isLoading: false,
			stayUrls: [],
		}
	},
	methods: {
		saveStaysImg(imgUrl) {
			this.stayUrls.push(imgUrl)
		},
		async saveStay() {
			this.stayToAdd.host = {
				_id: this.loggedInUser._id,
				fullname: this.loggedInUser.fullname,
				imgUrl: this.loggedInUser.imgUrl,
			}

			if (this.errors.length) return
			this.stayToAdd.imgUrls = this.stayUrls
			try {
				this.isLoading = true
				await this.$store.dispatch({ type: 'saveStay', stay: this.stayToAdd })
				this.isLoading = false

				showMsg('Stay added!')
			} catch (err) {
				showMsg('Stay add failed', 'error')
			}

			this.$emit('close', false)
		},
		closeAdd() {
			this.$emit('close', false)
		},
		checkErrors() {
			if (this.stayToAdd.price <= 0) {
				let err = 'Above 0 please in price field'
				if (!this.errors.includes(err)) {
					this.errors.push(err)
				}
			} else {
				const idx = this.errors.findIndex(e => e === 'Above 0 please in price field')
				this.errors.splice(idx, 1)
			}

			if (this.stayToAdd.accommodates <= 0) {
				let err = 'Above 0 please in guests field'
				if (!this.errors.includes(err)) {
					this.errors.push(err)
				}
			} else {
				const idx = this.errors.findIndex(e => e === 'Above 0 please in guests field')
				this.errors.splice(idx, 1)
			}
			if (!this.stayToAdd.name) {
				let err = 'Please fill stay name'
				if (!this.errors.includes(err)) {
					this.errors.push(err)
				}
			} else {
				const idx = this.errors.findIndex(e => e === 'Please fill stay name')
				this.errors.splice(idx, 1)
			}
		},
	},
	computed: {
		loggedInUser() {
			return this.$store.getters.loggedinUser
		},
		nameError() {
			return {
				error: this.errors.includes('Please fill stay name'),
			}
		},
		priceError() {
			return {
				error: this.errors.includes('Above 0 please in price field'),
				'add-price': true,
			}
		},
		accError() {
			return {
				error: this.errors.includes('Above 0 please in guests field'),
				'add-price': true,
			}
		},
	},
	async created() {
		if (this.stay && this.stay._id) {
			this.isLoading = true
			this.stayToAdd = await stayService.getById(this.stay._id)
			this.isLoading = false
		} else {
			this.stayToAdd = stayService.getEmptyStay()
		}
	},
}
</script>
