<template>
  <header class="page-header">
    <div class="page-header-inner">
      <img v-if="currentTheme !== 'TRUSTANA'" src="@/assets/imgs/header-logo-txt.png" alt=""
        class="6am-header-brand pointer" height="37px" @click="navigateTo('/')" />
      <img v-else src="@/assets/imgs/icons/trustana-header-logo.svg" alt="" class="6am-header-brand pointer"
        height="37px" @click="navigateTo('/')" />
      <div class="d-flex align-items-center">
        <div class="select__otp">
          <v-autocomplete class="
              v-autocomplete__nodetails
              v-autocomplete__noshadow
              v-autocomplete__borderform
              v-autocomplete__modappend
              v-autocomplete__formheight
              v-autocomplete__template-status
            " v-model="selected" :items="options" item-text="name" @change="fetchDataOption" :return-object="true"
            :placeholder="'Choose Data'" :color="`#e04038`" dense label="" solo>
            <template v-slot:append>
              <div class="v-auto-append-icon">
                <img src="@/assets/imgs/icons/menu-down-icon.svg" alt="back-icon" height="22px" class="pointer mx-1" />
              </div>
            </template>
            <template v-slot:item="{ item, on, attrs }">
              <p class="mb-0 font-weight-regular" v-bind="attrs" v-on="on">
                {{ item.database_name }}
              </p>
            </template>
            <template v-slot:selection="{ item, on, attrs }">
              <p class="mb-0" v-bind="attrs" v-on="on">
                {{ item.database_name }}
              </p>
            </template>
          </v-autocomplete>

        </div>

        <DialogNotification />
        <div class="vertical-divider"></div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="user-auth-info d-flex align-items-center" v-bind="attrs" v-on="on">
              <span class="user-name">{{ userFromAuth.name }}</span>
              <img src="@/assets/imgs/user-avatar.png" alt="user-avatar" class="user-avatar" />
            </div>
          </template>
          <v-list>
            <v-list-item class="logout-dropdown">
              <v-list-item-title class="pointer" @click="navigateTo('/user-info')">My Account</v-list-item-title>
            </v-list-item>
            <v-list-item class="logout-dropdown">
              <v-list-item-title class="pointer" @click="confirmLogout">Logout</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item class="logout-dropdown">
              <v-list-item-title class="pointer" @click="removeToken"
                >DEV: Remove token</v-list-item-title
              >
            </v-list-item> -->
          </v-list>
        </v-menu>
      </div>
    </div>
  </header>
</template>

<script>
import DialogNotification from "@/components/DialogNotification"
import { mapGetters } from "vuex"
import routeMixins from "@/mixins/routeMixins"


export default {

  components: { DialogNotification },
  mixins: [routeMixins],
  data() {
    return {
      currentTheme: process.env.VUE_APP_THEME,
      selected: null
    }
  },
  computed: {
    ...mapGetters({
      userFromAuth: "userFromAuth",
    }),
    options() {
      return this.userFromAuth.database_misa || []
    }
  },
  methods: {
    fetchDataOption(selectedOption) {
      this.fetchDataById(selectedOption.database_id);
    },
    fetchDataById(id) {
      console.log(id);
      // yourAPIRequest(id)
      //   .then((response) => {
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching data:", error);
      //   });
    },
    confirmLogout() {
      this.$store.commit("SET_LOGOUT_POPUP", true)
    },
    removeToken() {
      this.$store.commit("SET_LOGOUT_USER")
      this.$store.commit("setCurrentToken", "")
    },
    loadSelectedOption() {
      const storedSelection = localStorage.getItem("selectedOption");
      if (storedSelection) {
        try {
          this.selected = JSON.parse(storedSelection);
        } catch (error) {
          console.error("Error parsing stored selected option:", error);
        }
      }else if(this.options.length > 0){
        this.selected = this.options[0]
      }
    },
    saveSelectedOption() {
      localStorage.setItem("selectedOption", JSON.stringify(this.selected));
    },
  },
  mounted() {
    this.fetchDataById(this.selected.database_id);
  },
  created() {
    this.loadSelectedOption();
  },
  watch: {
    selected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.saveSelectedOption();
      }
    },
  },
}
</script>

<style lang="scss">
.page-header {
  display: block;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #cfd4d8;

  &-inner {
    height: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vertical-divider {
    border-left: 1px solid #cfd4d8;
    height: 70px;
    margin-left: 24px;
    margin-right: 24px;
  }

  .user-auth-info {
    .user-name {
      font-size: 17px;
      line-height: 27px;
      letter-spacing: 0px;
      color: #000000;
      font-weight: 500;
    }

    .user-avatar {
      margin-left: 12px;
      width: 38px;
      height: 38px;
      object-fit: contain;
      border-radius: 100%;
    }
  }

  .select__otp {
    display: flex;
    padding: 0 10px;
    margin-top: 4px;
  }
}
</style>
