<template>
  <div class="company-contact-tab__detail h-100">
    <div class="each-info-part h-100">
      <v-row class="each-part pt-3 my-0 pr-2 h-100">
        <v-col xl="7" lg="7" cols="12" class="pt-0 pb-0">
          <div class="part-title">
            <p class="row-info__label">History</p>
          </div>
          <v-data-table
            :headers="headers"
            :items="desserts"
            hide-default-footer
            :disable-sort="true"
            class="vuetify-table__mod-header vuetify-table__mod-border"
          >
            <template v-slot:item.actions="{ item }">
              <div class="w-max-content">
                <img
                  v-if="item.properties && item.properties.email"
                  class="pointer mr-2"
                  src="@/assets/imgs/icons/email-noround-icon.svg"
                  :alt="item.id"
                  @click="navigateTo('/emails')"
                />
              </div> </template
          ></v-data-table>
        </v-col>
        <v-col xl="5" lg="5" cols="12" class="pt-0 pb-0">
          <div
            class="
              part-title
              px-0
              border-btm-normal
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <p class="row-info__label">Note</p>
          </div>
          <div v-if="!isEdit" class="detail-info read-only pt-2">
            <div
              class="detail-row list-comments"
              id="listComment"
              @scroll="onScrollLoadmore"
            >
              <div
                v-for="comment in listComments"
                :key="comment.id"
                class="each-comment"
              >
                <div class="comment-header">
                  <p class="creator-name">
                    {{ comment.creator ? comment.creator.name : "" }}
                  </p>
                  <p class="created-at">
                    {{ comment.isPreview ? "Sending" : comment.created_at }}
                  </p>
                </div>
                <pre v-html="comment.content" class="text-left"></pre>
              </div>
            </div>

            <div class="detail-row d-flex align-items-center flex-wrap">
              <p class="detail-row__title w-100">Note</p>
              <textarea
                v-model="comment"
                name=""
                id=""
                rows="4"
                class="detail-row__info row-info__content"
                @keypress.exact.enter.prevent="postComment"
                @keypress.enter.prevent
              ></textarea>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- % -->

    <ConfirmNormal
      :content="deleteConfirmContent"
      :is-visible="showDeletePopup"
      :on-cancel="onCancelDelete"
      :on-confirm="onConfirmDelete"
      :on-loading="loadingDelete"
      :close-outside="true"
    />
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import api from "@/services"
import dateMixins from "@/mixins/dateMixins.js"
import routeMixins from "@/mixins/routeMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"

