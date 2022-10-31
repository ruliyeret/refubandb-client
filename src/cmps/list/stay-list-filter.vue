<template>
  <form class="filters">
    <!----------->
    <!-- price -->
    <!----------->
    <button ref="priceBtn" @click.stop="togglePrice">
      {{ pricePreview }}

      <div @click.stop.prevent class="price-modal" v-if="isPriceModalOpen">
        <el-slider
          style="color:black"
          v-model="filterBy.price"
          range
          :max="1500"
        >
        </el-slider>
        <div class="price-container">
          <input
            v-model="filterByLocal.price[0]"
            class="from-price"
            placeholder="From"
          />
          <input
            v-model="filterByLocal.price[1]"
            class="to-price"
            placeholder="To"
          />
        </div>
        <div class="button-container">
          <button @click.stop="clearFilter">Clear</button>
          <button @click.stop="setFilter">Update</button>
        </div>
      </div>
    </button>
    <!----------->
    <!-- types -->
    <!----------->
    <button @click.stop="toggleTypes">
      {{ stayTypePreview }}

      <div
        @click.stop
        class="types-modal"
        v-if="isTypesModalOpen"
        :style="{ left: typesPos }"
      >
        <div>
          <input
            v-model="filterByLocal.types"
            type="checkbox"
            value="Apartment"
            id="Apartment"
            @click.stop="typeChecked('isApratment')"
            class="checkbox"
          />
          <label for="Apartment">
            <span
              class="material-icons-outlined"
              v-if="typesChecked.isApratment"
            >
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Apartment
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.types"
            type="checkbox"
            value="Vila"
            id="Vila"
            @click="typeChecked('isVila')"
            class="checkbox"
          />
          <label for="Vila">
            <span class="material-icons-outlined" v-if="typesChecked.isVila">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Vila
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.types"
            type="checkbox"
            value="Hotel"
            id="Hotel"
            @click="typeChecked('isHotel')"
            class="checkbox"
          />
          <label for="Hotel">
            <span class="material-icons-outlined" v-if="typesChecked.isHotel">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Hotel
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.types"
            type="checkbox"
            value="House"
            id="House"
            @click="typeChecked('isHouse')"
            class="checkbox"
          />
          <label for="House">
            <span class="material-icons-outlined" v-if="typesChecked.isHouse">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            House
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.types"
            type="checkbox"
            value="Loft"
            id="Loft"
            @click="typeChecked('isLoft')"
            class="checkbox"
          />
          <label for="Loft">
            <span class="material-icons-outlined" v-if="typesChecked.isLoft">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Loft
          </label>
        </div>
        <div class="button-container">
          <button @click.stop="clearFilter">Clear</button>
          <button @click.stop="setFilter">Update</button>
        </div>
      </div>
    </button>
    <!--------------->
    <!-- amenities -->
    <!--------------->
    <button @click.stop="toggleAmenities">
      {{ amenitiesPreview }}

      <div @click.stop class="amenities-modal" v-if="isAmenitiesModalOpen">
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="TV"
            id="TV"
            @click="checked('isTv')"
            class="checkbox"
          />
          <label for="TV">
            <span class="material-icons-outlined" v-if="amenitiesChecked.isTv">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            TV
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="Wifi"
            id="Wifi"
            @click="checked('isWifi')"
            class="checkbox"
          />

          <label for="Wifi">
            <span
              class="material-icons-outlined"
              v-if="amenitiesChecked.isWifi"
            >
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Wifi
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="Kitchen"
            id="Kitchen"
            @click="checked('isKitchen')"
            class="checkbox"
          />
          <label for="Kitchen">
            <span
              class="material-icons-outlined"
              v-if="amenitiesChecked.isKitchen"
            >
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Kitchen
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="Pets allowed"
            id="Pets"
            @click="checked('isPet')"
            class="checkbox"
          />
          <label for="Pets">
            <span class="material-icons-outlined" v-if="amenitiesChecked.isPet">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Pets Allowed
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="Air conditioning"
            id="Air"
            @click="checked('isAir')"
            class="checkbox"
          />
          <label for="Air">
            <span class="material-icons-outlined" v-if="amenitiesChecked.isAir">
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Air conditioning
          </label>
        </div>
        <div>
          <input
            v-model="filterByLocal.amenities"
            type="checkbox"
            value="Smoking allowed"
            id="Smoking"
            @click="checked('isSmoking')"
            class="checkbox"
          />
          <label for="Smoking">
            <span
              class="material-icons-outlined"
              v-if="amenitiesChecked.isSmoking"
            >
              check_box
            </span>
            <span v-else class="material-icons-outlined">
              check_box_outline_blank
            </span>
            Smoking Allowed
          </label>
        </div>
        <div class="button-container">
          <button @click.stop="clearFilter">Clear</button>
          <button @click.stop="setFilter">Update</button>
        </div>
      </div>
    </button>

    <button @click.stop="clearFilter">Clear Filter</button>
  </form>
