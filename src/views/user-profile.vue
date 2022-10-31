<template>
  <section v-if="loggedInUser" class="user-profile-container">
    <div class="profile-header">
      <nav>
        <ul>
          <li @click="openProfile" :class="{ acitve: profileOpen }">Profile</li>
          <li @click="openDashboard" :class="{ acitve: dashboardOpen }">
            Dashboard
          </li>
        </ul>
      </nav>
    </div>
    <profile-dashboard
      v-if="dashboardOpen"
      :totalEarnings="totalEarnings"
      :stays="staysOfLoggedinUser"
      :orders="ordersToLoggedinUser"
    />
    <profile-inbox v-if="inboxOpen" />
    <section class="user-profile" v-if="loggedInUser && profileOpen">
      <section class="profile-card">
        <div>
          <section class="img-upload-container">
            <img
              v-if="isLoading"
              class="loading"
              src="https://i.pinimg.com/originals/f6/65/6a/f6656aa6fdb6b8f905dea0bcc2d71dd8.gif"
              alt=""
            />
            <label v-else>
              <img :src="loggedInUser.imgUrl" alt="" />
              <input @change="onUploadImg" type="file" id="imgUpload" hidden />
              <p>update photo</p>
            </label>
          </section>
        </div>
        <div>
          <button class="add-stay" @click.stop="openModal">Add New Stay</button>
          <button class="add-stay logout" @click.stop="logout">Log out</button>
        </div>
      </section>
      <stay-add v-if="isModalOpen" @close="closeModal" :stay="stay" />
      <section class="data" v-else>
        <section class="stays-table">
          <h2>My assets:</h2>
          <profile-filter :isStaysFilter="true" @filter="setStaysFilter" />
          <profile-stay-table :stays="computedStays" @edit-stay="editStay" />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { uploadImg } from '@/services/img-upload.service.js'
import profileFilter from '@/cmps/profile/profile-filter'
import stayAdd from '@/cmps/profile/stay-add'
import profileTable from '@/cmps/profile/profile-table'
import ProfileStayTable from '@/cmps//profile/profile-stay-table'
import profileDashboard from '@/cmps/profile/profile-dashboard'
import profileInbox from '@/cmps/profile/profile-inbox'

export default {
  components: {
    profileFilter,
    stayAdd,
    profileTable,
    ProfileStayTable,
    profileDashboard,
    profileInbox,
  },
  data() {
    return {
      isModalOpen: false,
      profileOpen: true,
      dashboardOpen: false,
      inboxOpen: false,
      isLoading: false,

      staysFilterBy: {
        name: '',
        country: '',
      },
      imgUrl: '',
      stay: null,
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.status === 'pending') {
        return 'warning-row'
      } else if (row.status === 'rejected') {
        return 'error-row'
      } else if (row.status === 'approved') {
        return 'success-row'
      }
      return ''
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    setStaysFilter(filterBy) {
      this.staysFilterBy = filterBy
    },
    openModal() {
      this.isModalOpen = true
    },
    closeModal(val) {
      this.stay = null
      this.isModalOpen = val
    },

    async onUploadImg(ev) {
      this.isLoading = true
      const res = await uploadImg(ev)
      this.loggedInUser.imgUrl = res.url
      this.$store.dispatch({ type: 'updateUser', user: this.loggedInUser })
      this.isLoading = false
    },
    editStay(stay) {
      this.stay = stay
      this.openModal()
    },
    openProfile() {
      this.profileOpen = true
      this.dashboardOpen = false
      this.inboxOpen = false
    },
    openDashboard() {
      this.dashboardOpen = true
      this.profileOpen = false
      this.inboxOpen = false
    },
    openInbox() {
      this.inboxOpen = true
      this.profileOpen = false
      this.dashboardOpen = false
    },
    logout() {
      this.$emit('logout')
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    totalEarnings() {
      const totals = []
      for (let i = 0; i < 12; i++) {
        const orderTotal = this.ordersToLoggedinUser.reduce((acc, order) => {
          const month = new Date(order.startDate).getMonth()
          return i === month ? acc + order.total : acc
        }, 0)
        totals[i] = orderTotal
      }
      return totals
    },
    ordersToLoggedinUser() {
      const orders = this.$store.getters.orders.map(order => {
        if (
          order.host._id === this.loggedInUser._id &&
          this.loggedInUser._id !== order.buyer._id
        ) {
          return order
        }
      })
      return orders.filter(o => o)
    },
    allStays() {
      return this.$store.getters.stays
    },
    staysOfLoggedinUser() {
      return this.$store.getters.stays.filter(stay => {
        return this.loggedInUser._id === stay.host._id
      })
    },
    computedStays() {
      return this.allStays.filter(stay => {
        const regex = new RegExp(this.staysFilterBy.name, 'i')
        return (
          this.loggedInUser._id === stay.host._id &&
          (regex.test(stay.name) || regex.test(stay.country))
        )
      })
    },
  },
  async created() {
    window.scrollTo(0, 0)
    this.$emit('toggleLoading', true)
    this.$emit('scrolled', true)
    // this.$emit('hideSearch', true)

    if (this.$route.params && this.$route.params.becomeHost) {
      this.openModal()
    }

    await this.$store.dispatch({ type: 'loadStays' })
    await this.$store.dispatch({ type: 'loadOrders' })
    this.$emit('toggleLoading', false)
  },
  destroyed() {
    this.$emit('hideSearch', false)
  },
}
</script>
