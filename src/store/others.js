const VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL

import axios from "axios"
const others = {
  state: () => ({
    listNoti: [],
    notiCounter: 6,
    preventLoadmoreNoti: false,
    maxNotiCounter: 5,
    notiPagination: {},
    countries: [],
    cities: [],
    port: [],
    airport: [],
    industries: [],
    products: [],
    segments: [],
    companyTypes: [],
    companyStages: [],
    listDepartment: [],
    listUser: [],
    locationTypes: [
      {
        id: "office",
        name: "Office",
      },
      {
        id: "warehouse",
        name: "Warehouse",
      },
      {
        id: "factory",
        name: "Factory",
      },
    ],
  }),
  mutations: {
    "others/setListPort"(state, payload) {
      state.port = payload
    },
    "others/setListAirport"(state, payload) {
      state.airport = payload
    },
    "others/setListProducts"(state, payload) {
      state.products = payload
    },
    "others/setListCountries"(state, payload) {
      state.countries = payload
    },
    "others/setListCities"(state, payload) {
      state.cities = payload
    },
    "others/setListSegments"(state, payload) {
      state.segments = payload
    },
    "others/setListIndustries"(state, payload) {
      state.industries = payload
    },
    "others/setListCompanyTypes"(state, payload) {
      state.companyTypes = payload
    },
    "others/setListCompanyStages"(state, payload) {
      state.companyStages = payload
    },
    "others/setListDepartment"(state, payload) {
      state.listDepartment = payload
    },
    "others/setListUser"(state, payload) {
      state.listUser = payload
    },
    "others/setListNoti"(state, payload) {
      state.listNoti = payload
    },
    "others/setNotiCounter"(state, payload) {
      state.notiCounter = payload
    },
    "others/setMaxNotiCounter"(state, payload) {
      state.maxNotiCounter = payload
    },
    "others/notiPagination"(state, payload) {
      state.notiPagination = payload
    },
    "others/UPDATE_READ_NOTI"(state, noti) {
      state.listNoti.forEach((o) => {
        if (o.id === noti.id) {
          o.read_at = true
        }
      })
    },
  },
  actions: {
    "others/getListProducts"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/products?pagination=false`).then(
        (res) => {
          commit("others/setListProducts", res.data.data.products)
        },
        (err) => {
          let msg =
            "Failed when get products: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListCountries"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/countries?pagination=false`).then(
        (res) => {
          commit("others/setListCountries", res.data.data.countries)
        },
        (err) => {
          let msg =
            "Failed when get countries: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListCities"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/cities?pagination=false`).then(
        (res) => {
          commit("others/setListCities", res.data.data.cities)
        },
        (err) => {
          let msg =
            "Failed when get cities: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListIndustries"({ commit }) {
      axios
        .get(`${VUE_APP_BASE_URL}/api/company-industries?pagination=false`)
        .then(
          (res) => {
            commit("others/setListIndustries", res.data.data.industries)
          },
          (err) => {
            let msg =
              "Failed when get industries: " + err.message ||
              err.data.message ||
              String(err) ||
              " Try again"
            commit("toast/getError", msg)
          },
        )
    },
    "others/getListCompanyTypes"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/company-types?pagination=false`).then(
        (res) => {
          commit("others/setListCompanyTypes", res.data.data.types)
        },
        (err) => {
          let msg =
            "Failed when get company types: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListCompanyStages"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/company-stages?pagination=false`).then(
        (res) => {
          commit("others/setListCompanyStages", res.data.data.stages)
        },
        (err) => {
          let msg =
            "Failed when get company stages: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListSegments"({ commit }) {
      axios
        .get(`${VUE_APP_BASE_URL}/api/segments?pagination=false&is_active=true`)
        .then(
          (res) => {
            commit("others/setListSegments", res.data.data.segments)
          },
          (err) => {
            let msg =
              "Failed when get company segments: " + err.message ||
              err.data.message ||
              String(err) ||
              " Try again"
            commit("toast/getError", msg)
          },
        )
    },
    "others/getListPort"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/ports?pagination=false`).then(
        (res) => {
          commit("others/setListPort", res.data.data.ports)
        },
        (err) => {
          let msg =
            "Failed when get company ports: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListAirport"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/airports?pagination=false`).then(
        (res) => {
          commit("others/setListAirport", res.data.data.airports)
        },
        (err) => {
          let msg =
            "Failed when get company airports: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListDepartment"({ commit }) {
      axios.get(`${VUE_APP_BASE_URL}/api/departments?pagination=false`).then(
        (res) => {
          commit("others/setListDepartment", res.data.data.departments)
        },
        (err) => {
          let msg =
            "Failed when get departments: " + err.message ||
            err.data.message ||
            String(err) ||
            " Try again"
          commit("toast/getError", msg)
        },
      )
    },
    "others/getListUser"({ commit }) {
      axios
        .get(`${VUE_APP_BASE_URL}/api/users?pagination=false&is_active=true`)
        .then(
          (res) => {
            commit("others/setListUser", res.data.data.users)
          },
          (err) => {
            let msg =
              "Failed when get users: " + err.message ||
              err.data.message ||
              String(err) ||
              " Try again"
            commit("toast/getError", msg)
          },
        )
    },
    "others/getListNoti"({ state, commit }) {
      axios
        .get(`${VUE_APP_BASE_URL}/api/notifications?size=${state.notiCounter}`)
        .then(
          (res) => {
            commit("others/setListNoti", res.data.data.notifications)
            commit("others/notiPagination", res.data.data.meta)
            commit(
              "others/setMaxNotiCounter",
              res.data.data.meta.pagination.total,
            )
          },
          (err) => {
            let msg =
              "Failed when get notifications: " + err.message ||
              err.data.message ||
              String(err) ||
              " Try again"
            commit("toast/getError", msg)
          },
        )
    },
  },
  getters: {},
}
export default others
