<template>
  <div class="container-fluid-t layout-default">
    <keep-alive>
      <Header />
    </keep-alive>
    <main class="main-page">
      <Sidebar />
      <div
        class="main-body__wr scrollbar-y"
        :class="
          !String($route.name).includes('giao-viec')
            ? 'rest-container-main'
            : 'rest-container-420'
        "
      >
        <!-- "" -->
        <keep-alive>
          <slot></slot>
        </keep-alive>
      </div>
    </main>
    <!-- LOGOUT CONFIRM -->
    <ConfirmNormal
      :content="`Do you really want to Sign out?`"
      :is-visible="showLogoutPopup"
      :on-cancel="cancelLogout"
      :on-confirm="confirmLogout"
      :on-loading="false"
      :close-outside="true"
      :button-confirm-text="'Yes'"
    />

    <div class="list-toastMsg">
      <p
        v-for="tm in toastMsg"
        :key="tm.uuid"
        class="toastMsg"
        :class="`toast-msg__${tm.type}`"
      >
        {{ tm.msg }}
      </p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header.vue"
import Sidebar from "@/components/Layout/Sidebar.vue"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
import { mapState } from "vuex"
export default {
  components: {
    Header,
    Sidebar,
    ConfirmNormal,
  },
  data() {
    return {
      sidebarIsCollapse: false,
      viewWidth: 1920,
      showBC: true,
    }
  },
  mounted() {
    this.viewWidth = window.outerWidth
    if (this.$route.fullPath.includes("/login")) {
      this.showBC = false
    } else {
      if (!this.isEmptyArray(this.countries)) {
        this.$store.dispatch("others/getListCountries")
      }
      if (!this.isEmptyArray(this.cities)) {
        this.$store.dispatch("others/getListCities")
      }
      if (!this.isEmptyArray(this.industries)) {
        this.$store.dispatch("others/getListIndustries")
      }
      if (!this.isEmptyArray(this.companyTypes)) {
        this.$store.dispatch("others/getListCompanyTypes")
      }
      if (!this.isEmptyArray(this.companyStages)) {
        this.$store.dispatch("others/getListCompanyStages")
      }
      if (!this.isEmptyArray(this.segments)) {
        this.$store.dispatch("others/getListSegments")
      }
      if (!this.isEmptyArray(this.products)) {
        this.$store.dispatch("others/getListProducts")
      }
      if (!this.isEmptyArray(this.port)) {
        this.$store.dispatch("others/getListPort")
      }
      if (!this.isEmptyArray(this.airport)) {
        this.$store.dispatch("others/getListAirport")
      }
      if (!this.isEmptyArray(this.listDepartment)) {
        this.$store.dispatch("others/getListDepartment")
      }
      if (!this.isEmptyArray(this.listUser)) {
        this.$store.dispatch("others/getListUser")
      }
      this.$store.dispatch("others/getListNoti")
    }
  },

  computed: {
    ...mapState({
      // others state
      roleList: (state) => state.others.listRole,
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      segments: (state) => state.others.segments,
      products: (state) => state.others.products,
      port: (state) => state.others.port,
      airport: (state) => state.others.airport,
      listDepartment: (state) => state.others.listDepartment,
      listUser: (state) => state.others.listUser,
      companyStages: (state) => state.others.companyStages,
      companyTypes: (state) => state.others.companyTypes,
      //
      isMini: (state) => state.isMini,
      toastMsg: (state) => state.toast.messages,
      showLogoutPopup: (state) => state.showLogoutPopup,
    }),
  },
  methods: {
    isEmptyArray(_arr) {
      if (!_arr) {
        return true
      }
      return Array.isArray(_arr) && _arr.length
    },
    toggleColappse() {
      this.sidebarIsCollapse = !this.sidebarIsCollapse
    },
    cancelLogout() {
      this.$store.commit("SET_LOGOUT_POPUP", false)
    },
    confirmLogout() {
      this.$store.commit("setCurrentToken", "")

      this.$store.commit("SET_LOGOUT_USER")
      this.$store.commit("SET_LOGOUT_POPUP", false)
      this.$router.push("/login")
    },
  },
}
</script>

<style lang="scss">
.layout-default {
  /* display: flex; */
}
.main-body__wr {
  height: calc(100vh - 72px) !important;
  max-height: calc(100vh - 72px) !important;
  overflow-y: scroll;
  padding: 30px 24px 0 30px;
}
.rest-container-420 {
  /* padding: 0; */
  margin-left: auto;
  width: calc(100% - 420px);
  background-color: #f0f0f0;
}
.rest-container-main {
  /* padding: 0; */
  margin-left: auto;
  width: calc(100% - 210px);
  background-color: #f0f0f0;
}
.rest-container-full {
  width: 100%;
}
.main-page {
  display: flex;
}
.list-toastMsg {
  position: fixed;
  z-index: 99999;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  .toastMsg {
    text-align: center;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    padding: 8px 12px;
    border-radius: 4px;
    min-width: 280px;
    min-height: 40px;
    transform: translateY(10px);
    opacity: 0;
    animation: showUp 0.3s 0.1s linear forwards;
  }
  .toast-msg {
    &__error {
      background-color: #f3271cc5;
    }
    &__success {
      background-color: #1f916a;
    }
  }
}
@keyframes showUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  20% {
    opacity: 1;
    transform: translateY(3px);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
