<template>
  <section class="stay-card-container">
    <div class="wishlist-img-container">
      <img v-if="stay.imgUrls[0]" :src="stay.imgUrls[0]" alt="" />
      <img v-else :src="require('@/assets/imgs/no_img.jpeg')" />
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: { stay: Object },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {},
}
</script>
