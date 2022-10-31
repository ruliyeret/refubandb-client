<template>
  <ul>
    <li class="table-header">
      <div v-if="showActions">Guest</div>
      <div>Stay</div>
      <div>{{ sentOrRecieved }}</div>
      <div>Check-In</div>
      <div>Check-Out</div>
      <div>Status</div>
    </li>
    <li v-for="order in orders" :key="order._id" class="table-row">
      <div v-if="showActions" :class="{ orders: showActions }">
        <img :src="order.buyer.imgUrl" />
        {{ longText(buyer(order)) }}
      </div>
      <div :class="{ orders: showActions }">
        {{ longText(order.stay.name) }}
      </div>
      <div :class="{ orders: showActions }">
        {{ order.createdAt | moment('from') }}
      </div>
      <div :class="{ orders: showActions }">
        {{ order.startDate | moment('MM/DD/YY') }}
      </div>
      <div :class="{ orders: showActions }">
        {{ order.endDate | moment('MM/DD/YY') }}
      </div>
      <div
        :class="{
          warning: order.status === 'pending',
          error: order.status === 'rejected',
          success: order.status === 'approved',
          orders: showActions,
        }"
        v-if="!showActions"
      >
        {{ order.status }}
      </div>
      <div
        v-if="showActions"
        :class="{
          warning: order.status === 'pending',
          error: order.status === 'rejected',
          success: order.status === 'approved',
          orders: showActions,
        }"
      >
        <button
          :class="{
            approve: true,
            warning: order.status === 'pending',
            error: order.status === 'rejected',
            success: order.status === 'approved',
          }"
          @click="changeOrderStatus(order, 'approved')"
          v-if="order.status === 'pending'"
        >
          <font-awesome-icon :icon="check" />
        </button>
        <button
          :class="{
            reject: true,
            warning: order.status === 'pending',
            error: order.status === 'rejected',
            success: order.status === 'approved',
          }"
          @click="changeOrderStatus(order, 'rejected')"
          v-if="order.status === 'pending'"
        >
          <font-awesome-icon :icon="times" />
        </button>
        <span v-if="order.status !== 'pending'">{{ order.status }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { showMsg } from '@/services/event-bus.service.js'

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
export default {
  components: { FontAwesomeIcon },
  props: { orders: Array, stays: Array, showActions: Boolean },
  data() {
    return {
      localOrders: this.orders || [],
      check: faCheck,
      times: faTimes,
      isActionsShown: true,
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    sentOrRecieved() {
      if (this.loggedInUser._id === this.orders[0].buyer._id) {
        return 'Sent At'
      }
      return 'Recieved At'
    },
  },
  methods: {
    async changeOrderStatus(order, newStatus) {
      try {
        order.status = newStatus
        const stay = this.stays.find(s => s._id === order.stay._id)
        await this.$store.dispatch({
          type: 'saveOrder',
          order,
          stay,
        })
        showMsg('order status updated')
      } catch (err) {
        showMsg('Order edit failed')
      }
    },
    buyer(order) {
      if (order?.buyer) {
        return order.buyer.fullname
      }
      return this.loggedInUser.fullname
    },
    longText(txt) {
      if (txt.length < 10) return txt
      return txt.substring(0, 10) + '...'
    },
  },
}
</script>
