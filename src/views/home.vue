<template>
  <div class="homepage">
    <div class="shadow"></div>
    <div class="hero-container"></div>
    <img class="hero" src="@/assets/imgs/home-page/hero2.jpeg" />
    <div class="flexible">
      <p>Not sure where to go? Perfect.</p>
      <button @click="goToList"><span>Explore now</span></button>
    </div>
    <h2>Live anywhere</h2>
    <div class="categories">
      <div class="card">
        <router-link :to="'/stay/q/' + 'Paris'">
          <div class="img">
            <img
              src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt=""
            />
          </div>
          <h3>Paris</h3>
        </router-link>
      </div>
      <div class="card">
        <router-link :to="'/stay/q/' + 'New York'">
          <div class="img">
            <img
              src="https://images.unsplash.com/photo-1605617697069-959ec9dfc9de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1119&q=80"
              alt=""
            />
          </div>
          <h3>New York</h3>
        </router-link>
      </div>
      <div class="card">
        <router-link :to="'/stay/q/' + 'Amsterdam'">
          <div class="img">
            <img
              src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt=""
            />
          </div>
          <h3>Amsterdam</h3>
        </router-link>
      </div>
      <div class="card">
        <router-link :to="'/stay/q/' + 'Tokyo'">
          <div class="img">
            <img
              src="https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt=""
            />
          </div>
          <h3>Tokyo</h3>
        </router-link>
      </div>
    </div>
<!--    <div class="wide-card">-->
<!--      <div class="desc">-->
<!--        <h3>The Olympic<span>Experience</span></h3>-->
<!--        <p>Find stays near the olympic village</p>-->
<!--        <button>-->
<!--          <router-link :to="'/stay/q/' + 'Tokyo'">Explore now</router-link>-->
<!--        </button>-->
<!--      </div>-->
<!--      <img src="@/assets/imgs/home-page/hero1.jpeg" alt="" />-->
<!--    </div>-->
  </div>
</template>

<script>
import { showMsg } from '../services/event-bus.service'
export default {
  data() {
    return {
      isScrolled: false,
      searching: false,
    }
  },
  name: 'Home',
  created() {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('click', this.bodyClick)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('click', this.bodyClick)
  },
  methods: {
    handleScroll(event) {
      let scrollDiff = event.path[1].scrollY
      if (scrollDiff >= 1) {
        this.isScrolled = true
        this.$emit('scrolled', true)
        this.$emit('hideSearch', false)
      } else if (scrollDiff < 1) {
        this.isScrolled = false
        this.$emit('scrolled', false)
      }
    },
    goToList() {
      this.$router.push('/stay')
    },
    search() {
      this.searching = true
    },
    bodyClick() {
      this.searching = false
    },
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    },
  },
}
</script>
