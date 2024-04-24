import { getCookie } from "@/helpers/customizeCookie.js"
const auth = () => {
  const cacheCToken = getCookie("auth._token.local")
  const cacheLToken = localStorage.getItem("auth._token.local")
  if (!cacheCToken && !cacheLToken) {
    return false
  }

  return true
}
export default auth
