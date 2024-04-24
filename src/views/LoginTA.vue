<template>
  <div class="login-page">
    <div class="login-left-side">
      <img
        src="@/assets/imgs/icons/trustana-header-logo.svg"
        alt="trustana-logo"
        width="260px"
      />
      <div class="lefside-txt">
        <p class="leftside-title">Nền tảng số nội bộ của Doanh nghiệp</p>
        <p class="leftside-desc">
          Hệ thống các ứng dụng tích hợp hoạt động trên nền tảng web, dễ dàng
          truy cập. Ứng dụng công nghệ số sẽ giúp quản trị nội bộ ưu việt hơn,
          lưu trữ đầy đủ, bảo mật các Tài nguyên, hỗ trợ giám sát, quản lý thực
          hiện công việc, từ đó tăng năng suất và hiệu quả lao động.
        </p>
      </div>
      <img
        src="@/assets/background-login.svg"
        class="colum photo d-bloc mx-auto"
        alt=""
        srcset=""
      />
    </div>
    <div class="login-right-side colum login">
      <div class="text-input login-text text-center">Đăng nhập</div>
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
        large
        rounded
        class="btn-login"
        @click="submit"
        :loading="loadingLogin"
        >Đăng nhập</v-btn
      >
    </div>
  </div>
</template>

<script>
import api from "@/services"
import store from "@/store"
import Axios from "axios"
import { setCookie, deleteCookie } from "@/helpers/customizeCookie.js"
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

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  background-color: #f6f9fb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
}
.login-left-side {
  width: 60%;
  display: flex;
  flex-flow: column;
  height: 100vh;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 32px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #7030a0;
  img {
    z-index: 2;
  }
  .lefside-txt {
    padding: 54px 0 60px;
    max-width: 590px;
    .leftside-title {
      font-weight: 700;
      font-size: 32px;
      line-height: 42px;
      color: #000;
      margin-bottom: 16px;
    }
    .leftside-desc {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;

      color: #000;
    }
  }
}
.login-right-side {
  width: 40%;
  padding-top: 50px;
}
.photo {
  width: 100%;
  max-width: 500px;
  object-fit: contain;
}
.login {
  background-color: #ffff;
  height: 100vh;
  border-radius: 14px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  .login-text {
    padding-top: 0;
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;
    color: #7030a0;
    margin-bottom: 42px;
  }
}
.input-login {
  margin: 10px 25px;
  border: 1px solid #ebf1f700;
  background-color: #f2f2f2;
  height: 52px;
  width: 366px;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding: 20px;
}
::placeholder {
  color: #afbbc6;
  opacity: 1;
}
.btn-login {
  background-color: #7030a0 !important;
  margin: 40px auto;
  height: 42px !important;
  width: 366px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  box-shadow: none;
  text-transform: inherit;
  letter-spacing: 0 !important;
  border-radius: 4px !important;
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
