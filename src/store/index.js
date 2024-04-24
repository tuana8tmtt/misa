const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import agFilter from "./agFilter"
import others from "./others"
import toast from "./toast"
import { deleteCookie, setCookie } from "@/helpers/customizeCookie.js"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentToken: "",
    filterSelect: {
      multiSelectExample: {
        items: [
          { id: 1, name: "Nháp" },
          { id: 2, name: "Đã gửi" },
        ],
      },
    },
    currentFilter: {
      multiple: false,
      itemField: "multiSelectExample", // name of filter select
      items: [],
      itemText: "name",
      itemValue: "id",
    },
    auth: {
      isAuth: false,
      user: null,
      token: null,
    },
    currentCK4: null,
    showLogoutPopup: false,
  },
  mutations: {
    SET_USER_LOGGEDIN(state, payload) {
      state.auth = { ...payload }
    },
    SET_LOGOUT_USER(state) {
      deleteCookie("auth._token.local")
      state.auth = { isAuth: false, user: null, token: null }
    },
    SET_LOGOUT_POPUP(state, payload) {
      state.showLogoutPopup = payload
    },
    setCurrentToken(state, payload) {
      // localStorage.setItem("auth._token.local", payload)
      setCookie("auth._token.local", payload, 30)
      state.currentToken = payload
    },
    setCurrentFilter(state, payload) {
      const obj = { ...payload }
      obj.items = state.filterSelect[payload.itemsField]
        ? [...state.filterSelect[payload.itemsField]]
        : []
      state.currentFilter = { ...obj }
    },

    SET_CURRENT_CK4(state, payload) {
      state.currentCK4 = payload
    },
  },
  actions: {
    resetToken({ commit }) {
      axios
        .post(`${VUE_APP_BASE_URL}/api/auth/login`, {
          login: "freelancer-0009",
          password: "1234567890",
        })
        .then((res) => {
          commit("setCurrentToken", res.data.data.token)
          console.log("token reset successfully")
        })
    },
  },
  getters: {
    userFromAuth: (state) => {
      if (!state.auth.user) {
        return {}
      }
      return state.auth.user
    },
  },
  modules: {
    agFilter,
    others,
    toast,
  },
})
