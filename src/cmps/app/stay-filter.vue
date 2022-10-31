<template>
  <div class="filter-container">
    <form action="" @submit.prevent="search">
      <div class="loc-input">
        <small>Location</small>
        <input
          type="text"
          list="city-options"
          placeholder="Where are you going"
          v-model="filterBy.city"
        />
        <datalist id="city-options" v-if="correctCitySearched">
          <option>Amsterdam</option>
          <option>Tokyo</option>
          <option>New York</option>
          <option>Paris</option>
        </datalist>
        <div v-else class="no-data">No Data</div>
      </div>
      <span class="seperator">|</span>
      <div class="checkin-input">
        <small>Check in</small>
        <span>{{ dates[0] | moment('MMM, D') }}</span>
        <input type="text" v-model="dates[0]" />
      </div>
      <date-picker v-model="dates" range value-type="timestamp"></date-picker>
      <span class="seperator">|</span>
      <div class="checkout-input">
        <small>Check out</small>
        <span>{{ dates[1] | moment('MMM, D') }}</span>
        <input type="text" v-model="dates[1]" />
      </div>
      <span class="seperator">|</span>
      <div class="guests-input" @click="toggleGuestsModal">
        <div class="Guests-container">
          <small>Guests</small>
          <input type="text" placeholder="Add guests" />
        </div>
        <div>
          <button class="search-btn" @click.stop>
            <p>Search</p>
            <img src="@/assets/imgs/search_white_24dp.svg" />
          </button>
        </div>
        <div class="guests-modal" v-if="isGuestsModalOpen" @click.stop>
          <div class="type">
            <div class="details">
              <p>Adults</p>
              <span>Ages 13 or above</span>
            </div>
            <el-input-number
              v-model="adults"
              :min="0"
              :max="100"
            ></el-input-number>
          </div>
          <div class="type">
            <div class="details">
              <p>Children</p>
              <span>Ages 2-12</span>
            </div>
            <el-input-number
              v-model="children"
              :min="0"
              :max="100"
            ></el-input-number>
          </div>
          <div class="type">
            <div class="details">
              <p>Infants</p>
              <span>under 2</span>
            </div>
            <el-input-number
              v-model="infants"
              :min="0"
              :max="100"
            ></el-input-number>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  data() {
    return {
      dates: [Date.now(), Date.now() + 1000],
      adults: 0,
      children: 0,
      infants: 0,
      isGuestsModalOpen: false,
      filterBy: {
        price: [0, 1500],
        types: [],
        amenities: [],
        city: '',
      },
    }
  },
  computed: {
    correctCitySearched() {
      const regex = new RegExp(this.filterBy.city, 'i')
      const cities = ['Amsterdam', 'Tokyo', 'New York', 'Paris']
      return cities.some((city) => regex.test(city))
    },
  },
  methods: {
    toggleGuestsModal() {
      this.isGuestsModalOpen = !this.isGuestsModalOpen
    },
    async search() {
      let numOfGuests = this.adults + this.children + this.infants
      this.$store.commit({ type: 'setFilter', filterBy: this.filterBy })
      this.$router.push('/stay')
      this.adults = 0
      this.children = 0
      this.infants = 0
    },
  },
  components: {
    DatePicker,
  },
}
</script>
