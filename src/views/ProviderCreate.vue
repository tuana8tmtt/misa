<template>
    <DefaultLayout>
      <div class="h-100 first-wr-in-df">
        <div class="bread-crumb has-btn">
          <p class="bc-page__title">
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
            Add new Customer
          </p>
        </div>
  
        <div class="tabs-wrapper customers-detail-tabs__wr">
          <CustomerInfoCreate
            :current-detail="detail"
            :updateCurrentData="updateCurrentData"
            :backGeneralInfo="backToList"
          />
        </div>
  
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
  import { CustomerInfoCreate } from "@/components/Tabs"
  import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
  export default {
    name: "ProviderDetail",
    components: {
      DefaultLayout,
      ConfirmNormal,
      CustomerInfoCreate,
    },
    data() {
      return {
        id: null,
        detail: {},
        editGeneralInfo: false,
        showDeletePopup: false,
        loadingDelete: false,
      }
    },
    computed: {
      deleteConfirmContent() {
        return `Delete customer <b>${
          this.detail.name ? this.detail.name : ""
        }</b> From the list`
      },
    },
    mounted() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
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
      // id() {
      //   if (this.id) {
      //     this.getDetailData()
      //   }
      // },
      tab() {
        const query = { ...this.$route.query, tab: this.tab }
        this.$router.replace({
          query,
        })
      },
    },
    methods: {
      onEditGeneralInfo() {
        this.editGeneralInfo = true
        this.$router.replace({
          query: { isEdit: true },
        })
      },
      updateCurrentData(data) {
        this.detail = data
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
      // async getDetailData() {
      //   const res = await api.company.getDetailData(this.id, {})
      //   if (!res) {
      //     return null
      //   }
      //   try {
      //     if (res.status > 199 && res.status < 399) {
      //       this.detail = res.data.data.company
  
      //       return
      //     }
      //     const msg =
      //       "Failed when get company detail: " +
      //       (res.status === 404
      //         ? "Not found"
      //         : res.data.message || String(res) || " Try again")
  
      //     this.$store.commit("toast/getError", msg)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // },
      async onConfirmDelete() {
        this.loadingDelete = true
        const res = await api.company.delete(this.id)
        if (!res) {
          return null
        }
        this.loadingDelete = false
        try {
          if (res.status > 199 && res.status < 399) {
            this.$store.commit("toast/getSuccess", "Remove company success")
            this.onCancelDelete()
            this.$router.push("/customers")
            return
          }
          const msg =
            "Failed when remove company: " +
            (res.data.message || String(res) || " Try again")
          this.$store.commit("toast/getError", msg)
        } catch (error) {
          const msg =
            "Failed when remove file: " + error.message ||
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
  .company-detail-tabs {
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
    .v-window__container,
    .v-window-item--active {
      height: 100%;
    }
  }
  .tab-control {
    display: flex;
  }
  </style>
  