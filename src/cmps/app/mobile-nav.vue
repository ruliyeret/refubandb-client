<template>
  <section class="mobile-nav">
    <ul>
      <li @click.stop="goToHome">
        <span class="material-icons-outlined"> home </span>Home
      </li>
      <li @click.stop="goToList">
        <span class="material-icons-outlined"> search </span>Explore
      </li>
      <li>
        <span @click.stop="goToWishlist" class="material-icons-outlined">
          favorite_border</span
        >Wishlist
      </li>
      <li @click.stop="openProfile">
        <span class="material-icons-outlined"> account_circle </span
        >{{ profile }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    profile() {
      return this.$store.getters.loggedinUser ? 'Profile' : 'Log in'
    },
    userId() {
      const user = this.$store.getters.loggedinUser
      if (user && user?._id) {
        return user._id
      } else {
        return ''
      }
    },
  },
  methods: {
    openProfile() {
      if (!this.userId) {
        this.$emit('bottom', true)
        this.$emit('toggleLogin', true)
      } else {
        this.$router.push('/profile/' + this.userId)
      }
    },
    goToList() {
      this.$router.push('/stay')
    },
    goToWishlist() {
      this.$router.push('/wishlist/' + this.userId)
    },
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>
