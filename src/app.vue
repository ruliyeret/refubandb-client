<template>
  <div class="app main-layout">
    <app-header
      @toggleLogin="toggleLogin"
      @toggleSignUp="toggleSignUp"
      @logout="logout"
      @closeModal="closeModal"
      :isProfileModalOpen="isProfileModalOpen"
      @toggleProfile="toggleProfile"
      :class="{
        scrolled: isScrolled,
        hide: isSearchShown,
        remove: isHeaderRemoved,
      }"
    />
    <router-view
      @toggleLogin="toggleLogin"
      @scrolled="scrolled"
      @bottom="bottom"
      @screen="toggleScreen"
      :isScreenOpen="isScreenOpen"
      @hideSearch="hideSearch"
      @toggleShare="toggleShare"
      @toggleLoading="toggleLoading"
      @remove="hideHeader"
      @logout="logout"
    />
    <mobile-nav
      :class="{ bottom: isOnBottom }"
      @toggleProfile="toggleProfile"
      @toggleLogin="toggleLogin"
    />
    <app-footer />
    <div
      v-if="
        isLoginOpen || isSignupOpen || isScreenOpen || isShareShown || isLoading
      "
      class="screen"
    ></div>
    <vue-loaders-ball-pulse-sync
      color="transparent"
      class="main-loader"
      v-if="isLoading"
    />

    <login
      @toggleLogin="toggleLogin"
      @moveToSignup="toggleSignUp"
      v-if="isLoginOpen"
    />
    <signup
      v-if="isSignupOpen"
      @toggleSignUp="toggleSignUp"
      @moveToLogin="toggleLogin"
    />
    <share-modal
      v-if="isShareShown"
      @toggleShare="toggleShare"
      :class="{ share: isShareShown }"
    />
    <user-msg />
  </div>
</template>

<script>
import appHeader from './cmps/app/app-header.vue'
import appFooter from './cmps/app/app-footer.vue'
import userMsg from './cmps/app/user-msg.vue'
import login from './cmps/app/login.vue'
import signup from './cmps/app/signup.vue'
import shareModal from './cmps/app/share-modal.vue'
import { showMsg } from '@/services/event-bus.service'
import mobileNav from './cmps/app/mobile-nav.vue'
export default {
  data() {
    return {
      isScrolled: false,
      isProfileModalOpen: false,
      isSearchShown: false,
      isScreenOpen: false,
      isLoginOpen: false,
      isSignupOpen: false,
      headerClicked: true,
      isShareShown: false,
      isLoading: false,
      isOnBottom: false,
      scrolledToBottom: false,
      isHeaderRemoved: false,
    }
  },
  created() {
    window.addEventListener('click', this.bodyClick)
  },
  mounted() {
    this.scroll()
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(window.pageYOffset, document.documentElement.scrollTop) +
            window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.scrolledToBottom = true
          this.isOnBottom = true
        } else {
          this.isOnBottom = false
        }
      }
    },
    scrolled(val) {
      this.isScrolled = val
    },
    bottom(val) {
      this.isOnbottom = val
    },
    toggleLogin(val) {
      this.isLoginOpen = val
      this.isSignupOpen = false
    },
    toggleSignUp(val) {
      this.isSignupOpen = val
      this.isLoginOpen = false
    },
    toggleProfile() {
      this.isProfileModalOpen = !this.isProfileModalOpen
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: 'logout' })
        if (this.$route.fullPath.includes('profile')) {
          this.$router.push('/')
        }
        this.$store.commit({ type: 'clearNotifications' })
        showMsg('Logged out!')
      } catch (err) {
        showMsg('Logout failed!', 'error')
      }
    },
    closeModal(val) {
      this.isProfileModalOpen = val
    },
    hideSearch(val) {
      this.isSearchShown = val
    },
    bodyClick() {
      this.isLoginOpen = false
      this.isSignupOpen = false
      this.isProfileModalOpen = false
      this.isScreenOpen = false
    },
    toggleScreen(val) {
      this.isScreenOpen = val
    },
    toggleShare(val) {
      this.isShareShown = val
    },
    toggleLoading(val) {
      this.isLoading = val
    },
    hideHeader(val) {
      this.isHeaderRemoved = val
    },
  },
  components: {
    appHeader,
    appFooter,
    userMsg,
    login,
    signup,
    shareModal,
    mobileNav,
  },
}
</script>