</template>

<script>
export default {
  props: {
    filterBy: Object,
    stays: Array,
    unfilteredStays: Array,
  },
  created() {
    window.addEventListener('click', this.closeModals)
  },
  destroyed() {
    window.addEventListener('click', this.closeModals)
  },
  data() {
    return {
      isPriceModalOpen: false,
      isTypesModalOpen: false,
      isAmenitiesModalOpen: false,
      filterByLocal: this.filterBy || {},
      amenitiesChecked: {
        isPet: false,
        isSmoking: false,
        isTv: false,
        isAir: false,
        isWifi: false,
        isKitchen: false,
      },
      typesChecked: {
        isHouse: false,
        isHotel: false,
        isVila: false,
        isApratment: false,
        isLoft: false,
      },
    }
  },
  methods: {
    checked(val) {
      this.amenitiesChecked[val] = !this.amenitiesChecked[val]
    },
    typeChecked(val) {
      this.typesChecked[val] = !this.typesChecked[val]
    },
    togglePrice() {
      this.isPriceModalOpen = !this.isPriceModalOpen
      this.isTypesModalOpen = false
      this.isAmenitiesModalOpen = false
    },
    toggleTypes() {
      this.isTypesModalOpen = !this.isTypesModalOpen
      this.isPriceModalOpen = false
      this.isAmenitiesModalOpen = false
    },
    toggleAmenities() {
      this.isAmenitiesModalOpen = !this.isAmenitiesModalOpen
      this.isTypesModalOpen = false
      this.isPriceModalOpen = false
    },
    closeModals() {
      this.isTypesModalOpen = false
      this.isPriceModalOpen = false
      this.isAmenitiesModalOpen = false
    },
    setFilter() {
      this.$emit('filter', this.filterByLocal)
      this.isTypesModalOpen = false
      this.isPriceModalOpen = false
      this.isAmenitiesModalOpen = false
    },
    clearFilter() {
      const filter = {
        price: [0, 1500],
        types: [],
        amenities: [],
        city: '',
      }
      for (const key in this.amenitiesChecked) {
        this.amenitiesChecked[key] = false
      }
      for (const key in this.typesChecked) {
        this.typesChecked[key] = false
      }
      this.$emit('filter', filter)
      this.isTypesModalOpen = false
      this.isPriceModalOpen = false
      this.isAmenitiesModalOpen = false
    },
  },
  computed: {
    stayTypeList() {
      const types = this.unfilteredStays.map(stay => {
        return stay.propertyType
      })
      return [...new Set(types)]
    },
    stayAmenitiesList() {
      const amenities = []
      this.unfilteredStays.forEach(stay => {
        return stay.amenities.forEach(amenity => {
          if (amenity.txt) amenities.push(amenity.txt)
        })
      })

      return [...new Set(amenities)]
    },
    amenitiesPreview() {
      if (this.filterBy.amenities.length) {
        return this.filterBy.amenities.join(',')
      } else {
        return 'Amenities'
      }
    },
    stayTypePreview() {
      if (this.filterBy.types.length) {
        return this.filterBy.types.join(',')
      } else {
        return 'Types'
      }
    },
    pricePreview() {
      if (this.filterBy.price[0] !== 0 && this.filterBy.price[1] !== 0) {
        return `$${this.filterBy.price[0]} - $${this.filterBy.price[1]}`
      } else {
        return 'Price'
      }
    },
    typesPos() {
      return this.$refs.priceBtn.offsetWidth + 200
    },
  },
}
</script>
