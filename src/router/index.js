import Vue from "vue"
import store from "@/store"
import VueRouter from "vue-router"
import api from "@/services"
// eslint-disable-next-line prettier/prettier
import { getCookie, deleteCookie } from "@/helpers/customizeCookie.js"
// import Home from "../views/Home.vue"
import UserInfo from "../views/UserInfo.vue"
import auth from "../middleware/auth.js"
import Companies from "../views/Companies.vue"
// Segment
import Segments from "../views/Segments.vue"
import SegmentCreate from "../views/SegmentCreate.vue"
import SegmentDetail from "../views/SegmentDetail.vue"
// Contact
import Contact from "../views/Contact.vue"
import ContactCreate from "../views/ContactCreate.vue"
import CompanyDetail from "../views/CompanyDetail.vue"
import ContactDetail from "../views/ContactDetail.vue"
import CompanyCreate from "../views/CompanyCreate.vue"
// Customer
import Customer from "../views/Customer.vue"
import CustomerDetail from "../views/CustomerDetail.vue"
import CustomerCreate from "../views/CustomerCreate.vue"
// Provider
import Provider from "../views/Provider.vue"
import ProviderDetail from "../views/ProviderDetail.vue"
import ProviderCreate from "../views/ProviderCreate.vue"
// Dashboard
import Dashboard from "../views/Dashboard.vue"
// Event
import Events from "../views/Events.vue"
// Emails
import Emails from "../views/Emails.vue"
// Config
import ConfigUser from "../views/ConfigUser.vue"
import ConfigAirport from "../views/ConfigAirport.vue"
import ConfigPort from "../views/ConfigPort.vue"
import ConfigCountry from "../views/ConfigCountry.vue"
Vue.use(VueRouter)
const currentTheme = process.env.VUE_APP_THEME
let Prefix = ""
switch (currentTheme) {
  case "TRUSTANA":
    Prefix = "Trustana"
    break

  default:
    Prefix = "6AM"
    break
}
const routes = [
  {
    path: "/",
    name: "home",
    component: UserInfo,
    meta: {
      title: Prefix + " - User Infomation",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: Prefix + " - Dashboard",
    },
  },
  {
    path: "/user-info",
    name: "user-info",
    component: UserInfo,
    meta: {
      title: Prefix + " - User Infomation",
    },
  },
  {
    path: "/companies",
    name: "companies",
    component: Companies,
    meta: {
      title: Prefix + " - Companies",
    },
  },
  {
    path: "/companies/create",
    name: "company-create",
    component: CompanyCreate,
    meta: {
      title: Prefix + " - Company Create",
    },
  },
  {
    path: "/companies/:id",
    name: "company-detail",
    component: CompanyDetail,
    meta: {
      title: Prefix + " - Company Detail",
    },
  },
  {
    path: "/contacts/create",
    name: "contacts-create",
    component: ContactCreate,
    meta: {
      title: Prefix + " - Contacts Create",
    },
  },
  {
    path: "/contacts",
    name: "contacts",
    component: Contact,
    meta: {
      title: Prefix + " - Contacts",
    },
  },
  {
    path: "/contacts/:id",
    name: "contact-detail",
    component: ContactDetail,
    meta: {
      title: Prefix + " - Contacts Detail",
    },
  },

  {
    path: "/customers/create",
    name: "customer-create",
    component: CustomerCreate,
    meta: {
      title: Prefix + " - Customer Create",
    },
  },
  {
    path: "/customers",
    name: "customers",
    component: Customer,
    meta: {
      title: Prefix + " - Customers",
    },
  },
  {
    path: "/customers/:id",
    name: "customer-detail",
    component: CustomerDetail,
    meta: {
      title: Prefix + " - Customer Detail",
    },
  },
  {
    path: "/providers/create",
    name: "providers-create",
    component: ProviderCreate,
    meta: {
      title: Prefix + " - Providers Create",
    },
  },
  {
    path: "/providers",
    name: "providers",
    component: Provider,
    meta: {
      title: Prefix + " - Providers",
    },
  },
  {
    path: "/providers/:id",
    name: "providers-detail",
    component: ProviderDetail,
    meta: {
      title: Prefix + " - Providers Detail",
    },
  },

  {
    path: "/segments/create",
    name: "segments-create",
    component: SegmentCreate,
    meta: {
      title: Prefix + " - Segments Create",
    },
  },
  {
    path: "/segments/:id",
    name: "segments-detail",
    component: SegmentDetail,
    meta: {
      title: Prefix + " - Segments Detail",
    },
  },
  {
    path: "/segments",
    name: "segments",
    component: Segments,
    meta: {
      title: Prefix + " - Segments",
    },
  },
  {
    path: "/events",
    name: "events",
    component: Events,
    meta: {
      title: Prefix + " - Events",
    },
  },
  {
    path: "/emails",
    name: "emails",
    component: Emails,
    meta: {
      title: Prefix + " - Emails",
    },
  },
  {
    path: "/config-user",
    name: "config-user",
    component: ConfigUser,
    meta: {
      title: Prefix + " - Config User",
    },
  },
  {
    path: "/config-airport",
    name: "config-airport",
    component: ConfigAirport,
    meta: {
      title: Prefix + " - Config Airport",
    },
  },
  {
    path: "/config-port",
    name: "config-port",
    component: ConfigPort,
    meta: {
      title: Prefix + " - Config Port",
    },
  },
  {
    path: "/config-country",
    name: "config-country",
    component: ConfigCountry,
    meta: {
      title: Prefix + " - Config Country",
    },
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: Prefix + " - Login",
    },
    component: () => import("../views/LoginContainer.vue"),
  },
  //
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to?.meta?.title) {
    document.title = to.meta.title
  }
  if (to.path.includes("/login")) {
    if (auth()) {
      const userAuth = store.state.auth
      if (userAuth.isAuth && userAuth.user) {
        next()
        return
      }
      setTimeout(async () => {
        const res = await api.user.getUserInfo()
        if (!res) {
          localStorage.removeItem("auth._token.local")
          deleteCookie("auth._token.local")
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
        try {
          if (res.status > 399) {
            localStorage.removeItem("auth._token.local")
            deleteCookie("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })

            return
          }
          if (res.response && !res.response.data.success) {
            localStorage.removeItem("auth._token.local")
            deleteCookie("auth._token.local")
            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          const localCToken = getCookie("auth._token.local")
          const localLToken = localStorage.getItem("auth._token.local")
          const localToken = localCToken || localLToken
          const auth_set = {
            isAuth: true,
            user: res.data.data.user,
            token: `Bearer ${localToken}`,
          }
          store.commit("SET_USER_LOGGEDIN", auth_set)
          const nextStep =
            to.query && to.query.redirect ? to.query.redirect : "/"
          next({
            path: String(nextStep),
          })
        } catch (error) {
          console.log(error)
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
      }, 1000)
    } else {
      next()
    }
    return
  } else {
    if (auth()) {
      const userAuth = store.state.auth
      if (userAuth && userAuth.isAuth && userAuth.user) {
        next()
        return
      }
      setTimeout(async () => {
        const res = await api.user.getUserInfo()
        if (!res) {
          localStorage.removeItem("auth._token.local")
          deleteCookie("auth._token.local")

          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
        try {
          if (res.status > 399) {
            localStorage.removeItem("auth._token.local")
            deleteCookie("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          if (res.response && !res.response.data.success) {
            localStorage.removeItem("auth._token.local")
            deleteCookie("auth._token.local")

            next({
              path: "/login",
              query: { redirect: to.fullPath },
            })
            return
          }
          const localCToken = getCookie("auth._token.local")
          const localLToken = localStorage.getItem("auth._token.local")
          const localToken = localCToken || localLToken
          const auth_set = {
            isAuth: true,
            user: res.data.data.user,
            token: `Bearer ${localToken}`,
          }
          store.commit("SET_USER_LOGGEDIN", auth_set)
          // const nextStep = to.query && to.query.redirect ? to.query.redirect : "/";
          const nextStep = to.fullPath
          next({
            path: String(nextStep),
          })
        } catch (error) {
          console.log(error)

          next({
            path: "/login",
            query: { redirect: to.fullPath },
          })
        }
      }, 1000)
    } else {
      localStorage.removeItem("auth._token.local")
      deleteCookie("auth._token.local")

      next({
        path: "/login",
        query: { redirect: to.fullPath },
      })
    }
  }
})
export default router
