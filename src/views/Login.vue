<template>
  <div class="login-page">
    <img
      src="@/assets/background-login.png"
      class="colum photo"
      alt=""
      srcset=""
    />
    <div class="colum login">
      <div class="text-input text-center">Login</div>
      <div class="des-input text-center">Login with your account</div>
      <input
        class="input-login"
        ref="userEmail"
        id="userEmail"
        placeholder=""
        v-model="email"
        @keyup.exact.enter="onEnterEmail"
      />
      <input
        class="input-login"
        ref="userPassword"
        id="userPassword"
        placeholder=""
        v-model="password"
        type="password"
        @keyup.exact.enter="submit"
      />
      <v-btn
        color="primary"
        large
        rounded
        class="btn-login"
        @click="submit"
        :loading="loadingLogin"
        >Login</v-btn
      >
    </div>
  </div>
</template>

<script>
import api from "@/services"
import store from "@/store"
import Axios from "axios"
import { setCookie, deleteCookie } from "@/helpers/customizeCookie"
export default {
  data() {
    return {
      email: "admin@gmail.com",
      password: "123456",
      loadingLogin: false,
      currentTheme: process.env.VUE_APP_THEME,
    }
  },
  mounted() {
    this.loadingLogin = false
    try {
      this.$refs.userEmail.focus()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    onEnterEmail() {
      if (!this.password) {
        try {
          this.$refs.userPassword.focus()
        } catch (error) {
          console.log(error)
        }
      } else {
        this.submit()
      }
    },

    async submit() {
      // this.setClickedSubmit(true);
      // this.setErrorMsg("");
      this.loadingLogin = true
      if (!this.email || !this.password) {
        this.loadingLogin = false
        return
      }
      let body = {
        email: this.email,
        password: this.password,
      }
      const res = await api.user.loginUser(body)

      if (!res) {
        this.loadingLogin = false
        alert("Có lỗi không thể đăng nhập , vui lòng thử lại sau, ErrorCode: 1")
        return
      }
      if (res.status > 399) {
        this.loadingLogin = false
        alert(res.data.message || res.data.meta.message)
        return
      }
      try {
        // localStorage.setItem("auth._token.local", res.data.data.token)
        setCookie("auth._token.local", res.data.data.token, 30)
        Axios.defaults.headers = {
          Authorization: `Bearer ${res.data.data.token}`,
        }
        const current_token = res.data.data.token
        // cache dns

        // const auth_set = {
        //   isAuth: true,
        //   user: res.data.data.customer,
        //   token: `Bearer ${current_token}`,
        // }
        // store.commit("SET_USER_LOGGEDIN", auth_set)
        // this.$router.push("/")

        // no cache dns

        const resU = await api.user.getUserInfo()
        this.$router.push("/")
        if (!resU) {
          localStorage.removeItem("auth._token.local")
          deleteCookie("auth._token.local")
          alert(
            "Có lỗi không thể đăng nhập , vui lòng thử lại sau, ErrorCode: 2",
          )
          return
        }
        try {
          if (resU.status > 399) {
            deleteCookie("auth._token.local")
            alert(
              "Có lỗi không thể đăng nhập , vui lòng thử lại sau, ErrorCode: 3",
            )
            return
          }
          if (resU.response && !resU.response.data.success) {
            deleteCookie("auth._token.local")
            alert(
              "Có lỗi không thể đăng nhập , vui lòng thử lại sau, ErrorCode: 4",
            )
            return
          }

          const auth_set = {
            isAuth: true,
            user: resU.data.data.data,
            token: `Bearer ${current_token}`,
          }
          store.commit("SET_USER_LOGGEDIN", auth_set)
        } catch (error) {
          this.loadingLogin = false
          console.log(error)
          // setErrorMsg("");
        }
      } catch (error) {
        this.loadingLogin = false
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background-color: #f6f9fb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
}
.photo {
  height: 454px;
  width: 812px;
  object-fit: cover;
  margin-right: 100px;
  margin-left: 100px;
}
.login {
  background-color: #ffff;
  height: 358px;
  width: 350px;
  margin-right: 200px;
  margin-left: 10px;
  border-radius: 14px;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.input-login {
  margin: 10px 25px;
  border: 1px solid #ebf1f7;
  background-color: #ebf1f7;
  height: 60px;
  width: 298px;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  padding: 20px;
}
::placeholder {
  color: #afbbc6;
  opacity: 1;
}
.btn-login {
  background-color: #e04038 !important;
  margin: 10px auto;
  height: 60px !important;
  width: 298px;
  font-size: 16px;
  box-shadow: none;
  text-transform: inherit;
}
.text-input {
  font-size: 18px;
  font-weight: bold;
  padding: 30px 0 8px 0;
}
.des-input {
  font-size: 15px;
  padding-bottom: 16px;
  color: #afbbc6;
}
</style>
