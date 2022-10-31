import { stayService } from '@/services/stay-service.js'
import { showMsg } from '@/services/event-bus.service.js'
import {
  socketService,
  SOCKET_EVENT_REVIEW_ADDED,
  SOCKET_EMIT_STAY_WATCH,
} from '@/services/socket.service.js'

export default {
  state: {
    stays: [],
    unfilteredStays: [],
    filterBy: {
      price: [0, 1500],
      types: [],
      amenities: [],
      city: '',
    },

    watchedStay: null,
  },
  getters: {
    stays(state) {
      return state.stays
    },
    filterBy(state) {
      return state.filterBy
    },
    unfilteredStays(state) {
      return state.unfilteredStays
    },
    watchedStay(state) {
      return state.watchedStay
    },
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
    },
    setUnfilteredStays(state, { unfilteredStays }) {
      state.unfilteredStays = unfilteredStays
    },
    removeStay(state, { stayId }) {
      const idx = state.stays.findIndex((s) => s._id === stayId)
      state.stays.splice(idx, 1)
    },
    updateStay(state, { stay }) {
      const idx = state.stays.findIndex((s) => s._id === stay._id)
      state.stays.splice(idx, 1, stay)
    },
    addStay(state, { stay }) {
      state.stays.push(stay)
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    addReview(state, { stay, review }) {
      const idx = state.stays.findIndex((s) => s._id === stay._id)
      state.stays[idx].reviews.unshift(review)
      state.stays.splice(idx, 1, state.stays[idx])
    },
    setWatchedStay(state, { stay }) {
      state.watchedStay = stay
    },
  },
  actions: {
    async loadStays({ commit, state }) {
      try {
        const stays = await stayService.query(state.filterBy)
        commit({ type: 'setStays', stays })
        return stays
      } catch (err) {
        console.log('Cannot load stays', stays)
        throw err
      }
    },
    async loadUnfilteredStays({ commit }) {
      try {
        const unfilteredStays = await stayService.query({
          price: [0, 1500],
          types: [],
          amenities: [],
          city: '',
        })

        commit({ type: 'setUnfilteredStays', unfilteredStays })
        return unfilteredStays
      } catch (err) {
        console.log('Cannot load stays', unfilteredStays)
        throw err
      }
    },
    async removeStay({ commit }, payload) {
      try {
        await stayService.remove(payload.stayId)
        commit(payload)
      } catch (err) {
        console.log('Cannot remove stay:', payload.stayId)
        throw err
      }
    },
    async saveStay({ commit, dispatch, rootGetters }, { stay }) {
      stay.loc = {
        'New York': {
          countryCode: 'NY',
          lat: 40.73061,
          lng: -73.935242,
          address: 'New York, New York',
        },
        Netherlands: {
          countryCode: 'NL',
          lat: 48.8566,
          lng: 2.3522,
          address: 'Amsterdam, Netherlands',
        },
        France: {
          countryCode: 'FR',
          lat: 52.377956,
          lng: 4.739298,
          address: 'Paris, France',
        },
        Japan: {
          countryCode: 'JP',
          lat: 35.652832,
          lng: 139.839478,
          address: 'Tokyo, Japan',
        },
      }[stay.loc.country]

      stay.amenities = stay.amenities.map((amenity) => {
        return {
          TV: {
            txt: 'TV',
            icon: 'el-icon-monitor',
          },
          Wifi: {
            txt: 'Wifi',
            icon: 'wifi',
            fa: true,
          },
          Kitchen: {
            txt: 'Kitchen',
            icon: 'el-icon-knife-fork',
          },
          'Pets allowed': {
            txt: 'Pets allowed',
            icon: 'paw',
            fa: true,
          },
          'Air conditioning': {
            txt: 'Air conditioning',
            icon: 'snowflake',
            fa: true,
          },
          'Smoking allowed': {
            txt: 'Smoking allowed',
            icon: 'el-icon-smoking',
          },
        }[amenity]
      })

      try {
        const type = stay._id ? 'updateStay' : 'addStay'

        const savedStay = await stayService.save(stay)
        commit({ type, stay: savedStay })
        return savedStay
      } catch (err) {
        console.log('err', err)
        throw err
      }
    },
    async addReview({ commit }, { stay, review }) {
      const stayCopy = JSON.parse(JSON.stringify(stay))
      stayCopy.reviews.unshift(review)
      await stayService.save(stayCopy)
      return stayCopy
    },
    async loadAndWatchStay({ commit }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId)
        commit({ type: 'setWatchedStay', stay })
        socketService.emit(SOCKET_EMIT_STAY_WATCH, stayId)
        socketService.off(SOCKET_EVENT_REVIEW_ADDED)
        socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
          commit({ type: 'addReview', stay, review })
          commit({ type: 'setWatchedStay', stay })
          showMsg(`a new review was added by ${review.by.fullname}`)
        })
      } catch (err) {
        console.log('stayStore: Error in loadAndWatchStay', err)
        throw err
      }
    },
    async toggleWishlistItem({ commit, rootGetters }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId)
        const idx = stay.wishlistedBy.findIndex(
          (userId) => userId === rootGetters.loggedinUser._id
        )
        if (idx === -1) {
          stay.wishlistedBy.push(rootGetters.loggedinUser._id)
        } else {
          stay.wishlistedBy.splice(idx, 1)
        }
        await stayService.save(stay)
        commit({ type: 'updateStay', stay })
      } catch (err) {
        console.log('stayStore: Error in toggling wishList', err)
        throw err
      }
    },
  },
}
