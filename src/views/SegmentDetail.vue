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
          {{ isOnEdit ? "Edit" : "Detail" }} Segment: {{ detail.name }}
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
          class="segment-detail-tabs"
          :active-class="'segment-detail-tabs-header__active'"
          :hide-slider="true"
        >
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>

      <v-tabs-items
        v-model="tab"
        class="tabs-wrapper companies-detail-tabs__wr"
        :class="[
          editGeneralInfo ? 'companies-detail-tabs__fh' : '',
          createNewContact || createExistContact
            ? 'companies-detail-tabs__contacts'
            : '',
        ]"
      >
        <v-tab-item>
          <SegmentDataList
            :current-detail="detail"
            :currentId="id"
            :on-create-new-contact="onCreateNewContact"
            :on-show-detail-contact="onShowDetailContact"
            :open-cf-delete="openCfDelete"
            :set-edit="setEdit"
          />
        </v-tab-item>
        <v-tab-item>
          <SegmentHistory
            v-if="tab == 1"
            :current-detail="detail"
            :currentId="id"
            :updateCurrentData="updateCurrentData"
            :backAction="onCloseDetailContact"
          />
        </v-tab-item>
      </v-tabs-items>
      <ConfirmNormal
        :content="deleteConfirmContent"
        :is-visible="showDeletePopup"
        :on-cancel="onCancelDelete"
        :on-confirm="onConfirmDelete"
        :on-loading="loadingDelete"
        :close-outside="true"
        :button-confirm-text="'Deactive'"
      />
    </div>
  </DefaultLayout>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "@/layouts/default.vue"
import api from "@/services"
import {
  SegmentDataList,
  //
  SegmentHistory,
} from "@/components/Tabs"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
export default {
  components: {
    DefaultLayout,
    SegmentDataList,
    ConfirmNormal,
    //
    SegmentHistory,
  },
  data() {
    return {
      id: null,
      detail: {},
      editGeneralInfo: false,
      createNewOppotunity: false,
      createNewContact: false,
      createFromExistContact: false,
      createExistContact: false,
      showDeletePopup: false,
      showDetailContact: false,
      loadingDelete: false,
      tab: null,
      isOnEdit: false,
      items: ["Data List", "History"],
      text: "Lorem ipsum dolor sit amet, co",
    }
  },
  computed: {
    deleteConfirmContent() {
      return `Do you want to deactive this segment <b>${
        this.detail.name ? this.detail.name : ""
      }</b> `
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
    setEdit(val) {
      this.isOnEdit = val
    },
    onCreateOppotunity() {
      this.createNewOppotunity = true
      this.tab = 2
    },
    backListOpportunities() {
      this.createNewOppotunity = false
      this.tab = 2
    },
    onCreateNewContact() {
      this.createNewContact = true
      this.tab = 1
      this.createFromExistContact = false
    },
    onCloseDetailContact() {
      this.createNewContact = false
      this.tab = 1
      this.createFromExistContact = false
      this.showDetailContact = false
      const query = { ...this.$route.query }
      delete query.contactId
      this.$router.replace({
        query,
      })
    },
    onShowDetailContact() {
      this.createNewContact = false
      this.tab = 1
      this.createFromExistContact = false
      this.showDetailContact = true
    },
    onCreateExistContact() {
      this.createNewContact = false
      this.tab = 1
      this.createFromExistContact = true
    },
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
      this.$router.push("/segments")
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
    backContactInfo() {
      this.createNewContact = false
      this.tab = 1
      this.createFromExistContact = false
    },
    async getDetailData() {
      const res = await api.segment.getDetailData(this.id, {})
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.detail = res.data.data.segment

          return
        }
        const msg =
          "Failed when get segment detail: " +
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
      const res = await api.segment.delete(this.id)
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Deactive segment success")
          this.onCancelDelete()
          this.$router.push("/segments")
          return
        }
        const msg =
          "Failed when deactive segment: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when deactive segment: " + error.message ||
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
.segment-detail-tabs {
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
.companies-detail-tabs__wr {
  height: calc(100% - 130px);
  &.companies-detail-tabs__fh {
    height: calc(100% - 130px);
  }
  &.companies-detail-tabs__contacts {
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
