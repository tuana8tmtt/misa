import axios from "axios"
import appData from "./appData"
import user from "./user"
import company from "./company"
import contact from "./contact"
import opportunity from "./opportunity"
import segment from "./segment"
import calendar from "./calendar"
import noti from "./noti"
import email from "./email"
import template from "./template"
import users from "./users"
import department from "./department"
import country from "./country"
import port from "./port"
import airport from "./airport"
import customer from "./customer"
import provider from "./provider"
import store from "../store"
const handleError = (err) => {
  if (err && err.status && err.status === 401) {
    // handle authentification error here
    store.commit("SET_LOGOUT_POPUP", true)
    return
  }
  return err
}
const services = ((axios) => {
  return {
    appData: appData(axios),
    user: user(axios),
    company: company(axios),
    contact: contact(axios),
    opportunity: opportunity(axios),
    segment: segment(axios),
    calendar: calendar(axios),
    noti: noti(axios),
    email: email(axios, handleError),
    template: template(axios),
    users: users(axios),
    department: department(axios),
    country: country(axios),
    port: port(axios),
    airport: airport(axios),
    customer: customer(axios),
    provider: provider(axios)
  }
})(axios)
export default services
