<template>
  <section v-if="!isLoading">
    <ul class="profile-stay-table">
      <li class="table-header">
        <div class="name">Name</div>
        <div class="city">City</div>
        <div class="price">Price/Night</div>
        <div>Actions</div>
      </li>
      <li v-for="(stay, idx) in stays" :key="stay._id" class="table-row">
        <div>{{ stay.name }}</div>
        <div>{{ stay.loc.address.split(',')[0] }}</div>
        <div>{{ formattedPrice(stay.price) }}</div>
        <div class="actions-td">
          <button @click.stop="toggleActionsModal(idx)" class="actionsBtn">
            <span class="material-icons">
              more_horiz
            </span>
            <div
              @click.stop
              class="actionsModal"
              v-if="isActionsModalOpen && num === idx"
            >
              <button class="edit-btn" @click.stop="onEditStay(stay)">
                Edit
              </button>
              <button class="delete-btn" @click.stop="onRemoveStay(stay)">
                Delete
              </button>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { showMsg } from '@/services/event-bus.service.js'

export default {
  components: { FontAwesomeIcon },
  props: { stays: Array },
  data() {
    return {
      isActionsModalOpen: false,
      num: -2,
      isLoading: false,
    }
  },
  created() {
    window.addEventListener('click', this.bodyClick)
  },
  methods: {
    formattedPrice(price) {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      return formatter.format(price)
    },
    async onRemoveStay(stay) {
      try {
        this.isLoading = true
        this.$store.dispatch({ type: 'removeStay', stayId: stay._id })
        this.isLoading = false

        showMsg('Stay removed successfully')
      } catch (err) {
        setTimeout
        showMsg('Stay remove failed', 'error')
      }
    },
    onEditStay(stay) {
      this.$emit('edit-stay', stay)
    },
    toggleActionsModal(idx) {
      this.num = idx
      this.isActionsModalOpen = !this.isActionsModalOpen
    },
    bodyClick() {
      this.isActionsModalOpen = false
    },
  },
}
</script>

<style></style>
