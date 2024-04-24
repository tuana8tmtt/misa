<template>
  <DefaultLayout>
    <div style="height: calc(100% - 30px)">
      <div class="emails-tab h-100 bg-white">
        <v-tabs
          v-model="tab"
          background-color="#F8F8FA"
          color="#E04038"
          class="tab-navigator-controls"
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1"> Sent </v-tab>

          <v-tab href="#tab-2"> Send Email </v-tab>

          <v-tab href="#tab-3"> Template </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="tabs__wr">
          <v-tab-item class="h-100" value="tab-1">
            <EmailTabSent
              :target-ei="+targetEi"
              :list-data="listEmail"
              :list-template="listTemplate"
              :get-list-email="getListEmail"
              :on-scroll-loadmore="onScrollLoadmore"
              :on-change-query="onChangeQuery"
            />
          </v-tab-item>
          <v-tab-item class="h-100" value="tab-2">
            <EmailTabSend
              :list-data="listEmail"
              :list-template="listTemplate"
              :get-list-email="getListEmail"
              :list-params="listParams"
            />
          </v-tab-item>
          <v-tab-item class="h-100" value="tab-3">
            <EmailTabTemplate
              :isActive="tab === 'tab-3'"
              :list-data="listEmail"
              :list-template="listTemplate"
              :get-list-template="getListTemplate"
              :list-params="listParams"
            />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default.vue"
import api from "@/services"

import { EmailTabSent, EmailTabSend, EmailTabTemplate } from "@/components/Tabs"
//
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
export default {
  components: {
    DefaultLayout,
    EmailTabSent,
    EmailTabSend,
    EmailTabTemplate,
  },
  data() {
    return {
      tab: "tab-1",
      listEmail: [],
      maxCountEmail: 1,
      refScrollLoad: 0,
      listTemplate: [],
      listParams: [],
      query: {},
      targetEi: 0,
    }
  },
  mounted() {
    const query = { ...this.$route.query }
    if (query.eTab) {
      this.tab = query.eTab
    }
    if (query.ei) {
      this.targetEi = query.ei
    }
    this.getListEmail()
    this.getListTemplate()
    this.getListParams()
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        const query = { ...this.$route.query }
        if (query.eTab) {
          this.tab = query.eTab
        }
        if (query.ei) {
          this.targetEi = query.ei
        }
      },
    },
    tab: {
      deep: true,
      handler() {
        const query = { ...this.$route.query }
        this.$router.replace({
          query: {
            ...query,
            eTab: this.tab,
          },
        })
        if (this.tab === "tab-2") {
          this.getListTemplate()
        }
      },
    },
    query: {
      deep: true,
      handler() {
        const query = { ...this.query, size: this.listEmail.length }
        this.getListEmail(query)
      },
    },
  },
  mixins: [objHandlerMixins, dateMixins, commonMethods],
  methods: {
    onChangeQuery(_val) {
      this.query = { ..._val }
    },
    async getListEmail(query = {}) {
      const res = await api.email.getListData({
        ...query,
        size: query.size && query.size >= 15 ? query.size : 15,
        sent: true,
      })
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.listEmail = res.data.data.emails
          this.maxCountEmail = res.data.data.meta.pagination.total
          return
        }
        const msg =
          "Failed when get Emails: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when get Emails: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    async getListTemplate(query = {}) {
      const res = await api.template.getListData({
        ...query,
        pagination: false,
      })
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.listTemplate = res.data.data.templates
          return
        }
        const msg =
          "Failed when get template: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when get template: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    async getListParams(query = {}) {
      const res = await api.email.getListParams({
        ...query,
        pagination: false,
      })
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.listParams = res.data.data
          return
        }
        const msg =
          "Failed when get Emails: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when get Emails: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    onScrollLoadmore(e) {
      // console.log(e.target.scrollHeight - e.target.scrollTop)
      if (!e.target) {
        return
      }
      if (
        e.target.scrollTop + e.target.clientHeight + 80 >
        e.target.scrollHeight
      ) {
        if (this.refScrollLoad) {
          clearTimeout(this.refScrollLoad)
        }
        this.refScrollLoad = setTimeout(() => {
          clearTimeout(this.refScrollLoad)
          if (this.listEmail.length < this.maxCountEmail) {
            this.$nextTick(() => {
              const query = { ...this.query, size: this.listEmail.length + 15 }
              this.getListEmail(query)
            })
          }
        }, 200)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.emails-tab {
  border: 1px solid #cfd4d8;
  padding-bottom: 0;
  a.v-tab {
    min-width: 120px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .tabs__wr {
    height: calc(100% - 50px);
  }
}
</style>
<style lang="scss">
.emails-tab {
  .v-window__container {
    height: 100% !important;
  }
  .v-tabs-bar {
    height: 64px;
  }
  .v-tabs-bar__content {
    height: 64px;
  }
  .tab-navigator-controls {
    border-bottom: 1px solid #cfd4d8;
    .v-tab {
      text-transform: none !important;
      letter-spacing: 0 !important;
      font-size: 16px !important;
    }
  }
}
</style>
