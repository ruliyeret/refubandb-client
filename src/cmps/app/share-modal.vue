<template>
  <section @click.stop class="share-modal">
    <button class="close-btn" @click.stop="close">
      <span class="material-icons">
        close
      </span>
    </button>
    <h2>Share this place with friends and family</h2>
    <div class="stay-info">
      <div v-if="currStay" class="img">
        <img :src="currStay.imgUrls[0]" alt="" />
      </div>
      <p>{{ currStay.name }}-{{ currStay.summary }}</p>
    </div>
    <div class="share-container">
      <div class="social-media">
        <h4>Social Media</h4>
        <div class="buttons-container">
          <ShareNetwork
            network="facebook"
            :url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to RefuBNB! A brand new, easy to use booking website."
            :description="`Check out this awesome i found on RefuBNB!`"
            quote="This site is amazing for booking trips"
            hashtags="RefuBNB"
          >
            <img
              src="@/assets/nc-socials/colored/svgs/social-color-1_logo-facebook.svg"
              alt=""
            />
            Facebook
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
            description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
            quote="The hot reload is so fast it\'s near instant. - Evan You"
            hashtags="vuejs,vite"
          >
            <img
              src="@/assets/nc-socials/colored/svgs/social-color-1_logo-twitter.svg"
              alt=""
            />
            Twitter
          </ShareNetwork>
          <ShareNetwork
            network="linkedin"
            url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
            description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
            quote="The hot reload is so fast it\'s near instant. - Evan You"
            hashtags="vuejs,vite"
          >
            <img
              src="@/assets/nc-socials/colored/svgs/social-color-1_logo-linkedin.svg"
              alt=""
            />
            LinkedIn
          </ShareNetwork>
        </div>
      </div>
      <div class="messaging-email">
        <h4>Messaging & Email</h4>
        <div class="buttons-container">
          <ShareNetwork
            network="whatsapp"
            url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to RefuBNB! A brand new, easy to use booking website."
            :description="`Check out this awesome i found on RefuBNB!`"
            hashtags="RefuBNB"
          >
            <img
              src="@/assets/nc-socials/colored/svgs/social-color-1_logo-whatsapp.svg"
              alt=""
            />
            Whatsapp
          </ShareNetwork>
          <ShareNetwork
            network="email"
            :url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to RefuBNB! A brand new, easy to use booking website."
            :description="`Check out this awesome i found on RefuBNB!`"
            quote="This site is amazing for booking trips"
            hashtags="RefuBNB"
          >
            <img src="@/assets/nc-socials/colored/svgs/email.svg" alt="" />Email
          </ShareNetwork>

          <ShareNetwork
            network="sms"
            :url="'http://127.0.0.1:8080/#/stay/ + stay._id'"
            title="Say hi to RefuBNB! A brand new, easy to use booking website."
            :description="`Check out this awesome i found on RefuBNB!`"
            quote="This site is amazing for booking trips"
            hashtags="RefuBNB"
          >
            <img src="@/assets/nc-socials/colored/svgs/sms.svg" alt="" />
            SMS
          </ShareNetwork>
        </div>
      </div>
      <div class="copy">
        <button
          @click.stop
          type="button"
          v-clipboard:copy="currPageUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <span @click.stop="onCopy" class="material-icons-outlined">
            content_copy
          </span>
          Copy link
        </button>
        <input type="text" v-model="currPageUrl" />
      </div>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      currPageUrl: null,
      currStay: null,
    }
  },
  computed: {},
  methods: {
    onCopy: function(e) {
      showMsg('Coppied to clipboard')
    },
    onError: function(e) {
      console.log('Failed to copy the text to the clipboard', e)
    },
    close() {
      this.$emit('toggleShare', false)
    },
  },
  created() {
    this.currPageUrl = this.$route.fullPath
    this.currStay = this.$store.getters.watchedStay
  },
}
</script>
