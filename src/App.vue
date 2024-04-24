<template>
  <v-app data-app :class="getWrapperClassViaTheme()">
    <div id="app">
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/column-filters">ColumnFilters</router-link> |
        <router-link to="/column-filters-supress"
          >ColumnFiltersWithSupress</router-link
        >
        |
        <router-link to="/column-filters-sidebar"
          >ColumnFiltersWithSidebar</router-link
        >
        |
      <router-link to="/column-filters-sidebar-single"
          >ColumnFiltersWithSidebarSingle</router-link
        >
      </div> -->
      <router-view />
    </div>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      currentTheme: process.env.VUE_APP_THEME,
    }
  },
  mounted() {
    if (window) {
      window.addEventListener("online", () => {
        this.$store.commit("toast/getSuccess", "Back to online")
      })
      window.addEventListener("offline", () => {
        this.$store.commit(
          "toast/getError",
          "Your internet connection is offline now",
        )
      })
    }
  },
  methods: {
    resetToken() {
      this.$store.dispatch("resetToken")
    },
    getWrapperClassViaTheme() {
      switch (this.currentTheme) {
        case "TRUSTANA":
          return "trust_ana_theme"

        default:
          return "six_am_theme"
      }
    },
  },
}
</script>
<style lang="scss">
@import "@/assets/style/main.scss";
@import "@/assets/style/_variables.scss";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css");
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn-reset-token {
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: forestgreen;
  color: #fff;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
}

.ag-theme-alpine {
  -webkit-font-smoothing: antialiased;
  color: #181d1f;
  /* color: var(--ag-foreground-color, #181d1f); */
  font-family: "Roboto", sans-serif !important;
  font-size: 13px;
  line-height: normal;
  i {
    font-family: "Roboto", sans-serif !important;
    font-size: 16px !important;
    &::before {
      font-family: "Font Awesome 6 Free" !important;
    }
  }
}
</style>
