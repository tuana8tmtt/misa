<template>
  <v-row data-app class="email-tab email-tab__send h-100 m-0">
    <v-col cols="3" class="email-sent__side-bar px-0">
      <p class="big_title pl-4 mb-3">List template</p>
      <div class="row-info px-4 search-full-with-icon">
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
      <div class="row-info px-4">
        <div class="row-info__content w-50 ml-0 mt-2">
          <v-autocomplete
            class="
              v-autocomplete__nodetails
              v-autocomplete__noshadow
              v-autocomplete__borderform
              v-autocomplete__modappend
              v-autocomplete__formheight
              v-autocomplete__template-status
            "
            v-model="statusPicked"
            :items="statusList"
            item-text="name"
            :return-object="true"
            :placeholder="'Status'"
            :color="`#e04038`"
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
            <template v-slot:item="{ item, on, attrs }">
              <p
                class="mb-0 template-status font-weight-regular"
                :class="item.id === 1 ? 'dlt' : ''"
                :style="item.id === 1 ? 'color:#e04038' : 'color: #1f916a'"
                v-bind="attrs"
                v-on="on"
              >
                {{ item.name }}
              </p>
            </template>
            <template v-slot:selection="{ item, on, attrs }">
              <p
                class="mb-0 selected-status"
                :class="item.id === 1 ? 'dlt' : ''"
                v-bind="attrs"
                v-on="on"
              >
                {{ item.name }}
              </p>
            </template>
          </v-autocomplete>
        </div>
      </div>

      <div class="list-template__wr scrollbar-y">
        <div
          v-if="statusPicked && statusPicked.id === 0"
          class="each-temp btn-add-new bg-white"
          style="background: #fff !important"
          @click="onCreateNewTemp"
        >
          <p class="temp-name text-center mb-0 font-weight-regular">
            + Add new template
          </p>
        </div>
        <div
          v-for="temp in listTemplateComputed"
          :key="temp.id"
          class="each-temp"
          :class="selectedData && selectedData.id === temp.id ? 'active' : ''"
          @click="setSelectedData(temp)"
        >
          <p class="temp-name text-center mb-0 font-weight-regular">
            {{ temp.name }}
          </p>
        </div>
        <p
          v-if="!listTemplateComputed || !listTemplateComputed.length"
          class="temp-name text-center mb-0"
        >
          No template found
        </p>
      </div>
    </v-col>
    <v-col cols="9" class="template-rs">
      <div class="d-flex align-items-center justify-content-between">
        <p
          v-if="isCreate || isEdit || isViewDetail"
          class="big_title pl-4 mb-0"
        >
          {{ rsNameComputed }}
        </p>
        <div
          v-if="isViewDetail"
          class="action-gr-btn d-flex align-items-center"
        >
          <v-btn
            v-if="selectedData && !selectedData.deleted_at"
            depressed
            color="#A7A7A700"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              mr-3
            "
            @click="onEditTemp"
          >
            <img
              src="@/assets/imgs/icons/edit-gray-icon.svg"
              alt="edit-gray-icon"
              class="mr-1"
            />
            Edit
          </v-btn>
          <v-btn
            v-if="selectedData && !selectedData.deleted_at"
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
      <div v-if="!isViewDetail && (isCreate || isEdit)" class="detail-email">
        <div class="detail-row d-flex align-items-center">
          <p class="detail-row__title">Name:</p>
          <input
            v-model="name"
            type="text"
            class="row-info__content"
            placeholder="Name"
          />
        </div>
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
          <p class="detail-row__title"></p>
          <div class="row-info__content">
            <v-autocomplete
              class="
                v-autocomplete__nodetails
                v-autocomplete__noshadow
                v-autocomplete__borderform
                v-autocomplete__modappend
                v-autocomplete__formheight
              "
              v-model="onPickField"
              :items="listParamComputed"
              item-text="name"
              :return-object="true"
              :placeholder="'Fields'"
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
              readonly
              ref="myck4"
              id="myck4"
              v-model="body"
              :config="editorConfig"
              @namespaceloaded="onNamespaceLoaded"
            ></ckeditor>
          </div>
        </div>

        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Attachments:</p>
          <div class="row-info__content mr-0">
            <!-- FOR CREATE -->
            <label
              v-if="isCreate"
              for="templateAttachment"
              class="pointer label-browse-file"
              @click="handleRemoveCacheFile('templateAttachment')"
              >Browse</label
            >
            <input
              v-if="isCreate"
              type="file"
              id="templateAttachment"
              class="d-none"
              multiple
              @change="handleChangeFile"
            />
            <!-- FOR UPDATE -->
            <label
              v-if="isEdit"
              for="utempAttachment"
              class="pointer label-browse-file"
              @click="handleRemoveCacheFile('utempAttachment')"
              >Browse
              <v-progress-circular
                v-if="onUploadFileEdit"
                :size="20"
                :width="3"
                indeterminate
                color="#403d3d"
              ></v-progress-circular
            ></label>
            <input
              v-if="isEdit"
              type="file"
              id="utempAttachment"
              class="d-none"
              multiple
              @change="handleUpSingleFile"
            />
            <div
              v-for="file in filesClipboard"
              :key="file.id"
              class="each-file-in-attachments"
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
            <div
              v-for="file in attachmentsComputed"
              :key="file.id"
              class="each-file-in-attachments"
            >
              <p
                target="_blank"
                class="row-info__content file-name text-no-wrap"
              >
                <a :href="file.url" target="_blank" :download="file.url">
                  {{ file.original_name }}
                </a>
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
                    @click="removeFileAttachment(file)"
                  />
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <v-btn
            v-if="!isViewDetail && isCreate"
            depressed
            :color="returnThemeColorBtnSC()"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              text-white
              v-btn__textwhite
              d-block
              ml-auto
              px-5
              mt-3
            "
            :loading="loadingTemplate"
            @click="createTemplate"
          >
            Save
          </v-btn>
          <v-btn
            v-if="!isViewDetail && isEdit"
            depressed
            :color="returnThemeColorBtnSC()"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              text-white
              v-btn__textwhite
              d-block
              ml-auto
              px-5
              mt-3
            "
            :loading="loadingTemplate"
            @click="updateTemplate"
          >
            Update
          </v-btn>
        </div>
      </div>
      <div v-if="isViewDetail" class="detail-email">
        <div class="detail-row d-flex align-items-center">
          <p class="detail-row__title">Name:</p>
          <input
            readonly
            v-model="name"
            type="text"
            class="row-info__content"
            placeholder="Name"
          />
        </div>
        <div class="detail-row d-flex align-items-center">
          <p class="detail-row__title">Subject:</p>
          <input
            readonly
            v-model="subject"
            type="text"
            class="row-info__content"
            placeholder="Subject"
          />
        </div>

        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Body:</p>
          <div class="row-info__content mr-0 ck--editor__readonly">
            <ckeditor
              readonly
              ref="myck4"
              id="myck4"
              v-model="body"
              :config="editorConfig"
              @namespaceloaded="onNamespaceLoaded"
            ></ckeditor>
          </div>
        </div>

        <div class="detail-row d-flex align-items-start">
          <p class="detail-row__title">Attachments:</p>
          <div class="row-info__content mr-0">
            <div
              v-for="file in attachmentsComputed"
              :key="file.id"
              class="each-file-in-attachments"
            >
              <p
                target="_blank"
                class="row-info__content file-name text-no-wrap"
              >
                <a :href="file.url" target="_blank" :download="file.url">
                  {{ file.original_name }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <v-btn
            v-if="selectedData && !selectedData.deleted_at"
            depressed
            :color="returnThemeColorBtnSC()"
            class="
              btn-normal-text btn-actions-tabs
              bc-btn
              btn-font-weight-regular btn-font-color-66
              text-white
              v-btn__textwhite
              d-block
              ml-auto
              px-5
              mt-3
            "
            @click="onUseTemplate"
          >
            Use this template
          </v-btn>
        </div>
      </div>
    </v-col>

    <!-- % -->
    <ConfirmNormal
      :content="deleteConfirmContent"
      :is-visible="showDeletePopup"
      :on-cancel="onCancelDelete"
      :on-confirm="onConfirmDelete"
      :on-loading="loadingDelete"
      :close-outside="true"
    />
  </v-row>
</template>

<script>
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
import api from "@/services"
import { mapState } from "vuex"
import { tStr } from "validation_t/src"
export default {
  components: { ConfirmNormal },
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
      type: Object,
      default() {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    getListTemplate: {
      type: Function,
      default() {},
    },
  },
  mounted() {
    localStorage.setItem(
      "listParamComputed",
      JSON.stringify(this.listParamComputed),
    )
  },

  mixins: [dateMixins, commonMethods],
  data() {
    return {
      showPreviewEmail: false,
      isCreate: false,
      isEdit: false,
      isViewDetail: false,
      segment: [],
      searchKey: "",
      selectedData: {},
      subject: "",
      detailTemplate: {},
      timeHM: "",
      startDate: "",
      name: "",
      filesClipboard: [],
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
        removePlugins: "iframe,image",
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
          // "image",
          // "uploadimage",
        ],
        indentation: "20px",
        indentationKey: "tab",
        image2_alignClasses: [
          "image-align-left",
          "image-align-center",
          "image-align-right",
        ],
        image2_disableResizer: false,
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

        //
      },
      content: "",
      body: "",
      //
      loadingTemplate: false,
      statusList: [
        {
          name: "Active",
          id: 0,
        },
        {
          name: "Deleted",
          id: 1,
        },
      ],
      statusPicked: {
        name: "Active",
        id: 0,
      },
      loadingDelete: false,
      showDeletePopup: false,
      onUploadFileEdit: false,
      refSearch: 0,
      onPickField: {},
    }
  },
  watch: {
    isActive() {
      if (this.isActive) {
        const query = {
          deleted: !!this.statusPicked.id,
        }
        this.detailTemplate = {}
        this.selectedData = {}
        this.name = ""
        this.subject = ""
        this.body = ""
        this.filesClipboard = []
        this.isEdit = false
        this.isViewDetail = false
        this.isCreate = false
        this.getListTemplate(query)
      }
    },
    statusPicked: {
      deep: true,
      handler() {
        const query = {
          deleted: !!this.statusPicked.id,
        }
        this.detailTemplate = {}
        this.selectedData = {}
        this.name = ""
        this.subject = ""
        this.body = ""
        this.filesClipboard = []
        this.isEdit = false
        this.isViewDetail = false
        this.isCreate = false
        this.getListTemplate(query)
      },
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
    detailTemplate: {
      deep: true,
      handler() {
        if (this.detailTemplate && this.detailTemplate.id) {
          this.subject = this.detailTemplate.subject
          this.body = this.detailTemplate.body
          this.name = this.detailTemplate.name
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
    onPickField: {
      deep: true,
      handler() {
        if (this.onPickField && this.onPickField.name) {
          this.subject += `{!${this.onPickField.name}!}`
          this.onPickField = {}
        }
      },
    },
  },
  computed: {
    rsNameComputed() {
      if (this.isViewDetail) {
        if (this.detailTemplate && this.detailTemplate.id) {
          return this.detailTemplate.name
        }
        return "Detail template"
      } else {
        return this.isCreate ? "New template" : "Edit template"
      }
    },
    deleteConfirmContent() {
      return `Do you want to delete this template <b>${
        this.selectedData.name ? this.selectedData.name : ""
      }</b>?`
    },
    ...mapState({
      segments: (state) => state.others.segments,
    }),
    attachmentsComputed() {
      if (this.detailTemplate && this.detailTemplate.id) {
        return this.detailTemplate.attachments
      } else {
        return []
      }
    },
    listTemplateComputed() {
      return this.listTemplate.filter((o) => {
        try {
          const oVal = tStr.removeAscent(o.name).replaceAll(" ", "")
          const kVal = tStr.removeAscent(this.searchKey).replaceAll(" ", "")
          return oVal.includes(kVal)
        } catch (error) {
          return false
        }
      })
    },
    previewEmailDetail() {
      if (this.detailTemplate && this.detailTemplate.id) {
        return {
          body: this.body,
          segments: this.segment,
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
  methods: {
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
    setSelectedData(_data) {
      this.isCreate = false
      // this.isEdit = true
      this.isViewDetail = true
      this.filesClipboard = []
      this.selectedData = { ..._data }
    },
    async getDetailTemplate(id, query = {}) {
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
    handleRemoveCacheFile(cacheEleId) {
      try {
        document.querySelector(`#${cacheEleId}`).value = null
      } catch (error) {
        console.log(error)
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
    async createTemplate() {
      this.loadingTemplate = true
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
        this.loadingTemplate = false
        const msg = "Failed when create template: Upload image fail."
        this.$store.commit("toast/getError", msg)
        console.log(error)
      }
      const formData = new FormData()
      formData.append("name", this.name)
      formData.append("subject", this.subject)
      formData.append("body", this.body)
      this.filesClipboard.forEach((o) => {
        formData.append("attachments[]", o.blob)
      })

      const res = await api.template.create(formData)
      this.loadingTemplate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Create template success")
          this.getListTemplate()
          return
        }
        const msg =
          "Failed when create template: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when create template: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
      // this.onConfirm(body)
    },
    async updateTemplate() {
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
        this.loadingTemplate = false
        const msg = "Failed when create template: Upload image fail."
        this.$store.commit("toast/getError", msg)
        console.log(error)
      }
      const body = {
        name: this.name,
        subject: this.subject,
        body: this.body,
      }
      this.loadingTemplate = true
      const res = await api.template.update(this.detailTemplate.id, body)
      this.loadingTemplate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          this.isViewDetail = true
          this.isEdit = false
          this.isCreate = false
          this.getListTemplate()
          return
        }
        const msg =
          "Failed when update template: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when update template: " + error.message ||
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
    onClosePreview() {
      this.showPreviewEmail = false
    },
    removeFile(file) {
      this.filesClipboard = this.filesClipboard.filter(
        (o) => o._id !== file._id,
      )
    },
    async removeFileAttachment(file) {
      const body = {
        attachment_id: file.id,
      }

      this.onUploadFileEdit = true
      const res = await api.template.removeAttachment(
        this.detailTemplate.id,
        body,
      )

      this.onUploadFileEdit = false
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.updateCurrentData(res.data.data.company)
          this.getDetailTemplate(this.selectedData.id)
          return
        }
        const msg =
          "Failed when remove file: " +
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
    onCreateNewTemp() {
      if (this.isCreate) {
        return
      }
      this.detailTemplate = {}
      this.selectedData = {}
      this.name = ""
      this.subject = ""
      this.body = ""
      this.filesClipboard = []
      this.isEdit = false
      this.isViewDetail = false
      this.isCreate = true
    },
    async onConfirmDelete() {
      this.loadingDelete = true
      const res = await api.template.delete(this.selectedData.id)
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Remove template success")
          this.detailTemplate = {}
          this.selectedData = {}
          this.name = ""
          this.subject = ""
          this.body = ""
          this.filesClipboard = []
          this.isEdit = false
          this.getListTemplate()
          this.onCancelDelete()
          return
        }
        const msg =
          "Failed when remove template: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when remove template: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    async handleUpSingleFile(event) {
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
      const formData = new FormData()
      attachments.forEach((f) => {
        formData.append("attachments[]", f.blob)
      })
      this.onUploadFileEdit = true
      const res = await api.template.addAttachment(
        this.selectedData.id,
        formData,
      )
      this.onUploadFileEdit = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")

          this.getDetailTemplate(this.selectedData.id)
          return
        }
        const msg =
          "Failed when add file: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when add file: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    onEditTemp() {
      this.isViewDetail = false
      this.isEdit = true
      this.isCreate = false
    },
    openCfDelete() {
      this.showDeletePopup = true
    },
    onCancelDelete() {
      this.showDeletePopup = false
    },
    onUseTemplate() {
      this.$router.replace({
        query: {
          eTab: "tab-2",
          tempId: this.detailTemplate.id,
        },
      })
    },
    onAppendToSubject(val) {
      console.log(val)
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
  &:hover:not(.btn-add-new) {
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 1px solid #e04038;
  }
}
.list-template__wr {
  padding: 16px;
  height: calc(100% - 160px);
  overflow-x: hidden;
  overflow-y: scroll;
}

.email-sent__side-bar {
  height: 100%;
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
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.inner-datepicker-w100 {
  .vue-daterange-picker {
    width: 100% !important;
    height: 36px;
  }
}
.template-rs {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    opacity: 1.1;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.344);
    }
  }
  .each-file-in-attachments {
    padding: 4px 12px;
    margin-right: 6px;
    /* background-color: #f0f0f0; */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0px;
    .file-name {
      display: block;

      width: fit-content;
      max-width: calc(100% - 30px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #0a71bc;
      margin-bottom: 0px;
      margin-left: 0;
      margin-right: 10px;
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

<style lang="scss">
.v-list-item--active {
  .template-status {
    color: #1f916a !important;
    &.dlt {
      color: #e04038 !important;
    }
  }
}
.selected-status {
  color: #1f916a !important;
  font-weight: 500;
  &.dlt {
    color: #e04038 !important;
  }
}
.v-list-item--active.v-list-item--highlighted {
  background-color: #fff;
  &::before {
    background-color: #fff;
  }
}
</style>
