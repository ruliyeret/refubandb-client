<template>
  <div class="user-msg" v-if="alive" :class="alertClass">
    <div class="msg-container">
      <p>{{ msg.txt }}</p>
    </div>
    <button @click.stop="killMsg">
      <span class="material-icons">
        close
      </span>
    </button>
  </div>
</template>

<script>
import { eventBusService, SHOW_MSG } from '@/services/event-bus.service.js'
export default {
  created() {
    eventBusService.$on(SHOW_MSG, msg => {
      this.msg = msg
      var delay = msg.delay || 3500
      this.alive = true
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  methods: {
    killMsg() {
      this.alive = false
    },
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>
