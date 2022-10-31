<template>
  <section class="stay-card-container" @click.stop="sendToDetails(stay._id)">
    <button class="wishlist-btn">
      <span
        v-if="!onWishlist"
        class="material-icons-two-tone"
        @click.stop="toggleWishlist(stay._id)"
      >
        favorite
      </span>
      <span
        @click.stop="toggleWishlist(stay._id)"
        v-else
        class="in-list material-icons-outlined"
      >
        favorite
      </span>
    </button>
    <el-carousel
      v-if="stay.imgUrls.length"
      class="img-carousell"
      trigger="click"
      arrow="always"
      height="170px"
      :autoplay="false"
      :loop="true"
    >
      <el-carousel-item v-for="(imgUrl, idx) in stay.imgUrls" :key="idx">
        <img :src="imgUrl" />
      </el-carousel-item>
    </el-carousel>
    <img v-else :src="require('@/assets/imgs/no_img.jpeg')" />
    <div class="card-rating">
      <p>
        <span class="material-icons star-icon"> star </span>{{ avgRate }}
        <small>
          <span class="card-rate">({{ stay.reviews.length }})</span></small
        >
      </p>
    </div>
    <div class="card-location">{{ stay.propertyType }} &middot; {{ city }}</div>
    <div class="card-name">{{ stay.name.substring(0, 30) + '...' }}</div>
    <div class="card-price">
      <p>
        <span>${{ stay.price }}</span
        >/night
      </p>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service.js'
export default {
  props: {
    stay: Object,
  },
  data() {
    return {
      onWishlist: false,
    }
  },
  methods: {
    sendToDetails(stayId) {
      this.$router.push(`/stay/${stayId}`)
    },
    toggleWishlist(stayId) {
      this.onWishlist = !this.onWishlist
      this.$store.dispatch({ type: 'toggleWishlistItem', stayId })
      if (this.onWishlist) {
        showMsg('Added to wishlist')
      } else {
        showMsg('Removed from wishlist')
      }
    },
  },
  computed: {
    city() {
      return this.stay.loc.address.split(',')[0]
    },
    avgRate() {
      if (!this.stay.reviews.length) return 0
      const sum = this.stay.reviews.reduce((acc, review) => {
        return acc + review.rate
      }, 0)
      return (sum / this.stay.reviews.length).toFixed(1)
    },
    isWishedClass() {
      const idx = this.stay.wishlistedBy.findIndex(
        (userId) => userId === this.$store.getters.loggedinUser._id
      )
      if (idx === -1) {
        return {
          isWished: false,
        }
      }
      return {
        isWished: true,
      }
    },
  },
  created() {},
}
</script>

<style></style>
