import AuthService from '../../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user).catch(e => { console.log(e) })
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error).catch(e => { console.log(e) })
        },
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
  },
  mutations: {
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
      console.log(state.status.loggedIn)
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
