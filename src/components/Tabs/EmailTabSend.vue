<template>
  <v-row class="email-tab email-tab__send h-100 m-0">
    <v-col cols="3" class="email-sent__side-bar px-0 h-100">
      <div class="d-flex align-items-center px-3 my-3">
        <v-btn
          depressed
          :color="activeTab === 1 ? '#E04038' : '#F8F8FA'"
          class="
            btn-normal-text btn-actions-tabs
            bc-btn
            btn-font-weight-regular btn-font-color-66
            text-black
            d-block
            ml-auto
            w-50
            btn-tab-ls
          "
          :class="activeTab === 1 ? 'v-btn__textwhite btn-tab-active' : ''"
          @click="activeTab = 1"
        >
          Send new
        </v-btn>
        <v-btn
          depressed
          :color="activeTab === 2 ? '#E04038' : '#F8F8FA'"
          class="
            btn-normal-text btn-actions-tabs
            bc-btn
            btn-font-weight-regular btn-font-color-66
            text-white
            d-block
            w-50
            btn-tab-rs
          "
          :class="activeTab === 2 ? 'v-btn__textwhite btn-tab-active' : ''"
          @click="activeTab = 2"
        >
          Pending
        </v-btn>
      </div>
      <p v-if="activeTab === 1" class="big_title pl-4 mb-3">List template</p>
      <div v-if="activeTab === 1" class="row-info px-4 search-full-with-icon">
        <img
          src="@/assets/imgs/icons/look-up-icon.svg"
          alt=""
          style="filter: invert(0.6)"
        />
        <input
          v-model="searchKey"
          type="text"
          class="row-info__content spec w-100"
          placeholder="Search here ..."
        />
      </div>

      <div v-if="activeTab === 1" class="list-template__wr scrollbar-y">
        <div
          v-for="temp in listTemplateComputed"
          :key="temp.id"
          class="each-temp"
          :class="selectedData && selectedData.id === temp.id ? 'active' : ''"
          @click="setSelectedData(temp)"
        >
          <p class="temp-name text-center mb-0">{{ temp.name }}</p>
        </div>
        <p
          v-if="!listTemplateComputed || !listTemplateComputed.length"
          class="temp-name text-center mb-0"
        >
          No template found
        </p>
      </div>

      <!--  TAB 2 -->

      <p v-if="activeTab === 2" class="big_title pl-4 mb-2">List email</p>
      <div
        v-if="activeTab === 2"
        class="row-info px-4 mb-2 search-full-with-icon"
      >
        <img
          src="@/assets/imgs/icons/look-up-icon.svg"
          alt=""
          style="filter: invert(0.6)"
        />
        <input
          v-model="searchKeyEmail"
          type="text"
          class="row-info__content spec w-100"
          placeholder="Search here ..."
        />
      </div>

      <div class="list-template__wr scrollbar-y" @scroll="onScrollLoadmore">
        <p v-if="!listEmail || !listEmail.length" class="px-3 text-center">
          <em>No email found</em>
        </p>
        <div
          v-for="email in listEmail"
          :key="email.id"
          class="each-email pointer"
          :class="
            selectedDataEmail && selectedDataEmail.id === email.id
              ? 'active'
              : ''
          "
          @click="setSelectedDataEmail(email)"
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
            email.scheduled_at
              ? parseDateString(email.scheduled_at, "hm dmy")
              : "Scheduled"
          }}</span>
          <p class="mb-0 text-limit-2">
            {{ returnTextOnly(email.subject) }}
          </p>
        </div>
      </div>
    </v-col>
    <v-col v-if="activeTab === 1" cols="9" class="detail-tab-wr scrollbar-y">
      <p class="big_title pl-4 mb-0" style="opacity: 0">Email</p>
      <div v-if="selectedData && selectedData.id" class="detail-email">
        <div class="detail-row d-flex align-items-center">
          <p class="detail-row__title">Subject:</p>
          <input
            v-model="subject"
            type="text"
            class="row-info__content"
            placeholder="Subject"
          />
        </div>
        <div class="detail-row d-flex align-items-center">
          <p class="detail-row__title">Send to:</p>
          <div class="row-info__content mr-0">
            <v-autocomplete
              class="
                v-autocomplete__nodetails
                v-autocomplete__noshadow
                v-autocomplete__borderform
                v-autocomplete__modappend
                v-autocomplete__formheight
              "
              v-model="segment"
              :items="segments"
              item-text="name"
              :return-object="true"
              :placeholder="'Segment'"
              multiple
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
        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Body:</p>
          <div class="row-info__content mr-0">
            <ckeditor
              ref="myck4"
              id="myck4"
              v-model="body"
              :config="editorConfig"
              @namespaceloaded="onNamespaceLoaded"
            ></ckeditor>
          </div>
        </div>
        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Set time:</p>
          <div class="row-info__content mr-0">
            <div
              class="
                create-segment-confirm__inner-msg
                d-flex
                align-items-center
                mb-3
              "
            >
              <div class="w-50 inner-datepicker-w100 d-flex">
                <input
                  v-model="timeHM"
                  type="time"
                  name=""
                  id=""
                  class="row-info__content input-time-form mr-2"
                />
                <DateRangeWithTime
                  :singleDatePicker="true"
                  :show-ranges="false"
                  :time-picker24-hour="false"
                  :picked-date="pickedDateAni"
                  :placeholder-picker="'DD/MM/YYYY'"
                  :format-default-date="'dmy'"
                  :time-picker="false"
                  :opens="'left'"
                  :default-date="null"
                  :picker-class="'date-picker__form'"
                  :wrapper-class="'date-picker-single-mod'"
                  :defaultToday="false"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Attachments:</p>
          <div class="row-info__content mr-0">
            <!-- FOR CREATE -->
            <div class="row-info__content mx-0">
              <div
                v-for="att in attachmentsComputed"
                :key="att.id"
                class="each-attachment mb-1"
              >
                <a :href="att.url" target="_blank" :download="att.url">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-bind="attrs"
                        v-on="on"
                        src="@/assets/imgs/icons/file-cog-icon.svg"
                        alt="remove-icon"
                        class="pointer mr-1"
                        height="15px"
                        @click.stop
                      />
                    </template>
                    <span>Template file</span>
                  </v-tooltip>
                  {{ att.original_name }}
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-bind="attrs"
                        v-on="on"
                        src="@/assets/imgs/icons/red-close-icon.svg"
                        alt="remove-icon"
                        class="pointer px-2"
                        height="9px"
                        @click.prevent.stop="removeTemplateFile(att)"
                      />
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </a>
              </div>
            </div>
            <div
              v-for="file in filesClipboard"
              :key="file.id"
              class="each-file-in-attachments mb-1"
            >
              <p
                target="_blank"
                class="row-info__content file-name text-no-wrap"
              >
                {{ file.name }}
              </p>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    v-bind="attrs"
                    v-on="on"
                    src="@/assets/imgs/icons/red-close-icon.svg"
                    alt="remove-icon"
                    class="pointer ml-1"
                    height="9px"
                    @click="removeFile(file)"
                  />
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
            <label
              for="emailAttachment"
              class="pointer label-browse-file"
              @click="handleRemoveCacheFile('emailAttachment')"
              >Browse</label
            >
            <input
              type="file"
              id="emailAttachment"
              class="d-none"
              multiple
              @change="handleChangeFile"
            />
          </div>
        </div>

        <div
          v-if="detailTemplate && detailTemplate.id"
          class="d-flex align-items-center"
        >
          <v-btn
            depressed
            color="#F8F8FA"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              text-black
              d-block
              mt-3
              ml-auto
              mr-3
            "
            @click="onShowPreviewTemplate"
          >
            Preview
          </v-btn>
          <v-btn
            depressed
            :color="returnThemeColorBtnSC()"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              text-white
              v-btn__textwhite
              d-block
              mt-3
            "
            :loading="loadingEmail"
            @click="sendEmail"
          >
            Send
          </v-btn>
        </div>
      </div>
    </v-col>
    <v-col v-if="activeTab === 2" cols="9" class="detail-tab-wr scrollbar-y">
      <div
        v-if="selectedDataEmail && selectedDataEmail.id"
        class="detail-email"
      >
        <div class="detail-header">
          <p class="detail-header_title">{{ selectedDataEmail.subject }}</p>
          <div class="list_sent_to">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on"
                  >To:
                  {{
                    selectedDataEmail.emails
                      ? mergeStringFromFlatArray(
                          selectedDataEmail.emails.slice(0, 3),
                        )
                      : ""
                  }}{{
                    selectedDataEmail.emails &&
                    selectedDataEmail.emails.length &&
                    selectedDataEmail.emails.length > 3
                      ? ", and" +
                        ` ${selectedDataEmail.emails.length - 3}` +
                        " emails"
                      : ""
                  }}</span
                >
              </template>
              <span>
                {{
                  selectedDataEmail.emails
                    ? mergeStringFromFlatArray(
                        selectedDataEmail.emails.slice(3),
                      )
                    : ""
                }}</span
              >
            </v-tooltip>
            <span
              class="time-title d-block mt-2"
              style="font-size: 13px; color: #2c3e50"
              >{{
                selectedDataEmail.scheduled_at
                  ? parseDateString(selectedDataEmail.scheduled_at, "hm dmy")
                  : "Scheduled"
              }}</span
            >
          </div>
        </div>
        <div class="detail-body" v-html="selectedDataEmail.body"></div>
        <div class="detail-attachments atm-dt d-flex">
          <p class="font-weight-bold mb-0 mr-2">Attachments:</p>

          <div>
            <div
              v-for="file in detailAttachmentsComputed"
              :key="file.id"
              class="each-attachment"
            >
              <a
                :href="file.url"
                :n="file.url"
                target="_blank"
                class="row-info__content file-name text-no-wrap ml-0 mb-1"
                >{{ file.original_name }}</a
              >
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <v-btn
            depressed
            color="#F8F8FA"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              bg-white
              btn-border-E7E9ED btn-font-weight-regular btn-font-color-66
              text-black
              d-block
              mt-3
            "
            @click="onShowPreviewEmail"
          >
            <img
              src="@/assets/imgs/icons/eye-outline-icon.svg"
              alt=""
              class="mr-1"
              style="filter: invert(0.4)"
            />
            Preview
          </v-btn>
          <v-btn
            depressed
            color="#F8F8FA"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              bg-white
              btn-border-E7E9ED btn-font-weight-regular btn-font-color-66
              text-black
              d-block
              mt-3
              ml-auto
            "
            @click="onDiscardEmail"
          >
            <img
              src="@/assets/imgs/icons/close-circle-icon.svg"
              alt=""
              class="mr-1"
              style="filter: invert(0.4)"
            />
            Discard
          </v-btn>
        </div>
      </div>
    </v-col>
    <!-- % -->

    <PreviewEmail
      :content="previewEmailDetail"
      :is-visible="showPreviewEmail"
      :on-cancel="onClosePreview"
      :on-confirm="() => {}"
      :on-loading="false"
      :close-outside="true"
    />
    <PreviewTemplate
      :content="previewTemplateDetail"
      :is-visible="showPreviewTemplate"
      :on-cancel="onClosePreview"
      :on-confirm="() => {}"
      :on-loading="false"
      :close-outside="true"
    />
  </v-row>
