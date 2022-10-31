<template>
  <section>
    <section class="stay-list" v-if="stays.length">
      <section
        v-for="stay in matchingStays"
        :key="stay._id"
        class="stay-preveiw-container"
      >
        <!-- <wishlist-preview @click.stop :stay="stay"></wishlist-preview> -->
        <stay-preview @click.stop :stay="stay"></stay-preview>
      </section>
    </section>
    <section v-else>No Available places</section>
  </section>
</template>

<script>
import stayPreview from '@/cmps/list/stay-preview'
export default {
  components: { stayPreview },
  props: { stays: Array },

  computed: {
    matchingStays() {
      return this.stays.filter((stay) =>
        stay.wishlistedBy.includes(this.$store.getters.loggedinUser._id)
      )
    },
  },
}
</script>
