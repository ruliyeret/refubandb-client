<template>
  <div v-if="isProfileModalOpen" class="profile-menu" @click.stop="closeModal">
    <router-link :to="'/profile/' + userId" v-if="isLoggedinUser">
      <span>Profile</span
      ><span class="in-menu-notification" v-if="notifications"></span>
    </router-link>
    <button v-if="!isLoggedinUser" @click.stop="toggleLogin">Login</button>
    <button v-if="!isLoggedinUser" @click.stop="toggleSignUp">Signup</button>
    <router-link :to="'/wishlist/' + userId" v-if="isLoggedinUser">
      <span>Wishlist</span>
    </router-link>
    <button @click.stop="addStay">Host your home</button>
    <button v-if="isLoggedinUser" @click.stop="logout">Logout</button>
  </div>
</template>

<script>
export default {
  props: {
    isProfileModalOpen: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
    toggleLogin() {
      this.$emit('toggleLogin', true)
      this.$emit('closeModal', false)
    },
    toggleSignUp() {
      this.$emit('toggleSignUp', true)
    },
    addStay() {
      this.$emit('addStay')
      this.$emit('closeModal', false)
    },
    logout() {
      this.$emit('logout')
      this.$emit('closeModal', false)
    },
  },
  computed: {
    userId() {
      const user = this.$store.getters.loggedinUser
      if (user && user?._id) {
        return user._id
      } else {
        return ''
      }
    },
    isLoggedinUser() {
      return this.$store.getters.loggedinUser
    },
    notifications() {
      return this.$store.getters.notificationsCount
    },
  },
}
</script>

<style></style>
