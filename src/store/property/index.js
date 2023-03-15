import PropertyService from '../../services/PropertyService'

export default {
  namespaced: true,
  state: {
    properties: null,
  },
  // getters: {
  //   propertiesList: state => state.properties,
  // },
  mutations: {
    setProperties: (state, properties) => {
      state.properties = properties
    },
    propertiesList(state, properties) {
      state.properties = properties
    },
  },
  actions: {
    fetchAllProperties({ commit }) {
      return PropertyService.findAlll().then(
        res => {
          commit('propertiesList', res)
          return Promise.resolve(res)
        },
        error => {
          commit('propertiesListFailure')
          return Promise.reject(error)
        },
      )
    },
  },
}
