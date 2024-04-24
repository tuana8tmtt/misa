import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "@/plugins/vuetify.js"
import "vuetify/dist/vuetify.min.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import { AgGridVue } from "ag-grid-vue"
import Axios from "axios"
import VueTelInput from "vue-tel-input"
import "vue-tel-input/dist/vue-tel-input.css"
import commonMethods from "@/mixins/commonMethods.js"
import themeMixins from "@/mixins/themeMixins.js"
import syntax from "@/mixins/syntax.js"
import CKEditor from "ckeditor4-vue"
import { getCookie } from "@/helpers/customizeCookie.js"
const localLToken = localStorage.getItem("auth._token.local")
const localCToken = getCookie("auth._token.local")
const localToken = localCToken || localLToken
Vue.config.productionTip = false
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Axios.defaults.headers = { Authorization: `Bearer ${localToken}` }

Axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const status = error.response ? error.response.status : null
    console.log(status)
    if (status && status === 401) {
      const currentUser = store.getters.userFromAuth
      if (currentUser && currentUser.id) {
        store.commit("toast/getError", "Your token has expired.")
      }
      store.commit("setCurrentToken", "")
      store.commit("SET_LOGOUT_USER")
      store.commit("SET_LOGOUT_POPUP", false)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
    if (!status) {
      store.commit(
        "toast/getError",
        "Request failed due to no internet connection",
      )
    }
    return Promise.reject(error)
  },
)
Vue.use(CKEditor)
Vue.config.productionTip = false
Vue.component("ag-grid-vue", AgGridVue)
Vue.use(VueTelInput)
Vue.mixin(commonMethods)
Vue.mixin(themeMixins)
Vue.mixin(syntax)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
