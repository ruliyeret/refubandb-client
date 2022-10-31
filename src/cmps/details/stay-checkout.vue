<template>
  <section class="stay-checkout">
    <section class="checkout-header">
      <p>
        <span class="price">${{ price }}</span
        >/night
      </p>
      <p>
        <i class="el-icon-star-on"></i>
        <span>{{ avg }} </span>
        <span> ({{ reviews.length }} reviews)</span>
      </p>
    </section>
    <section class="pickers">
      <div class="block">
        <el-date-picker
          style="width:100%;"
          v-model="dates"
          type="daterange"
          range-separator=""
          start-placeholder="Check-in"
          end-placeholder="Checkout"
          ref="myDatePicker"
        >
        </el-date-picker>
      </div>
      <div class="guests" @click.stop="toggleGuestModal">
        <p>Guests</p>
        <div class="control">
          <span class="guestsCount">{{ totalGuests }} guests</span>
        </div>
        <span class="material-icons arrow" :class="{ flip: isGuestsModalOpen }">
          arrow_forward_ios
        </span>
      </div>
      <div
        class="guests-modal guest-details"
        v-if="isGuestsModalOpen"
        @click.stop
      >
        <div class="type">
          <div class="details adult">
            <p>Adults</p>
          </div>
          <div class="counter">{{ this.adults }}</div>
          <el-input-number
            class="adult"
            v-model="adults"
            :min="0"
            :max="accommodates"
          ></el-input-number>
        </div>
        <div class="type">
          <div class="details">
            <p>Children</p>
            <span>Ages 2-12</span>
          </div>
          <div class="counter">{{ this.children }}</div>

          <el-input-number
            v-model="children"
            :min="0"
            :max="accommodates"
          ></el-input-number>
        </div>
        <div class="type">
          <div class="details">
            <p>Infants</p>
            <span>under 2</span>
          </div>
          <div class="counter">{{ this.infants }}</div>

          <el-input-number
            v-model="infants"
            :min="0"
            :max="100"
          ></el-input-number>
        </div>
      </div>
    </section>
    <button ref="myBtn" class="checkout-btn" @click.stop="checkout">
      <vue-loaders-ball-clip-rotate-multiple
        color="white"
        v-if="isLoading"
        style="height:23px; top:-7px;"
      />
      <span v-else>{{ checkoutBtnTxt }}</span>
    </button>
    <section v-if="dates" class="reservation-data">
      <div class="charges-data">
        <small>You won't be charged yet</small>
        <div class="charges">
          <p>Accomodation</p>
          <p>{{ computedPrice.accomodation }}</p>
        </div>
        <div class="charges">
          <p>Service fee</p>
          <p>{{ computedPrice.service }}</p>
        </div>
      </div>
      <div class="total">
        <p>Total</p>
        <p>{{ computedPrice.total }}</p>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: { reviews: Array, price: Number, accommodates: Number },
  created() {
    window.addEventListener('click', this.bodyClick)
  },
  destroyed() {
    window.addEventListener('click', this.bodyClick)
  },
  data() {
    return {
      isLoading: false,
      isGuestsModalOpen: false,
      shortcuts: [
        {
          text: 'Last week',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          })(),
        },
        {
          text: 'Last month',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          })(),
        },
        {
          text: 'Last 3 months',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          })(),
        },
      ],
      dates: '',
      adults: 1,
      children: 0,
      infants: 0,
    }
  },
  computed: {
    avg() {
      const sum = this.reviews.reduce((acc, review) => {
        return acc + review.rate
      }, 0)
      if (sum === 0) return 0
      return (sum / this.reviews.length).toFixed(1)
    },
    checkoutBtnTxt() {
      return this.dates ? 'Reserve' : 'Check availabilty'
    },
    computedPrice() {
      const checkin = this.dates[0].getTime()
      const checkout = this.dates[1].getTime()
      const days = (checkout - checkin) / 1000 / 60 / 60 / 24
      const accomodation = this.price * days
      const service = accomodation / 10
      const total = accomodation + service

      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })

      return {
        accomodation: formatter.format(accomodation),
        service: formatter.format(service),
        total: formatter.format(total),
        totalNumber: total,
      }
    },
    totalGuests() {
      return this.adults + this.children
    },
  },
  methods: {
    decGuests() {
      if (this.guestsCount > 1) {
        this.guestsCount--
      }
    },
    incGuests() {
      if (this.guestsCount < this.accommodates) {
        this.guestsCount++
      }
    },
    checkout() {
      if (!this.dates) {
        this.$refs.myDatePicker.focus()
        return
      }
      this.$emit('checkout', {
        dates: this.dates,
        guests: this.totalGuests,
        total: this.computedPrice.totalNumber,
      })
      this.isLoading = true
      this.$refs.myBtn.disabled = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      setTimeout(() => {
        this.$refs.myBtn.disabled = false
      }, 10000)
    },
    toggleGuestModal() {
      this.isGuestsModalOpen = !this.isGuestsModalOpen
    },
    bodyClick() {
      this.isGuestsModalOpen = false
    },
  },
  mounted() {
    this.$refs.myBtn.onmousemove = e => {
      const x = e.offsetX
      const y = e.offsetY

      e.target.style.setProperty('--x', `${x}px`)
      e.target.style.setProperty('--y', `${y}px`)
    }
  },
}
</script>

<style>
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #ccc;
}

.el-date-editor .el-range__icon {
  display: none;
}

.el-date-editor .el-range__icon {
  display: none !important;
}

.el-date-range-picker .el-picker-panel__body {
  padding: 20px;
}
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #f3f3f3;
}

.el-date-table td.available:hover {
  color: #222 !important;
}

.el-date-editor .el-range-separator {
  padding-top: 15px;
  color: #222 !important;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #ccc;
}

.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
  justify-content: space-between !important;
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
  border: 1px solid #ccc;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 70px;
}

.el-date-table td.end-date span,
.el-date-table td.start-date span {
  background-color: #222;
  color: #fff !important;
  font-weight: 500;
}

td.today span {
  color: #222 !important;
  font-weight: 700;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #ccc !important;
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #f1f1f1 !important;
}
</style>
