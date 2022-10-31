<template>
  <section class="dashboard-container">
    <h2>Welcome back, {{ loggedInUser.username }}</h2>
    <section class="flex-container">
      <bar-chart class="chart" :totalEarnings="totalEarnings" />
      <section class="hosting-card">
        <section class="summary">
          <h3>Hosting Summary</h3>
          <h4>
            Fantastic job !
            <FontAwesomeIcon :icon="checkCircle" />
          </h4>
          <p>Guests love what your'e doing.</p>
          <p>Keep up the great work !</p>
        </section>
        <section class="statistics">
          <section class="general-info">
            <p>
              Assets you own: <span>{{ staysLength }}</span>
            </p>
            <p>
              Orders: <span>{{ sentOrdersLength }}</span>
            </p>
            <p>
              Reservations: <span>{{ recievedOrdersLength }}</span>
            </p>
          </section>
          <section class="general-details">
            <p>
              {{ currMonth }} earnings: <span>{{ currMonthEarnings }}</span>
            </p>
            <p>
              Overall rating:
              <span class="overall">
                <span class="material-icons"> star </span
                >{{ overallRating }}</span
              >
            </p>
            <p>
              Total reviews: <span>{{ reviewsCount }}</span>
            </p>
          </section>
        </section>
      </section>
    </section>
    <section class="orders-table">
      <h2>Orders:</h2>
      <profile-filter :isStaysFilter="false" @filter="setFilter" />
      <profile-table
        v-if="recievedOrders.length"
        :orders="recievedOrders"
        :stays="stays"
        :showActions="true"
      />
    </section>
    <section class="orders-table">
      <h2>My reservations:</h2>
      <profile-filter :isStaysFilter="false" @filter="setFilter" />
      <profile-table
        v-if="sentOrders.length"
        :orders="sentOrders"
        :showActions="false"
      />
    </section>
  </section>
</template>

<script>
import barChart from './bar-chart.vue'
import profileFilter from '@/cmps/profile/profile-filter'
import profileTable from '@/cmps/profile/profile-table'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
export default {
  components: { FontAwesomeIcon, barChart, profileFilter, profileTable },
  props: { totalEarnings: Array, orders: Array, stays: Array },
  data() {
    return {
      filterBy: {
        name: '',
        status: '',
      },
      reviewsCount: 0,
      checkCircle: faCheckCircle,
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    staysLength() {
      if (!this.$store.getters.orders.length) return 0
      return this.$store.getters.stays.reduce((acc, stay) => {
        return this.$store.getters.loggedinUser._id === stay.host._id
          ? acc + 1
          : acc
      }, 0)
    },
    sentOrdersLength() {
      if (!this.$store.getters.orders.length) return 0
      return this.$store.getters.orders.reduce((acc, order) => {
        return this.$store.getters.loggedinUser._id === order.buyer._id
          ? acc + 1
          : acc
      }, 0)
    },
    recievedOrdersLength() {
      if (!this.$store.getters.orders.length) return 0
      return this.$store.getters.orders.reduce((acc, order) => {
        return this.$store.getters.loggedinUser._id === order.host._id
          ? acc + 1
          : acc
      }, 0)
    },
    currMonth() {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][new Date().getMonth()]
    },
    currMonthEarnings() {
      const currMonth = new Date().getMonth()
      const total = this.orders
        .reduce((acc, order) => {
          const month = new Date(order.startDate).getMonth()
          return currMonth === month ? acc + order.total : acc
        }, 0)
        .toFixed(0)
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      return formatter.format(total)
    },
    sentOrders() {
      const orders = this.$store.getters.orders.map(order => {
        if (order.buyer._id === this.loggedInUser._id) {
          const regex = new RegExp(this.filterBy.name, 'i')
          if (
            order.status.includes(this.filterBy.status) &&
            regex.test(order.stay.name)
          ) {
            return order
          }
        }
      })
      return orders.filter(o => o)
    },
    recievedOrders() {
      const orders = this.$store.getters.orders.map(order => {
        if (
          order.host._id === this.loggedInUser._id &&
          this.loggedInUser._id !== order.buyer._id
        ) {
          const regex = new RegExp(this.filterBy.name, 'i')
          if (
            order.status.includes(this.filterBy.status) &&
            regex.test(order.stay.name)
          ) {
            return order
          }
        }
      })
      return orders.filter(o => o).reverse()
    },
    overallRating() {
      let reviews = []
      for (let i = 0; i < this.stays.length; i++) {
        let currStay = this.stays[i]
        for (let j = 0; j < currStay.reviews.length; j++) {
          reviews.push(currStay.reviews[j])
          this.reviewsCount++
        }
      }
      if (!reviews.length) return 0
      const sum = reviews.reduce((acc, review) => {
        return acc + review.rate || acc
      }, 0)
      return (sum / reviews.length).toFixed(1)
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
  },
  created() {
    window.scrollTo(0, 0)
  },
}
</script>