// import DateRangeTableHeader from "@/components/Shared/DateRangeTableHeader.vue"
import { mapState, mapGetters } from "vuex"
export default {
  name: "CompanyContactCreate",
  components: { ConfirmNormal },
  props: {
    currentDetail: {
      type: Object,
    },
    currentId: {
      type: null,
    },
    updateCurrentData: {
      type: Function,
    },
    backAction: {
      type: Function,
    },
  },
  // components: { DateRangeTableHeader },
  data() {
    return {
      form: {},
      isEdit: false,
      billingInfomation: {},
      socialNetwork: {},
      otherLocations: [],
      phoneList: [],
      loadingDelete: false,
      showDeletePopup: false,
      phoneTypes: [
        {
          name: "Phone",
          id: "phone",
        },
        {
          name: "Skype",
          id: "skype",
        },
        {
          name: "Zalo",
          id: "zalo",
        },
        {
          name: "Viber",
          id: "viber",
        },
        {
          name: "Whatsapp",
          id: "whatsapp",
        },
        {
          name: "Wechat",
          id: "wechat",
        },
        {
          name: "Wechat",
          id: "wechat",
        },
      ],
      anniversaries: [{ start_at: null, title: "" }],
      listEmail: [{ txt: "" }],
      filesClipboard: [],
      values: "",
      id: "",
      defaultCountry: "",
      phoneCountry: null,
      phoneNumber: "",
      loadedData: false,
      loadingUpdate: false,
      phoneDropdownOptions: {
        showDialCodeInSelection: true,
        showSearchBox: true,
        showFlags: true,
        showDialCodeInList: true,
      },
      listRemovedFile: [],
      headers: [
        {
          sort: false,
          text: "Sent timestamp",
          align: "start",
          value: "created_at",
        },
        { text: "Type", value: "description" },
        { text: "Email Template", value: "properties.template.name" },
        { text: "Contact", value: "properties.contact_count" },
        { text: "Done by", value: "causer.name" },
        { text: "Action", value: "actions" },
      ],
      desserts: [],
      listComments: [],
      countComments: 10,
      maxCountComments: 10,
      comment: "",
      refScrollLoad: 0,
    }
  },

  mixins: [objHandlerMixins, dateMixins, commonMethods, routeMixins],
  computed: {
    ...mapState({
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      companyTypes: (state) => state.others.companyTypes,
      companyStages: (state) => state.others.companyStages,
      locationTypes: (state) => state.others.locationTypes,
    }),

    ...mapGetters({
      userFromAuth: "userFromAuth",
    }),
    attachmentsComputed() {
      const arr = this.currentDetail.attachments
        ? [...this.currentDetail.attachments]
        : []
      return arr.filter((o) => !this.listRemovedFile.includes(o.id)) || []
    },
    deleteConfirmContent() {
      return `Delete contact <b>${
        this.form.full_name ? this.form.full_name : ""
      }</b> From the list`
    },
  },
  watch: {
    currentDetail: {
      deep: true,
      handler() {
        // this.parseData()
      },
    },
    $route: {
      deep: true,
      handler() {
        const query = this.$route.query
        if (query.contactId) {
          this.id = query.contactId
        }
      },
    },
    currentId() {
      if (this.currentId) {
        this.getListLog()
      }
    },
  },
  mounted() {
    const query = this.$route.query
    if (query.contactId) {
      this.id = query.contactId
    }
    this.getListLog()
    this.getListComments()
  },
  methods: {
    async getListLog() {
      const res = await api.segment.getListLog(this.currentId, {})
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.desserts = [...res.data.data.logs]
          return
        }
        const msg =
          "Failed when get segment log: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")

        this.$store.commit("toast/getError", msg)
      } catch (error) {
        console.log(error)
      }
    },

    async getListComments(nextSize = 0) {
      const res = await api.segment.getListComments(this.currentId, {
        size: this.countComments + nextSize,
      })
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          const target = document.querySelector("#listComment")
          const previousTop = target.scrollHeight
          console.log(previousTop)
          this.listComments = [...res.data.data.comments]
          if (nextSize) {
            const nowTop = target.scrollHeight
            document.querySelector("#listComment").scrollTop =
              nowTop - previousTop
          }
          this.countComments += nextSize
          this.maxCountComments = res.data.data.meta.pagination.total
          this.$nextTick(() => {
            document.querySelector("#listComment").scrollTop =
              document.querySelector("#listComment").scrollHeight
          })
          return
        }
        const msg =
          "Failed when get segment log: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")

        this.$store.commit("toast/getError", msg)
      } catch (error) {
        console.log(error)
      }
    },
    async postComment() {
      const body = { content: this.comment }
      const previewCmd = {
        id: new Date().getTime(),
        isPreview: true,
        content: this.comment,
        creatable_type: "App\\User",
        creatable_id: 1,
        commentable_type: "Modules\\Contact\\Entities\\Segment",
        commentable_id: 1,
        parent_id: null,
        is_approved: true,
        created_at: new Date(),
        updated_at: new Date(),
        total_likes: 0,
        total_feedback: 0,
        creator: {
          ...this.userFromAuth,
        },
      }
      this.comment = ""
      this.listComments.push(previewCmd)
      this.$nextTick(() => {
        document.querySelector("#listComment").scrollTop =
          document.querySelector("#listComment").scrollHeight
      })
      const res = await api.segment.postComment(this.currentId, body)
      if (!res) {
        return null
      }
      try {
        const idx = this.listComments.findIndex((o) => o.id === previewCmd.id)
        if (res.status > 199 && res.status < 399) {
          if (idx && idx !== -1) {
            this.listComments.splice(idx, 1, res.data.data.comment)
          }
          this.countComments += 1
          this.maxCountComments += 1
          return
        }
        if (idx && idx !== -1) {
          this.listComments.splice(idx, 1)
        }
        const msg =
          "Failed when get comment: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")

        this.$store.commit("toast/getError", msg)
      } catch (error) {
        console.log(error)
      }
    },
    addEmail() {
      this.listEmail.push({ txt: "" })
    },
    addLocation() {
      this.otherLocations.push({ type: "", address: "" })
    },
    addPhoneSocial() {
      this.phoneList.push({ type: "", number: "" })
    },
    addAni() {
      this.anniversaries.push({ start_at: null, title: "" })
    },
    removeEmail(idx) {
      this.listEmail.splice(idx, 1)
    },
    removeAni(idx) {
      this.anniversaries.splice(idx, 1)
    },
    removeLocation(idx) {
      this.otherLocations.splice(idx, 1)
    },
    handleParseAniDate(value) {
      if (!value) {
        return null
      }
      const pValAr = value.split("-")

      return `${pValAr[2]}-${pValAr[1]}-${pValAr[0]} 00:00:00`
    },
    pickedDateAni(_val) {
      const idx = +_val.fieldUpdate
      const obj = { ...this.anniversaries[idx] }
      obj.start_at = this.handleParseAniDate(_val.value.startDate)
      this.anniversaries.splice(idx, 1, obj)
    },
    countryChanged(country) {
      this.phoneCountry = country
    },
    async editContact() {
      this.loadingUpdate = true
      // const formData = new FormData()
      // REQUIRED FIELD

      // eslint-disable-next-line no-unused-vars

      // const formData = new FormData()
      // formData.append("first_name", this.form.first_name || "")
      // formData.append("last_name", this.form.last_name || "")
      // formData.append("gender", this.form.gender || "")
      // formData.append("position", this.form.position || "")
      // formData.append("note", this.form.note || "")
      // formData.append("company_ids[]", this.currentId || "")
      // if (this.form.country) {
      //   formData.append("country_id", this.form.country.id)
      // }
      // if (this.form.city) {
      //   formData.append("city_id", this.form.city.id)
      // }
      // formData.append(
      //   "social_network[facebook]",
      //   this.socialNetwork.facebook || "",
      // )
      // formData.append(
      //   "social_network[linked_in]",
      //   this.socialNetwork.linked_in || "",
      // )

      // this.anniversaries.forEach((o, i) => {
      //   formData.append(`anniversaries[${i}][title]`, o.title)
      //   formData.append(`anniversaries[${i}][start_at]`, o.start_at)
      // })
      // this.listEmail.forEach((o) => {
      //   formData.append("emails[]", o.txt)
      // })
      // this.phoneList.forEach((o, idx) => {
      //   formData.append(
      //     `phones[${idx}][number]`,
      //     String(o.number).replaceAll(" ", ""),
      //   )
      //   formData.append(`phones[${idx}][type]`, o.type)
      // })
      // this.filesClipboard.forEach((o) =>
      //   formData.append("attachments[]", o.blob),
      // )
      const phones = this.phoneList.map((o) => ({
        ...o,
        number: String(o.number).replaceAll(" ", ""),
      }))
      const social_network = { ...this.socialNetwork }
      const anniversaries = this.anniversaries.slice()
      const emails = this.listEmail.map((o) => o.txt)
      const body = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        gender: this.form.gender,
        position: this.form.position,
        note: this.form.note,
        company_ids: this.form.companies.map((o) => o.id),
        phones,
        social_network,
        anniversaries,
        emails,
      }
      if (this.form.country) {
        body.country_id = this.form.country.id
      }
      if (this.form.city) {
        body.city_id = this.form.city.id
      }

      const res = await api.contact.update(this.id, body)
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.updateCurrentData(res.data.data.company)
          this.form = res.data.data.contact
          this.closeEdit()
          return
        }
        const msg =
          "Failed when update contact: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when update contact: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    removeFile(file) {
      this.filesClipboard = this.filesClipboard.filter(
        (o) => o._id !== file._id,
      )
    },
    handleRemoveCacheFile(cacheEleId) {
      try {
        document.querySelector(`#${cacheEleId}`).value = null
      } catch (error) {
        console.log(error)
      }
    },
    openCfDelete() {
      this.showDeletePopup = true
    },
    onCancelDelete() {
      this.showDeletePopup = false
    },
    async onConfirmDelete() {
      this.loadingDelete = true
      const res = await api.contact.delete(this.id)
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Remove contact success")
          this.onCancelDelete()
          this.backAction()
          return
        }
        const msg =
          "Failed when remove contact: " +
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

    async handleChangeFile(event) {
      const files = event.target.files
      const attachments = []
      for (let file of files) {
        attachments.push({
          _id: `${new Date().getTime()}_${Math.random()}`,
          name: file.name,
          type: "file",
          blob: file,
        })
      }
      this.filesClipboard = [...this.filesClipboard, ...attachments]
    },
    parseData() {
      this.phoneNumber = this.form.phone
      this.listEmail = this.form.emails
        ? this.form.emails.map((o) => ({ txt: o }))
        : [{ txt: "" }]
      this.phoneList = this.form.phones
        ? this.form.phones.slice()
        : [{ type: "", number: "" }]
      this.anniversaries = this.form.anniversaries
        ? this.form.anniversaries.slice()
        : [{ start_at: null, title: "" }]

      this.socialNetwork =
        this.form && this.form.social_network ? this.form.social_network : {}
      this.$nextTick(() => {
        this.loadedData = true
      })
    },
    onEdit() {
      this.parseData()
      this.isEdit = true
    },
    closeEdit() {
      this.isEdit = false
    },
    onScrollLoadmore(e) {
      // console.log(e.target.scrollHeight - e.target.scrollTop)
      if (e.target.scrollTop < 80) {
        if (this.refScrollLoad) {
          clearTimeout(this.refScrollLoad)
        }
        this.refScrollLoad = setTimeout(() => {
          clearTimeout(this.refScrollLoad)
          if (this.countComments < this.maxCountComments) {
            this.$nextTick(() => {
              this.getListComments(10)
            })
          }
        }, 200)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.company-contact-tab__detail {
  background-color: #fff;
  border: 1px solid #cfd4d8;
  padding-bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    opacity: 0;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
  }
  .required-star {
    padding-left: 4px;
  }
  .each-part {
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 18px;
  }
  .info-part__title {
    border-top: 1px solid #cfd4d8;
    border-bottom: 1px solid #cfd4d8;
    padding: 16px 30px;
    background-color: #f8f8fa;
    color: #000;
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
    &.has-back-btn {
      padding-left: 16px;
    }
    &.no-border-top {
      border-top: unset;
    }
    &-icon {
      display: flex;
      align-items: center;
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
      margin-bottom: 0;
      /* width: calc(100% - 155px); */
      width: 100%;
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
  textarea.row-info__content {
    border: 1px solid #cfd4d8;
    border-radius: 4px;
    padding: 6px 12px;
    resize: none;
    width: 100%;
  }
  .border-form-block {
    border: 1px solid #cfd4d8;
    border-radius: 4px;
  }
  .social {
    &__content {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    &__icon {
      width: 26px;
      height: 26px;
      object-fit: cover;
      margin-right: 12px;
    }
  }
  .other-location {
    &__type {
      text-transform: capitalize;
    }
  }
}
.add-email-btn {
  color: #0a71bc;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}
.v-auto-append-icon {
  border-left: 1px solid #cfd4d8;
  background-color: #f8f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.single-date-wr {
  width: 200px !important;
  height: 32px !important;
  margin-left: 12px;
  .vue-daterange-picker {
    width: 100% !important;
    height: 100% !important;
  }
}
.update-gr-btn {
  position: fixed;
  bottom: 16px;
  right: 30px;
}
.each-file-in-attachments {
  padding: 6px 12px;
  margin-right: 6px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  .file-name {
    display: block;

    width: fit-content;
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #0a71bc;
    margin-bottom: 0px;
  }
}
.label-browse-file {
  background: #f8f8fa 0% 0% no-repeat padding-box;
  border: 1px solid #cfd4d8;
  border-radius: 4px;
  font-weight: bold;
  line-height: 40px;
  width: 150px;
  display: block;
  text-align: center;
  height: 40px;
  margin-right: 12px;
  margin-bottom: 8px;
}
.part-title {
  padding: 0 20px 17px;
  &.border-btm-normal {
    border-bottom: 1px solid #cfd4d8;
  }
}
.detail-row {
  padding: 8px 0;
  &__title {
    letter-spacing: 0px;
    color: #000000;
    font-weight: bold;
    white-space: nowrap;
    width: 120px;
    margin-bottom: 0;
  }
  &__info {
    letter-spacing: 0px;
    color: #000000;
    margin-bottom: 0;
  }
}
.additional-title {
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  padding: 24px 0;
}
.each-ani {
  &__paragraph {
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #cfd4d8;
    border-radius: 20px;
  }
  &__title {
    color: #000000;
  }
  &__date {
    color: #000000;
    white-space: nowrap;
  }
}
.list-comments {
  height: calc(100vh - 430px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    opacity: 0;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
  }
}
.each-comment {
  margin-bottom: 16px;
  border: 1px solid #cfd4d872;
  border-radius: 4px;
  padding: 12px;
}
.comment-header {
  display: flex;
  align-items: flex-start;
  /* justify-content: space-between; */
  .creator-name {
    font-weight: 700;
    margin-bottom: 4px;
  }
  .created-at {
    margin-left: 40px;
    font-weight: 500;
    margin-bottom: 4px;
  }
}
</style>
