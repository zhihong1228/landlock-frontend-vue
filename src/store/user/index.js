import UsersService from '../../services/UsersService'

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('userData') || '{}'),
    admin: JSON.parse(localStorage.getItem('admin') || '{}'),
    showLogin: false,
    users: [],
    properties: [],
  },
  getters: {
    user: state => {
      const { user } = state
      console.log(user)
      return user
    },
    showLogin: state => {
      const { showLogin } = state
      return showLogin
    },
    currentUser: state => {
      const { admin } = state
      return admin
    },
  },
  mutations: {
    setUsers: (state, users) => {
      state.users = users
    },
    usersList(state, users) {
      state.users = users
    },

    setProperties: (state, properties) => {
      state.properties = properties
    },
    propertiesList(state, properties) {
      state.properties = properties
    },

    toggleLogin(state) {
      state.showLogin = !state.showLogin
    },
    UPDATE_USER(state, payload) {
      console.log(payload)
      localStorage.setItem('userData', JSON.stringify(payload))
      state.user = payload
    },
    LOGOUT_USER(state) {
      localStorage.removeItem('token')
      localStorage.setItem('userData', JSON.stringify({}))
      state.user = {}
    },
    UPDATE_ADMIN(state, payload) {
      localStorage.setItem('admin', JSON.stringify(payload.user))
      state.admin = payload.user
    },
    LOGOUT_ADMIN(state) {
      localStorage.setItem('admin', JSON.stringify({}))
      state.admin = {}
    },
  },
  actions: {
    toggleLogin({ commit }) {
      commit('toggleLogin')
    },
    fetchAllUsers({ commit }) {
      return UsersService.getAllUsers().then(
        res => {
          commit('usersList', res)
          return Promise.resolve(res)
        },
        error => {
          commit('usersListFailure')
          return Promise.reject(error)
        },
      )
    },

    fetchAllProperties({ commit }) {
      return UsersService.getAllProperties().then(
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
