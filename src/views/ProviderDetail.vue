<template>
    <DefaultLayout>
      <div class="h-100 first-wr-in-df">
        <div class="bread-crumb has-btn">
          <p v-show="!editGeneralInfo" class="bc-page__title">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  src="@/assets/imgs/icons/arrow-left-icon.svg"
                  alt="back-icon"
                  class="pointer mr-2"
                  @click="backToList"
                />
              </template>
              <span>Back</span>
            </v-tooltip>
            Customer Detail: {{ detail.account_object_name }}
          </p>
  
          <p v-show="editGeneralInfo" class="bc-page__title">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  src="@/assets/imgs/icons/arrow-left-icon.svg"
                  alt="back-icon"
                  class="pointer mr-2"
                  @click="backGeneralInfo"
                />
              </template>
              <span>Back</span>
            </v-tooltip>
            Edit
          </p>
        </div>
        <div
          v-show="!editGeneralInfo"
          class="tab-control justify-content-between mb-3"
        >
          <v-tabs
            v-model="tab"
            class="customer-detail-tabs"
            :active-class="'customer-detail-tabs-header__active'"
            :hide-slider="true"
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <div class="action-gr-btn d-flex align-items-center">
            <v-btn
              depressed
              color="#A7A7A700"
              class="
                btn-normal-text btn-actions-tabs
                bc-btn
                btn-font-weight-regular btn-font-color-66
                mr-3
              "
              @click="onEditGeneralInfo"
            >
              <img
                src="@/assets/imgs/icons/edit-gray-icon.svg"
                alt="edit-gray-icon"
                class="mr-1"
              />
              Edit
            </v-btn>
            <v-btn
              depressed
              color="#A7A7A700"
              class="
                btn-normal-text btn-actions-tabs
                bc-btn
                btn-font-weight-regular btn-font-color-66
              "
              @click="openCfDelete"
            >
              <img
                src="@/assets/imgs/icons/remove-gray-icon.svg"
                alt="remove-gray-icon"
                class="mr-1"
              />
  
              Delete
            </v-btn>
          </div>
        </div>
  
        <v-tabs-items
          v-model="tab"
          class="tabs-wrapper customers-detail-tabs__wr"
          :class="[
            editGeneralInfo ? 'customers-detail-tabs__fh' : '',
            createNewContact || createExistContact || tab === 2
              ? 'customers-detail-tabs__contacts'
              : '',
          ]"
        >
          <v-tab-item>
            <CustomerInfo
              v-if="!editGeneralInfo"
              :current-detail="detail"
              :currentId="id"
            />
            <CustomerInfoEdit
              v-else
              :current-detail="detail"
              :currentId="id"
              :updateCurrentData="updateCurrentData"
              :backGeneralInfo="backGeneralInfo"
            />
          </v-tab-item>
  
          <v-tab-item v-for="item in 3" :key="item">
            <v-card flat>
              <v-card-text v-text="text"></v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <ConfirmNormal
          :content="deleteConfirmContent"
          :is-visible="showDeletePopup"
          :on-cancel="onCancelDelete"
          :on-confirm="onConfirmDelete"
          :on-loading="loadingDelete"
          :close-outside="true"
        />
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  // @ is an alias to /src
  import DefaultLayout from "@/layouts/default.vue"
  import api from "@/services"
  import { CustomerInfo, CustomerInfoEdit } from "@/components/Tabs"
  import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
  export default {
    name: "ProviderDetail",
    components: {
      DefaultLayout,
      ConfirmNormal,
      CustomerInfo,
      CustomerInfoEdit,
    },
    data() {
      return {
        id: null,
        detail: {},
        editGeneralInfo: false,
        createNewContact: false,
        createExistContact: false,
        showDeletePopup: false,
        showDetailContact: false,
        loadingDelete: false,
        tab: null,
        items: ["Genneral Information"],
        text: "Lorem ipsum dolor sit amet, co",
      }
    },
    computed: {
      deleteConfirmContent() {
        return `Delete Customer <b>${
          this.detail.account_object_name ? this.detail.account_object_name : ""
        }</b> From the list`
      },
    },
    mounted() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
      }
      if (this.$route.query && this.$route.query.isEdit === "true") {
        if (this.tab === 0) {
          this.showDetailContact = true
        }
      }
      if (this.$route.query && this.$route.query.contactId) {
        this.tab = 1
        this.showDetailContact = true
      }
      if (this.$route.query && this.$route.query.tab) {
        this.tab = +this.$route.query.tab
      }
    },
    watch: {
      $route: {
        deep: true,
        handler() {
          if (this.$route.params && this.$route.params.id) {
            this.id = this.$route.params.id
          }
        },
      },
      id() {
        if (this.id) {
          this.getDetailData()
        }
      },
      tab() {
        const query = { ...this.$route.query, tab: this.tab }
        this.$router.replace({
          query,
        })
        if (this.tab !== 1) {
          this.showDetailContact = false
        }
      },
    },
    methods: {
      onEditGeneralInfo() {
        this.editGeneralInfo = true
        this.$router.replace({
          query: { isEdit: true },
        })
      },
      backToList() {
        this.$router.push("/customers")
        this.editGeneralInfo = false
        this.tab = 0
      },
      backGeneralInfo() {
        const query = { ...this.$route.query }
        delete query.isEdit
        this.$router.replace({
          query,
        })
        this.editGeneralInfo = false
        this.tab = 0
      },
      updateCurrentData(data) {
        this.detail = data
      },
      async getDetailData() {
        const res = await api.customer.getDetailData(this.id, {})
        if (!res) {
          return null
        }
        try {
          if (res.status > 199 && res.status < 399) {
            this.detail = res.data.data.customer
  
            return
          }
          const msg =
            "Failed when get customer detail: " +
            (res.status === 404
              ? "Not found"
              : res.data.message || String(res) || " Try again")
  
          this.$store.commit("toast/getError", msg)
        } catch (error) {
          console.log(error)
        }
      },
      async onConfirmDelete() {
        this.loadingDelete = true
        const res = await api.customer.delete(this.id)
        if (!res) {
          return null
        }
        this.loadingDelete = false
        try {
          if (res.status > 199 && res.status < 399) {
            this.$store.commit("toast/getSuccess", "Remove customer success")
            this.onCancelDelete()
            this.$router.push("/customers")
            return
          }
          const msg =
            "Failed when remove customer: " +
            (res.data.message || String(res) || " Try again")
          this.$store.commit("toast/getError", msg)
        } catch (error) {
          const msg =
            "Failed when remove customer: " + error.message ||
            error.data.message ||
            String(error) ||
            " Try again"
          this.$store.commit("toast/getError", msg)
        }
      },
      openCfDelete() {
        this.showDeletePopup = true
      },
      onCancelDelete() {
        this.showDeletePopup = false
      },
    },
  }
  </script>
  <style lang="scss">
  .customer-detail-tabs {
    background-color: transparent !important;
    .v-tabs-bar {
      background-color: transparent !important;
      height: 42px;
      border-radius: 4px !important;
      overflow: hidden;
      border-left: 1px solid #a7a7a7;
      border-right: 1px solid #a7a7a7;
      width: fit-content !important;
      .v-slide-group__wrapper {
        .v-tab {
          text-transform: none !important;
          border-right: 1px solid #a7a7a7;
          border-top: 1px solid #a7a7a7;
          border-bottom: 1px solid #a7a7a7;
          font-size: 14px;
          font-weight: #666666;
          line-height: 22px;
          font-weight: 500;
          letter-spacing: 0px !important;
          &:nth-last-child(1) {
            border-right: unset !important;
          }
        }
      }
    }
    &-header__active {
      background-color: #e04038 !important;
      border-color: #e04038 !important;
      color: #fff !important;
    }
  }
  .customers-detail-tabs__wr {
    height: calc(100% - 130px);
    &.customers-detail-tabs__fh {
      height: calc(100% - 130px);
    }
    &.customers-detail-tabs__contacts {
      height: calc(100% - 180px);
    }
    .v-window__container,
    .v-window-item--active {
      height: 100%;
    }
  }
  .tab-control {
    display: flex;
  }
  </style>
  