</template>

<script>
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import PreviewEmail from "@/components/Popup/PreviewEmail.vue"
import PreviewTemplate from "@/components/Popup/PreviewTemplate.vue"
import api from "@/services"
import { mapState } from "vuex"
import { tStr } from "validation_t/src"
import DateRangeWithTime from "@/components/Shared/DateRangeWithTime.vue"
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
export default {
  components: { DateRangeWithTime, PreviewEmail, PreviewTemplate },
  props: {
    listData: {
      type: Array,
      default() {
        return []
      },
    },
    listTemplate: {
      type: Array,
      default() {
        return []
      },
    },
    listParams: {
      type: null,
      default() {},
    },
    getListEmail: {
      type: Function,
      default() {},
    },
  },
  mounted() {
    localStorage.setItem(
      "listParamComputed",
      JSON.stringify(this.listParamComputed),
    )
    this.getListUnsendEmail()
    const query = { ...this.$route.query }
    if (query.tempId) {
      const rslt = this.listTemplate.filter((o) => o.id == query.tempId)
      if (rslt && rslt.length) {
        this.setSelectedData(rslt[0])
      }
    }
  },
  computed: {
    ...mapState({
      segments: (state) => state.others.segments,
    }),
    attachmentsComputed() {
      if (this.detailTemplate && this.detailTemplate.id) {
        return this.detailTemplate.attachments.filter(
          (o) => !this.templateFileRemoved.includes(o.id),
        )
      } else {
        return []
      }
    },
    detailAttachmentsComputed() {
      if (this.detailEmail && this.detailEmail.id) {
        return this.detailEmail.attachments
      } else {
        return []
      }
    },
    listTemplateComputed() {
      const arr = this.listTemplate.filter((o) => {
        try {
          const oVal = tStr.removeAscent(o.name).replaceAll(" ", "")
          const kVal = tStr.removeAscent(this.searchKey).replaceAll(" ", "")
          return oVal.includes(kVal)
        } catch (error) {
          return false
        }
      })
      return [
        {
          body: "",
          created_at: "2022-01-21 09:35:52",
          deleted_at: null,
          id: -1,
          name: "Blank ",
          subject: "",
          updated_at: "",
        },
        ...arr,
      ]
    },
    previewTemplateDetail() {
      if (this.detailTemplate && this.detailTemplate.id) {
        return {
          ...this.detailTemplate,
          body: this.body,
          segments: this.segment,
          subject: this.subject,
        }
      } else {
        return {}
      }
    },
    previewEmailDetail() {
      if (this.detailEmail && this.detailEmail.id) {
        return {
          ...this.detailEmail,
          body: this.detailEmail.body,
          emails: this.detailEmail.emails,
          subject: this.detailEmail.subject,
        }
      } else {
        return {}
      }
    },

    listParamComputed() {
      if (!this.listParams) {
        return []
      }
      const listCaption = Object.values(this.listParams)
      const listName = Object.keys(this.listParams)
      const arr = listCaption.map((o, idx) => {
        return {
          caption: o,
          name: listName[idx],
        }
      })
      return arr
    },
  },
  mixins: [dateMixins, commonMethods, objHandlerMixins],
  data() {
    return {
      showPreviewEmail: false,
      showPreviewTemplate: false,
      segment: [],
      searchKey: "",
      selectedData: {},
      selectedDataEmail: {},
      subject: "",
      detailTemplate: {},
      timeHM: "",
      startDate: "",
      activeTab: 1,
      // CK4
      // listParam: {
      //   ApprovalName: "Tiêu đề",
      //   CreatorAsglId: "Người đề xuất - Mã nhân viên",
      //   CreatorDepartment: "Người đề xuất - Phòng ban",
      //   CreatorName: "Người đề xuất - Tên",
      //   CreatorPosition: "Người đề xuất - Chức vụ",
      //   TestVanBanDai: "test văn bản dài",
      // },
      editorData: "",
      editorConfig: {
        removePlugins: "iframe",
        toolbarGroups: [
          { name: "styles" },
          { name: "colors" },
          { name: "basicstyles" },
          // { name: "document", groups: ["document", "doctools"] },

          // { name: "clipboard", groups: ["clipboard", "undo"] },
          { name: "forms" },

          {
            name: "paragraph",
            groups: ["list", "blocks", "align", "TextIndent", "indent"],
          },
          { name: "tools", groups: ["table"] },
          { name: "insert", groups: ["PageBreak"] },
        ],
        extraPlugins: [
          "pagebreak",
          "justify",
          "textindent",
          "indentblock",
          "timestamp",
          "easyimage",
        ],
        indentation: "20px",
        indentationKey: "tab",
        image2_alignClasses: [
          "image-align-left",
          "image-align-center",
          "image-align-right",
        ],
        image2_disableResizer: true,
        // easyimg config
        // cloudServices_tokenUrl: "https://six-am.maychudev.com/api/me",
        // cloudServices_uploadUrl:
        //   "https://six-am.maychudev.com/api/email/upload-image",
        // filebrowserUploadUrl:
        //   "https://six-am.maychudev.com/api/email/upload-image",
        // imageUploadUrl: "https://six-am.maychudev.com/api/email/upload-image",
        imageUploadUrl: "https://six-am.maychudev.com/api/email/upload-image",
        easyimage_toolbar: [
          "EasyImageAlignLeft",
          "EasyImageAlignCenter",
          "EasyImageAlignRight",
        ],
      },
      content: "",
      body: "",
      //
      loadingEmail: false,
      listEmail: [],
      detailEmail: {},
      maxCountEmail: 1,
      refScrollLoad: 0,
      searchKeyEmail: "",
      templateFileRemoved: [],
      filesClipboard: [],
    }
  },
  watch: {
    activeTab() {
      this.filesClipboard = []
      if (this.activeTab === 2) {
        const query = {
          search: this.searchKeyEmail,
        }
        this.getListUnsendEmail(query)
      }
    },
    selectedData: {
      deep: true,
      handler() {
        if (this.selectedData && this.selectedData.id) {
          this.getDetailTemplate(this.selectedData.id)
        } else {
          this.detailTemplate = {}
        }
      },
    },
    selectedDataEmail: {
      deep: true,
      handler() {
        if (this.selectedDataEmail && this.selectedDataEmail.id) {
          this.getDetailEmail(this.selectedDataEmail.id)
        }
      },
    },
    detailTemplate: {
      deep: true,
      handler() {
        this.filesClipboard = []
        this.templateFileRemoved = []
        if (this.detailTemplate && this.detailTemplate.id) {
          this.subject = this.detailTemplate.subject
          this.body = this.detailTemplate.body
        } else {
          if (!this.detailTemplate) {
            this.detailTemplate = {}
          }
        }
      },
    },
    searchKeyEmail() {
      if (this.refScrollLoad) {
        clearTimeout(this.refScrollLoad)
      }
      this.refScrollLoad = setTimeout(() => {
        const query = {
          search: this.searchKeyEmail,
          size: this.listEmail.length,
        }
        this.getListUnsendEmail(query)
      }, 700)
    },
    $route: {
      deep: true,
      handler() {
        const query = { ...this.$route.query }
        if (query.tempId) {
          this.activeTab = 1
          const rslt = this.listTemplate.filter((o) => o.id == query.tempId)
          if (rslt && rslt.length) {
            this.setSelectedData(rslt[0])
          }
        }
      },
    },
    listTemplate: {
      deep: true,
      handler() {
        const query = { ...this.$route.query }
        if (query.tempId) {
          const rslt = this.listTemplate.filter((o) => o.id == query.tempId)
          if (rslt && rslt.length) {
            this.setSelectedData(rslt[0])
          }
        }
      },
    },
    listParams: {
      deep: true,
      handler() {
        localStorage.setItem(
          "listParamComputed",
          JSON.stringify(this.listParamComputed),
        )
      },
    },
  },
  methods: {
    setSelectedData(_data) {
      this.selectedData = { ..._data }
    },
    setSelectedDataEmail(_data) {
      this.selectedDataEmail = { ..._data }
    },
    async getDetailTemplate(id, query = {}) {
      if (id === -1) {
        this.detailTemplate = {
          attachments: [],
          body: "",
          subject: "",
          id: -1,
        }
        //  this.subject = ""
        // this.body = ""
        return
      }
      const res = await api.template.getDetailData(id, query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.detailTemplate = res.data.data.template
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
    // CK4

    onEditorReady() {
      const target = document.querySelector("#edtor-wrapper_m")
      if (target) {
        const toolbar = target.querySelector(".ck.ck-toolbar__items")
        console.log(toolbar)
      }
      alert("rd")
    },
    handleInsertCap() {
      if (!this.currentCap) {
        return
      }
      const objResultCap = this.listParamComputed.filter(
        (o) => o.name === this.currentCap,
      )
      if (!objResultCap || !objResultCap.length) {
        return
      }
      const str = `{!${objResultCap[0].name}!}`
      this.content += str
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    returnName(_str) {
      if (!_str) {
        return _str
      }
      const result = tStr.removeAscentNormal(_str)
      const arrResult = result.split(" ")
      // eslint-disable-next-line no-unused-vars
      arrResult.forEach((o) => {
        o = this.capitalizeFirstLetter(o)
      })
      return String(arrResult.join(""))
        .replace(/[^\w\s]/gi, "")
        .replaceAll(" ", "_")
    },
    handleChangeField(e, _val) {
      console.log(_val)
      if (e) {
        const str = `<p class="${this.returnName(_val.caption)}">${
          _val.caption
        }:{!${_val.name}!}</p>`
        this.content += str
      } else {
        const str = `<p>${_val.caption}:{!${_val.name}!}</p>`

        this.content = this.content.replaceAll(str, "")
      }
    },

    onNamespaceLoaded(CKEDITOR) {
      // Add external `placeholder` plugin which will be available for each
      // editor instance on the page.
      this.$store.commit("SET_CURRENT_CK4", CKEDITOR)
      // const listParamComputed = this.listParamComputed;
      CKEDITOR.plugins.add("textindent", {
        icons: "textindent",
        // availableLangs: { vi: 1 },
        // lang: "vi",
        init: function (editor) {
          var indentation = editor.config.indentation
          var indentationKey = editor.config.indentationKey

          if (typeof indentation == "undefined") indentation = "20px"
          if (typeof indentationKey == "undefined") indentationKey = "tab"

          // if (editor.ui.addButton) {
          //   editor.ui.addButton("textindent", {
          //     label: "Ds",
          //     title: "Ds",
          //     icons: "textindent",
          //     command: "ident-paragraph",
          //     toolbar: "paragraph",
          //   });
          // }

          if (indentationKey !== false) {
            editor.on("key", function (ev) {
              if (
                ev.data.domEvent.$.key.toLowerCase() ===
                  indentationKey.toLowerCase().trim() ||
                ev.data.keyCode === indentationKey
              ) {
                editor.execCommand("ident-paragraph")
                ev.cancel()
              }
            })
          }

          editor.on("selectionChange", function () {
            var style_textindente = new CKEDITOR.style({
              element: "p",
              styles: { "text-indent": indentation },
              overrides: [
                {
                  element: "text-indent",
                  attributes: { size: "0" },
                },
              ],
            })

            if (style_textindente.checkActive(editor.elementPath(), editor))
              editor
                .getCommand("ident-paragraph")
                .setState(CKEDITOR.TRISTATE_ON)
            else
              editor
                .getCommand("ident-paragraph")
                .setState(CKEDITOR.TRISTATE_OFF)
          })

          editor.addCommand("ident-paragraph", {
            allowedContent: "p{text-indent}",
            requiredContent: "p",
            // eslint-disable-next-line no-unused-vars
            exec: function (evt) {
              var range = editor.getSelection().getRanges()[0]

              var walker = new CKEDITOR.dom.walker(range),
                node

              var state = editor.getCommand("ident-paragraph").state

              while ((node = walker.next())) {
                if (node.type == CKEDITOR.NODE_ELEMENT) {
                  if (node.getName() === "p") {
                    editor.fire("saveSnapshot")
                    if (state == CKEDITOR.TRISTATE_ON) {
                      node.removeStyle("text-indent")
                      editor
                        .getCommand("ident-paragraph")
                        .setState(CKEDITOR.TRISTATE_OFF)
                    } else {
                      node.setStyle("text-indent", indentation)
                      editor
                        .getCommand("ident-paragraph")
                        .setState(CKEDITOR.TRISTATE_ON)
                    }
                  }
                }
              }

              if (node === null) {
                node = editor
                  .getSelection()
                  .getStartElement()
                  .getAscendant("p", true)

                editor.fire("saveSnapshot")

                if (state == CKEDITOR.TRISTATE_ON) {
                  node.removeStyle("text-indent")
                  editor
                    .getCommand("ident-paragraph")
                    .setState(CKEDITOR.TRISTATE_OFF)
                } else {
                  node.setStyle("text-indent", indentation)
                  editor
                    .getCommand("ident-paragraph")
                    .setState(CKEDITOR.TRISTATE_ON)
                }
              }
            },
          })
        },
      })

      CKEDITOR.plugins.add("timestamp", {
        icons: "timestamp",
        init: function (editor) {
          editor.addCommand("insertTimestamp", {
            exec: function (editor) {
              var now = new Date()
              editor.insertHtml(
                "The current date and time is: <em>" + now.toString() + "</em>",
              )
            },
          })
          // editor.ui.addButton("Timestamp", {
          //  label: "Insert Timestamp",
          //  command: "insertTimestamp",
          //  toolbar: "insert",
          // });
          let config = editor.config
          editor.ui.addRichCombo("my-combo", {
            label: "Danh sách trường",
            title: "Danh sách trường",
            className: "list-params",
            toolbar: "insert",
            panel: {
              css: [CKEDITOR.skin.getPath("editor")].concat(config.contentsCss),
              multiSelect: false,
              attributes: { "aria-label": "Danh sách trường" },
            },

            init: function () {
              const localListParamComputed =
                localStorage.getItem("listParamComputed")
              if (localListParamComputed) {
                const newList = JSON.parse(localListParamComputed)
                this.startGroup("Danh sách các trường")
                // eslint-disable-next-line no-unused-vars
                newList.forEach((o, idx) => {
                  this.add(`{!${o.name}!}`, `${o.caption}`)
                })
              }
            },

            onClick: function (value) {
              editor.focus()
              editor.fire("saveSnapshot")

              editor.insertHtml(value)

              editor.fire("saveSnapshot")
            },
          })
        },
      })
    },

    // Time picker
    formatStringDate(_strDate) {
      if (_strDate) {
        const dateArray = _strDate.split("-")
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
      }
      return ""
    },
    handleClickOutside() {
      if (this.closeOutside) {
        this.onCancel()
      }
    },
    pickedDateAni(_val) {
      if (_val && _val.value && _val.value.startDate) {
        this.startDate = _val.value.startDate
      } else {
        this.startDate = ""
      }
    },
    async onDiscardEmail() {
      this.loadingEmail = true
      const res = await api.email.delete(this.detailEmail.id)
      this.loadingEmail = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Delete email success")
          const query = {
            search: this.searchKeyEmail,
            size: this.listEmail.length,
          }

          this.detailEmail = {}
          this.selectedDataEmail = {}
          this.getListUnsendEmail(query)
          return
        }
        const msg =
          "Failed when Delete email: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when Delete email: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    getBlobFileFromUrl(url) {
      return new Promise((res) => {
        // eslint-disable-next-line no-unused-vars
        let file = fetch(url)
          .then((r) => r.blob())
          .then((blobFile) => {
            console.log(blobFile)
            return new File(
              [blobFile],
              `email-image-${new Date().getTime()}-${blobFile.type.replaceAll(
                "/",
                ".",
              )}`,
              {
                type: blobFile.type,
              },
            )
          })
          .then((f) => {
            res({
              pfName: url,
              file: f,
            })
          })
      })
    },
    submitImg(file) {
      return new Promise((rel, rej) => {
        // eslint-disable-next-line no-unused-vars
        ;(async () => {
          const formData = new FormData()
          formData.append("upload", file.file)
          const res = await api.email.uploadImg(formData)
          if (!res) {
            return null
          }
          try {
            if (res.status > 199 && res.status < 399) {
              rel({
                ...file,
                url: res.data.url,
              })
            } else {
              rej("fail when upload img")
            }
          } catch (error) {
            console.log(error)
            rej("fail when upload img")
          }
        })()
      })
    },
    async sendEmail() {
      this.loadingEmail = true
      try {
        const _this = this
        const div = document.createElement("div")
        div.innerHTML = this.body
        let computedFiles = []
        let submitedFiles = []
        const target = div.querySelectorAll(".easyimage img")
        if (target && target.length) {
          let listImg = []
          target.forEach((o) => {
            const src = o.getAttribute("src")
            if (String(src).includes("blob:")) {
              listImg.push(src)
            }
          })
          const listFilesAfter = listImg.map((o) => this.getBlobFileFromUrl(o))
          computedFiles = await Promise.all(listFilesAfter)
          const submitedFilesAfter = computedFiles.map((o) => this.submitImg(o))
          submitedFiles = await Promise.all(submitedFilesAfter)
          submitedFiles.forEach((o) => {
            _this.body = _this.body.replaceAll(o.pfName, o.url)
            console.log(_this.body, o)
          })
        }
      } catch (error) {
        this.loadingEmail = false
        const msg = "Failed when create email: Upload image fail."
        this.$store.commit("toast/getError", msg)
        console.log(error)
      }
      const start_at_date = this.formatStringDate(this.startDate)
      const start_at_time = this.timeHM
      const formData = new FormData()
      if (this.detailTemplate.id !== -1) {
        formData.append("template_id", this.detailTemplate.id)
      }

      formData.append("subject", this.subject)
      formData.append("body", this.body)
      formData.append("scheduled_at", `${start_at_date} ${start_at_time}`)
      this.segment.forEach((o) => {
        formData.append("segment_ids[]", o.id)
      })
      if (this.templateFileRemoved) {
        this.templateFileRemoved.forEach((o) => {
          formData.append("excluded_template_attachment_ids[]", o)
        })
      }
      this.filesClipboard.forEach((o) => {
        formData.append("attachments[]", o.blob)
      })

      const res = await api.email.create(formData)
      this.loadingEmail = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Send email success")
          this.selectedData = {}
          this.filesClipboard = []
          this.detailTemplate = {}
          this.getListEmail()
          return
        }
        const msg =
          "Failed when send email: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when send email: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
      // this.onConfirm(body)
    },
    onShowPreviewEmail() {
      this.showPreviewEmail = true
    },
    onShowPreviewTemplate() {
      this.showPreviewTemplate = true
    },
    onClosePreview() {
      this.showPreviewEmail = false
      this.showPreviewTemplate = false
    },
    async getListUnsendEmail(query = {}) {
      const res = await api.email.getListData({
        ...query,
        size: query.size && query.size >= 15 ? query.size : 15,
        sent: false,
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
              const query = {
                search: this.searchKeyEmail,
                size: this.listEmail.length + 15,
              }
              this.getListUnsendEmail(query)
            })
          }
        }, 200)
      }
    },
    removeTemplateFile(file) {
      this.templateFileRemoved.push(file.id)
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
    handleRemoveCacheFile(cacheEleId) {
      try {
        document.querySelector(`#${cacheEleId}`).value = null
      } catch (error) {
        console.log(error)
      }
    },
    removeFile(file) {
      this.filesClipboard = this.filesClipboard.filter(
        (o) => o._id !== file._id,
      )
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

    height: 32px;
    &.spec {
      height: 40px;
    }
    /* width: 100%; */
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
    width: calc(100% - 150px);
    color: #000;
    line-height: 19px;
  }
}
.template-name-hl {
  color: #e04038;
  font-weight: 500;
}
.time-title {
  color: #666666;
  font-size: 14px;
}
.each-temp {
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 4px;
  background: #f8f8fa 0% 0% no-repeat padding-box;
  border: 1px solid #cfd4d8;
  margin-bottom: 8px;
  &.active {
    color: #e04038 !important;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 1px solid #e04038;
  }
  &:hover {
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 1px solid #e04038;
  }
}
.list-template__wr {
  padding: 16px;
  height: calc(100% - 150px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.email-sent__side-bar {
  border-right: 1px solid #cfd4d8;
}
.detail-email {
  padding: 12px 32px 22px;
}

.big_title {
  color: #000;
  font-size: 24px;
  margin-bottom: 0;
  font-weight: bold;
}
.detail-row {
  padding: 8px 0;
  &__title {
    letter-spacing: 0px;
    color: #000000;
    font-weight: bold;
    white-space: nowrap;
    width: 150px;
    margin-bottom: 0;
    text-align: left;
  }
  &__info {
    letter-spacing: 0px;
    color: #000000;
    margin-bottom: 0;
  }
}
.each-attachment {
  a {
    display: block;
    width: fit-content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
.each-file-in-attachments {
  padding: 1px 16px;
  margin-right: 6px;
  /* background-color: #f0f0f0; */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0px;
  .file-name {
    display: block;
    line-height: 16px;
    padding-left: 4px;
    width: fit-content;
    max-width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1976d2;
    font-size: 16px;
    text-decoration: underline;
    margin-bottom: 0px;
    margin-left: 0;
    margin-right: 10px;
  }
}
.inner-datepicker-w100 {
  .vue-daterange-picker {
    width: 100% !important;
    height: 36px;
  }
}
.each-email {
  padding: 12px 6px;
  &.active {
    background-color: #f8f8fa;
  }
  &:hover {
    background-color: #f8f8fa;
  }
}
button.btn-tab-ls {
  border-radius: 4px 0 0 4px !important;
}
button.btn-tab-rs {
  border-radius: 0 4px 4px 0px !important;
}
button.btn-tab-active {
  border-color: #e04038 !important;
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
.detail-tab-wr {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.detail-attachments {
}
.atm-dt {
  padding-bottom: 16px;
  border-bottom: 1px dashed #cfd4d8;
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
</style>
