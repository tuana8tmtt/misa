<template>
  <v-row class="email-tab email-tab__sent h-100 m-0">
    <v-col cols="3" class="email-sent__side-bar px-0 h-100">
      <div class="row-info search-full-with-icon">
        <img
          src="@/assets/imgs/icons/look-up-icon.svg"
          alt=""
          style="filter: invert(0.6)"
        />
        <input
          v-model="searchKey"
          type="text"
          class="row-info__content"
          placeholder="Search here ..."
        />
      </div>
      <div class="row-info">
        <div class="row-info__content">
          <v-autocomplete
            class="
              v-autocomplete__nodetails
              v-autocomplete__noshadow
              v-autocomplete__borderform
              v-autocomplete__modappend
              v-autocomplete__formheight
            "
            v-model="template"
            :items="listTemplateComputed"
            item-text="name"
            :return-object="true"
            :placeholder="'Template'"
            dense
            label=""
            solo
          >
            <template v-slot:append
              ><div class="v-auto-append-icon">
                <img
                  src="@/assets/imgs/icons/menu-down-icon.svg"
                  alt="back-icon"
                  height="22px"
                  class="pointer mx-1"
                />
              </div>
            </template>
          </v-autocomplete>
        </div>
      </div>
      <div class="list-email__wr scrollbar-y" @scroll="onScrollLoadmore">
        <p v-if="!listData || !listData.length" class="px-3 text-center">
          <em>No email found</em>
        </p>
        <div
          v-for="email in listData"
          :key="email.id"
          class="each-email"
          :class="selectedData && selectedData.id === email.id ? 'active' : ''"
          @click="setSelectedData(email)"
        >
          <p class="mb-0">
            Sent to
            <b>{{
              email.segments
                ? mergeStringFromField(email.segments, "name")
                : "-"
            }}</b>
            with
            <span class="template-name-hl">{{
              email.template && email.template.name ? email.template.name : ""
            }}</span>
          </p>
          <span class="time-title">{{
            email.sent_at
              ? parseDateString(email.sent_at, "hm dmy")
              : "Scheduled"
          }}</span>
          <p class="mb-0 text-limit-2">
            {{ returnTextOnly(email.subject) }}
          </p>
        </div>
      </div>
    </v-col>
    <v-col cols="9" class="detail-tab-wr scrollbar-y">
      <div v-if="selectedData && selectedData.id" class="detail-email">
        <div class="detail-header">
          <p class="detail-header_title">{{ selectedData.subject }}</p>
          <div class="list_sent_to">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"
                  >To:
                  {{
                    detailEmail.emails
                      ? mergeStringFromFlatArray(detailEmail.emails.slice(0, 3))
                      : ""
                  }}{{
                    detailEmail.emails &&
                    detailEmail.emails.length &&
                    detailEmail.emails.length > 3
                      ? ", and" +
                        ` ${detailEmail.emails.length - 3}` +
                        " emails"
                      : ""
                  }}</span
                >
              </template>
              <span>
                {{
                  detailEmail.emails
                    ? mergeStringFromFlatArray(detailEmail.emails.slice(3))
                    : ""
                }}</span
              >
            </v-tooltip>
            <span
              class="time-title d-block mt-2"
              style="font-size: 13px; color: #2c3e50"
              >{{
                detailEmail.sent_at
                  ? parseDateString(detailEmail.sent_at, "hm dmy")
                  : "Scheduled"
              }}</span
            >
          </div>
        </div>
        <div class="detail-body" v-html="selectedData.body"></div>
        <div class="detail-attachments atm-dt d-flex">
          <p class="font-weight-bold mb-0 mr-2">Attachments</p>
          <div>
            <div
              v-for="att in detailAttachmentsComputed"
              :key="att.id"
              class="each-attachment"
            >
              <a :href="att.url" target="_blank" :download="att.url">
                {{ att.original_name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import api from "@/services"
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      },
    },
    targetEi: {
      type: Number,
      default: 0,
    },
    listTemplate: {
      type: Array,
      default() {
        return []
      },
    },
    onScrollLoadmore: {
      type: Function,
      default() {},
    },
    onChangeQuery: {
      type: Function,
      default() {},
    },
  },
  mixins: [dateMixins, commonMethods, objHandlerMixins],
  data() {
    return {
      template: {
        id: 0,
        name: "All",
      },
      searchKey: "",
      selectedData: {},
      detailEmail: {},
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        const rslt = this.listData.filter((o) => o.id == this.targetEi)
        if (rslt && rslt.length) {
          this.setSelectedData(rslt[0])
        }
      },
    },
    listData: {
      deep: true,
      handler() {
        if (this.firstSelect) {
          return
        }
        if (this.listData && this.listData.length) {
          this.firstSelect = false
          const rslt = this.listData.filter((o) => o.id == this.targetEi)
          if (rslt && rslt.length) {
            this.setSelectedData(rslt[0])
          }
        }
      },
    },
    searchKey: {
      deep: true,
      handler() {
        if (this.refKeyQuery) {
          clearTimeout(this.refKeyQuery)
        }
        this.refKeyQuery = setTimeout(() => {
          const query = {}
          if (this.searchKey) {
            query.search = this.searchKey
          }
          if (this.template.id) {
            query.template_id = this.template.id
          }
          this.onChangeQuery(query)
        }, 700)
      },
    },
    template: {
      deep: true,
      handler() {
        if (this.refKeyQuery) {
          clearTimeout(this.refKeyQuery)
        }
        this.refKeyQuery = setTimeout(() => {
          const query = {}
          if (this.searchKey) {
            query.search = this.searchKey
          }
          if (this.template.id) {
            query.template_id = this.template.id
          }
          this.onChangeQuery(query)
        }, 700)
      },
    },
    selectedData: {
      deep: true,
      handler() {
        if (this.selectedData && this.selectedData.id) {
          this.getDetailEmail(this.selectedData.id)
        }
      },
    },
  },
  computed: {
    detailAttachmentsComputed() {
      if (this.detailEmail && this.detailEmail.id) {
        return this.detailEmail.attachments
      } else {
        return []
      }
    },
    listTemplateComputed() {
      return [
        {
          id: 0,
          name: "All",
        },
        {
          id: "_blank",
          name: "Blank",
        },
        ...this.listTemplate,
      ]
    },
  },
  methods: {
    setSelectedData(_data) {
      this.selectedData = { ..._data }
    },
    async getDetailEmail(id, query = {}) {
      const res = await api.email.getDetailData(id, query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.detailEmail = res.data.data.email
          return
        }
        const msg =
          "Failed when get email: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when get email: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.email-tab {
  input.row-info__content {
    border: 1px solid #cfd4d8;
    border-radius: 4px;
    padding: 6px 12px;
    height: 40px;
    /* width: 100%; */
  }
  .search-full-with-icon {
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 26px;
      transform: translateY(-50%);
    }
    input.row-info__content {
      padding-left: 36px;
    }
  }
}
.row-info {
  display: flex;
  align-items: flex-start;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  &.p-tb-12 {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  &__label {
    margin-bottom: 0;
    /* padding-top: 4px; */
    width: 150px;
    white-space: nowrap;
    color: #000;
    font-weight: bold;
    line-height: 19px;
  }
  &__content {
    margin: auto;
    margin-bottom: 0;
    width: calc(100% - 32px);
    color: #000;
    line-height: 19px;
  }
}
input.row-info__content {
  border: 1px solid #cfd4d8;
  border-radius: 4px;
  padding: 6px 12px;
  height: 32px;
  /* width: 100%; */
}
.template-name-hl {
  color: #e04038;
  font-weight: 500;
}
.time-title {
  color: #666666;
  font-size: 14px;
}
.each-email {
  cursor: pointer;
  padding: 12px 16px;
  &.active {
    background-color: #f8f8fa;
  }
  &:hover {
    background-color: #f8f8fa;
  }
}
.email-sent__side-bar {
  border-right: 1px solid #cfd4d8;
}
.detail-email {
  padding: 12px 32px 22px;
}
.detail-header {
  &_title {
    color: #000;
    font-size: 24px;
    margin-bottom: 0;
    font-weight: bold;
  }
  .list_sent_to {
    padding-bottom: 16px;
    border-bottom: 1px dashed #cfd4d8;
  }
}
.detail-body {
  padding: 16px 0;
  overflow: hidden;
}
.detail-attachments {
}
.atm-dt {
  padding-bottom: 16px;
  border-bottom: 1px dashed #cfd4d8;
}
.list-email__wr {
  height: calc(100% - 100px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.detail-tab-wr {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
