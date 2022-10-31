<template>
  <section @click.stop class="signup-modal">
    <div class="signup-header">
      <button @click.stop="toggleSignUp">
        <span class="material-icons">
          close
        </span>
      </button>
      <p>Sign up</p>
    </div>
    <div class="signup-input">
      <div class="input-txt">
        <h2>Welcome to RefuBNB</h2>
      </div>
      <form @submit.prevent="signUp">
        <input
          type="text"
          placeholder="Enter email or username"
          v-model="userCred.username"
        />
        <input
          type="text"
          placeholder="enter full name"
          v-model="userCred.fullname"
        />
        <input
          type="password"
          placeholder="Enter password"
          v-model="userCred.password"
        />
        <button class="checkout-btn" ref="myBtn">
          <vue-loaders-ball-clip-rotate-multiple
            color="white"
            v-if="isLoading"
            style="height:23px; top:-7px;"
          />
          <span v-else>Continue</span>
        </button>
      </form>
      <div class="move-login-button">
        <small
          >Already have a user? click here to
          <button @click.stop="moveToLogin">login</button></small
        >
      </div>
    </div>
    <div class="signup-divider">
      <div class="border"></div>
      <small>or</small>
    </div>
    <div class="login-socials">
      <button @click.stop="loginWithFacebook">
        <span class="material-icons" style="color:#4267B2;"> facebook </span
        >Continue with Facebook
      </button>
      <button @click.stop="loginWithGoogle">
        <img src="@/assets/imgs/svgs/google.svg" alt="" />
        Continue with Google
      </button>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service'
export default {
  data() {
    return {
      userCred: {
        username: '',
        fullname: '',
        password: '',
      },
      isLoading: false,
    }
  },
  methods: {
    toggleSignUp() {
      this.$emit('toggleSignUp', false)
    },
    async signUp() {
      try {
        this.isLoading = true
        await this.$store.dispatch({
          type: 'signup',
          userCred: this.userCred,
        })
        this.isLoading = false
        this.toggleSignUp()
        showMsg('Signed up successfully!')
      } catch (err) {
        showMsg('Sign up failed!', 'error')
      }
    },
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          var userInfo = {
            loginType: 'google',
            google: {
              auth: GoogleUser.getAuthResponse(),
              user: {
                name: GoogleUser.getBasicProfile().getName(),
                email: GoogleUser.getBasicProfile().getEmail(),
                profileImage: GoogleUser.getBasicProfile().getImageUrl(),
              },
            },
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    loginWithFacebook() {
      window.FB.login(response => {
        if (response && response.authResponse) {
          console.log('response', response)
          var userInfo = {
            loginType: 'fb',
            fb: {
              auth: response.authResponse,
            },
          }
          this.$store.commit('setLoginUser', userInfo)
          window.FB.api(
            `/${response.authResponse.userID}`,
            userResponse => {
              if (userResponse) {
                console.log(userResponse)
                var userInfo = {
                  loginType: 'fb',
                  fb: {
                    auth: response.authResponse,
                    user: userResponse,
                  },
                }
                this.$store.commit('setLoginUser', userInfo)
              }
            },
            this.params
          )
          router.push('/')
        }
      }, this.params)
    },
    moveToLogin() {
      this.$emit('moveToLogin', true)
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
