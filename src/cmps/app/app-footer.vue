<template>
  <footer>
    <ul class="left">
      <li>
        © 2021 RefuBNB, Inc.
      </li>
      <li>
        <router-link to="/stay">
          Explore
        </router-link>
      </li>

      <li>
        <router-link :to="'/profile/' + userId">
          Profile
        </router-link>
      </li>
    </ul>

    <ul class="right">
      <li class="lang" @click.stop="toggleI18NLangModal">
        <span class="material-icons">
          language
        </span>
        <small>
          English (US)
        </small>
      </li>
      <li class="coin" @click.stop="toggleI18NCurrencyModal">
        <span>
          $
        </span>
        <small>
          USD
        </small>
      </li>
      <li>
        <router-link to="/about">
          <font-awesome-icon class="icon" :icon="facebook" />
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <font-awesome-icon class="icon" :icon="twitter" />
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <font-awesome-icon class="icon" :icon="instagram" />
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
export default {
  data() {
    return {
      facebook: faFacebookF,
      twitter: faTwitter,
      instagram: faInstagram,
    }
  },
  methods: {
    toggleI18NCurrencyModal() {
      console.log('i18n coin')
    },
    toggleI18NLangModal() {
      console.log('i18n lang')
    },
  },
  computed: {
    userId() {
      const user = this.$store.getters.loggedinUser
      if (user) return user._id
      return ''
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>
