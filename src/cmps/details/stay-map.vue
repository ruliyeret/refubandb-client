<template>
  <section class="stay-map">
    <h2>Where you'll be</h2>
    <p>{{ address }}</p>
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      style="width: 100%; height: 500px"
      :zoom="16"
      map-type-id="terrain"
      ref="mapRef"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
        :icon="{ url: require('@/assets/imgs/marker.png') }"
      />
    </GmapMap>
  </section>
</template>

<script>
export default {
  props: { loc: Object },
  data() {
    return {
      markers: [{ position: { lat: this.loc.lat, lng: this.loc.lng } }],
    }
  },
  computed: {
    address() {
      return this.loc.countryCode === 'NY'
        ? this.loc.address + ' United States'
        : this.loc.address
    },
  },
  methods: {},
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      map.panTo({ lat: this.loc.lat, lng: this.loc.lng })
    })
  },
}
</script>
