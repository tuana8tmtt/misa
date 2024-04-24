<template>
  <DefaultLayout>
    <div
      class="user-page-content d-flex align-items-start justify-content-between"
    >
      <div class="usi-left-side bg-white">
        <div class="d-flex align-items-center usi-left-side__top">
          <img
            src="@/assets/imgs/user-avatar.png"
            alt="user-avtar"
            class="img-fit-cover user-avatar"
          />
          <div class="user-info-text pl-3">
            <p class="user-info-text__name">{{ userFromAuth.name }}</p>
            <p class="user-info-text__position">
              {{ userFromAuth.position || "---" }}
            </p>
          </div>
        </div>
        <p
          class="
            pointer
            pasword-changer
            mb-0
            mt-3
            d-flex
            align-items-center
            sidebar-hv
          "
          :class="tab === 0 ? 'active' : ''"
          @click="tab = 0"
        >
          <img
            src="@/assets/imgs/icons/card-account-details-outline-icon.svg"
            alt="change-pw-icon"
            class="pr-2"
          />
          My profile
        </p>
        <p
          class="
            pointer
            pasword-changer
            mb-0
            d-flex
            align-items-center
            sidebar-hv
          "
          v-if="false"
          :class="tab === 1 ? 'active' : ''"
          @click="tab = 1"
        >
          <img
            src="@/assets/imgs/icons/account-lock-icon.svg"
            alt="change-pw-icon"
            class="pr-2"
          />
          Change password
        </p>
      </div>
      <div class="usi-right-side bg-white">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div>
              <p class="pasword-changer usi-right-side__title">My profile</p>
              <div class="form-change-password">
                <div class="each-row">
                  <img
                    src="@/assets/imgs/user-avatar.png"
                    alt="user-avatar"
                    class="user-avatar d-block mx-auto"
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">Email:</p>
                  <input
                    readonly
                    v-model="formData.email"
                    type="text"
                    class="input-change-pw"
                    placeholder=""
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">Full name:</p>
                  <input
                    readonly
                    v-model="formData.name"
                    type="text"
                    class="input-change-pw"
                    placeholder=""
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">Position:</p>
                  <input
                    readonly
                    v-model="formData.position"
                    type="text"
                    class="input-change-pw"
                    placeholder=""
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">Gender:</p>
                  <v-radio-group
                    v-model="formData.gender"
                    row
                    class="mt-0 vuetify-no-msg"
                    readonly
                  >
                    <v-radio
                      v-for="n in [
                        { name: 'Mr', id: 'male' },
                        { name: 'Mrs', id: 'female' },
                      ]"
                      :key="n.id"
                      :label="n.name"
                      :value="n.id"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              <p class="pasword-changer usi-right-side__title">
                Change password
              </p>
              <div class="form-change-password">
                <div class="each-row">
                  <p class="field-title">Old password</p>
                  <input
                    type="password"
                    class="input-change-pw"
                    placeholder="Old password"
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">New password</p>
                  <input
                    type="password"
                    class="input-change-pw"
                    placeholder="New password"
                  />
                </div>
                <div class="each-row">
                  <p class="field-title">Confirm password</p>
                  <input
                    type="password"
                    class="input-change-pw"
                    placeholder="Confirm password"
                  />
                </div>
                <v-btn
                  depressed
                  :color="returnThemeColorBtnSC()"
                  class="
                    btn-normal-text
                    text-white
                    bc-btn
                    font-weight-regular
                    ml-auto
                    d-block
                    btn-font-size-14
                  "
                >
                  Change password
                </v-btn>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default.vue"
import { mapState } from "vuex"
export default {
  name: "Userinfor",
  components: {
    DefaultLayout,
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
    }),
    userFromAuth() {
      if (!this.auth.user) {
        return {}
      }
      return this.auth.user
    },
  },
  data() {
    return {
      tab: 0,
      formData: {},
    }
  },
  watch: {
    userFromAuth: {
      deep: true,
      handler() {
        this.formData = { ...this.userFromAuth }
      },
    },
  },
  mounted() {
    this.formData = { ...this.userFromAuth }
  },
}
</script>

<style lang="scss">
.user-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.user-page-content {
  min-height: calc(100vh - 110px);
}
.usi-left-side {
  padding: 24px;
  width: 370px;
  border: 2px solid #cfd4d885;
  height: 100%;
  min-height: inherit;
  &__top {
    padding-bottom: 24px;
    border-bottom: 2px solid #cfd4d885;
  }
}
.user-info-text {
  &__name {
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #000000;
    margin-bottom: 4px !important;
  }
  &__position {
    margin-bottom: 0 !important;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
}
.sidebar-hv {
  &:hover {
    background-color: #cfd4d84b;
  }
  &.active {
    background-color: #cfd4d84b;
  }
}
.pasword-changer {
  color: #000000;
  font-weight: bold;
  padding: 12px 0;
  border-radius: 5px;
  margin-bottom: 0;
  /* &:hover {
    background-color: #e8e8e856;
  } */
}
.usi-right-side {
  width: calc(100% - 400px);
  border: 2px solid #cfd4d885;
  min-height: calc(100vh - 110px);
  padding: 24px;
  &__title {
    padding-bottom: 24px;
    border-bottom: 2px solid #cfd4d885;
  }
}
.form-change-password {
  max-width: 600px;
  margin: auto;
  margin-top: 24px;
  .each-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .field-title {
      color: #000000;
      font-weight: bold;
      white-space: nowrap;
      margin-bottom: 0 !important;
      width: 150px;
    }
    .input-change-pw {
      border: 1px solid #cfd4d8;
      border-radius: 4px;
      padding: 6px 12px;
      width: calc(100% - 150px);
    }
  }
}
</style>
