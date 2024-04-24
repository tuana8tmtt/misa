<template>
  <div class="company-opportunity-tab__create h-100">
    <div class="each-info-part">
      <p
        class="
          info-part__title
          no-border-top
          d-flex
          align-items-center
          has-back-btn
        "
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <img
              v-bind="attrs"
              v-on="on"
              src="@/assets/imgs/icons/arrow-left-icon.svg"
              alt="back-icon"
              class="pointer mr-2"
              @click="backAction"
            />
          </template>
          <span>Back</span> </v-tooltip
        >Add new opportunity
      </p>
      <v-row class="each-part pt-1">
        <v-col xl="6" lg="6" cols="12">
          <div class="row-info">
            <p class="row-info__label">
              Product<span class="required-star">*</span>
            </p>
            <div class="row-info__content d-flex align-items-center">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  mr-1
                "
                v-model="selectedProduct"
                :items="products"
                item-text="name"
                item-value="id"
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
        </v-col>
        <!-- RS -->
        <v-col xl="6" lg="6" cols="12">
          <!-- AO -->
          <!-- <div class="row-info">
            <p class="row-info__label">
              Opportunity Owner <span class="required-star">*</span>
            </p>
            <input v-model="owner" type="text" class="row-info__content" />
          </div> -->

          <!--  -->

          <!-- ORIGINAL BLOCK -->
        </v-col>
        <v-col
          v-if="selectedProduct && originalObj.isShow"
          xl="6"
          lg="6"
          cols="12"
          :key="selectedProduct"
        >
          <div class="row-info original-block">
            <p class="row-info__label" style="white-space: break-spaces">
              {{ originalObj.text
              }}<span v-if="originalObj.required" class="required-star">*</span>
            </p>
            <!-- <p class="row-info__content">
            {{ currentDetail.country ? currentDetail.country.name : "" }}
          </p> -->
            <div class="row-info__content d-flex align-items-center">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  mr-1
                "
                v-model="originalProd.country"
                :items="countriesComputed"
                item-text="name"
                :return-object="true"
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
              <v-autocomplete
                v-if="selectedProduct && ![1, 3, 9].includes(selectedProduct)"
                :key="originalProd.city"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                :disabled="
                  !originalProd.country ||
                  (originalProd.country && originalProd.country.id != 233)
                "
                v-model="originalProd.city"
                :items="cities"
                item-text="name"
                :return-object="true"
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

              <!-- PORT -->
              <v-autocomplete
                v-if="selectedProduct && [3].includes(selectedProduct)"
                :key="originalProd.city"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                v-model="originalProd.city"
                item-value="id"
                :items="portOriginComputed"
                item-text="name"
                :return-object="true"
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
              <!-- AIRPORT -->
              <v-autocomplete
                v-if="selectedProduct && [1].includes(selectedProduct)"
                :key="originalProd.city"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                v-model="originalProd.city"
                item-value="id"
                :items="airportOriginComputed"
                item-text="name"
                :return-object="true"
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
        </v-col>
        <!-- DESTINATION BLOCK -->
        <v-col
          v-if="selectedProduct && destinationObj.isShow"
          xl="6"
          lg="6"
          cols="12"
        >
          <div class="row-info destination-block">
            <p class="row-info__label">
              {{ destinationObj.text
              }}<span v-if="destinationObj.required" class="required-star"
                >*</span
              >
            </p>
            <!-- <p class="row-info__content">
            {{ currentDetail.country ? currentDetail.country.name : "" }}
          </p> -->
            <div class="row-info__content d-flex align-items-center">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  mr-1
                "
                v-model="destinationProd.country"
                :items="countriesComputed"
                item-text="name"
                :return-object="true"
                dense
                label=""
                solo
                @change="changeDestination"
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
              <v-autocomplete
                v-if="selectedProduct && ![1, 3, 9].includes(selectedProduct)"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                :disabled="
                  !destinationProd.country ||
                  (destinationProd.country && destinationProd.country.id != 233)
                "
                v-model="destinationProd.city"
                :items="cities"
                item-text="name"
                :return-object="true"
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

              <!-- PORT -->
              <v-autocomplete
                v-if="selectedProduct && [3].includes(selectedProduct)"
                :key="destinationProd.city"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                v-model="destinationProd.city"
                :items="portDestinationComputed"
                item-value="id"
                item-text="name"
                :return-object="true"
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
              <!-- AIR PORT -->
              <v-autocomplete
                v-if="selectedProduct && [1].includes(selectedProduct)"
                :key="destinationProd.city"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                  ml-1
                "
                v-model="destinationProd.city"
                item-value="id"
                :items="airportDestinationComputed"
                item-text="name"
                :return-object="true"
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
        </v-col>
        <v-col cols="12">
          <!-- AO -->
          <div class="row-info">
            <p class="row-info__label">
              Detail <span class="required-star">*</span>
            </p>

            <div class="row-info__content">
              <textarea
                v-model="editorData"
                name=""
                id=""
                rows="4"
                class="row-info__content"
              ></textarea>
              <!-- <ckeditor
                ref="myck4"
                id="myck4"
                v-model="editorData"
                :config="editorConfig"
                @namespaceloaded="onNamespaceLoaded"
              ></ckeditor> -->
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="action-gr-btn d-flex align-items-center update-gr-btn">
      <v-btn
        depressed
        :color="returnThemeColorBtnSC()"
        class="
          btn-normal-text btn-actions-tabs
          bc-btn
          btn-font-weight-regular btn-font-color-66
          text-white
          v-btn__textwhite
          ml-auto
        "
        :disabled="loadingUpdate"
        :loading="loadingUpdate"
        @click="createOpportunity"
      >
        Save & Close
      </v-btn>
    </div>
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import { tStr } from "validation_t/src"
import api from "@/services"
import dateMixins from "@/mixins/dateMixins.js"
import { mapState } from "vuex"
export default {
  name: "CompanyOpportunitiesCreate",
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
  data() {
    return {
      form: {},
      billingInfomation: {},
      socialNetwork: {},
      otherLocations: [],
      productList: [],
      owner: "",
      selectedProduct: {},
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
      ],
      anniversaries: [{ start_at: null, title: "" }],
      listEmail: [{ txt: "" }],
      filesClipboard: [],
      values: "",
      defaultCountry: "",
      phoneCountry: null,
      destinationProd: {},
      originalProd: {},
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
      listParam: {
        ApprovalName: "Tiêu đề",
        CreatorAsglId: "Người đề xuất - Mã nhân viên",
        CreatorDepartment: "Người đề xuất - Phòng ban",
        CreatorName: "Người đề xuất - Tên",
        CreatorPosition: "Người đề xuất - Chức vụ",
        TestVanBanDai: "test văn bản dài",
      },
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
        ],
        indentation: "20px",
        indentationKey: "tab",
      },
      content: "",
    }
  },
  mixins: [objHandlerMixins, dateMixins],
  components: {
    // "ckeditor-nuxt": () => {
    //   return import("@blowstack/ckeditor-nuxt")
    // },
  },
  computed: {
    ...mapState({
      products: (state) => state.others.products,
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      companyTypes: (state) => state.others.companyTypes,
      companyStages: (state) => state.others.companyStages,
      locationTypes: (state) => state.others.locationTypes,
      airport: (state) => state.others.airport,
      port: (state) => state.others.port,
      currentCK4: (state) => state.currentCK4,
    }),
    attachmentsComputed() {
      const arr = this.currentDetail.attachments
        ? [...this.currentDetail.attachments]
        : []
      return arr.filter((o) => !this.listRemovedFile.includes(o.id)) || []
    },
    listParamComputed() {
      if (!this.listParam) {
        return []
      }
      const listCaption = Object.values(this.listParam)
      const listName = Object.keys(this.listParam)
      const arr = listCaption.map((o, idx) => {
        return {
          caption: o,
          name: listName[idx],
        }
      })
      return arr
    },
    countriesComputed() {
      if (
        this.selectedProduct &&
        [4, 5, 6, 7, 8].includes(this.selectedProduct)
      ) {
        return this.countries.filter((o) => o.id === 233)
      }
      if (this.selectedProduct && this.selectedProduct === 9) {
        return this.countries.filter((o) => o.id && o.southeast_asia)
      }
      return this.countries
    },
    portOriginComputed() {
      if (!this.originalProd || !this.originalProd.country) {
        return []
      }
      return this.port.filter(
        (o) => o.id && o.country_id == this.originalProd.country.id,
      )
    },
    airportOriginComputed() {
      if (!this.originalProd || !this.originalProd.country) {
        return []
      }
      return this.airport.filter(
        (o) => o.id && o.country_id == this.originalProd.country.id,
      )
    },
    portDestinationComputed() {
      if (!this.destinationProd || !this.destinationProd.country) {
        return []
      }
      return this.port.filter(
        (o) => o.id && o.country_id == this.destinationProd.country.id,
      )
    },
    airportDestinationComputed() {
      if (!this.destinationProd || !this.destinationProd.country) {
        return []
      }
      return this.airport.filter(
        (o) => o.id && o.country_id == this.destinationProd.country.id,
      )
    },
    originalObj() {
      switch (+this.selectedProduct) {
        case 1:
          // AIR
          return {
            text: "Origin Airport",
            isShow: true,
            required: true,
          }
        case 2:
          // RAIL
          return {
            text: "Origin Station",
            isShow: true,
            required: true,
          }
        case 3:
          // OCEAN
          return {
            text: "Port of Loading",
            isShow: true,
            required: true,
          }
        case 4:
          // WATERWAY

          return {
            text: "Origin Terminal",
            isShow: true,
            required: true,
          }
        case 5:
          // ROAD
          return {
            text: "Origin Terminal",
            isShow: true,
            required: true,
          }
        case 6:
          // CUSTOMS BROKERAGE
          return {
            text: " ",
            isShow: false,
            required: false,
          }
        case 7:
          // WAREHOUSING
          return {
            text: " ",
            isShow: false,
            required: false,
          }
        case 8:
          // PACKAGING
          return {
            text: " ",
            isShow: false,
            required: false,
          }
        case 9:
          // CROSSBORDER TRUCKING
          return {
            text: "Original Country",
            isShow: true,
            required: true,
          }
        default:
          return {
            text: "",
            isShow: false,
            required: false,
          }
      }
    },
    destinationObj() {
      switch (+this.selectedProduct) {
        case 1:
          // AIR
          return {
            text: "Destination Airport",
            isShow: true,
            required: true,
          }
        case 2:
          // RAIL
          return {
            text: "Destination Station",
            isShow: true,
            required: true,
          }
        case 3:
          // OCEAN
          return {
            text: "Port of Discharge",
            isShow: true,
            required: true,
          }
        case 4:
          // WATERWAY

          return {
            text: "Destination Terminal",
            isShow: true,
            required: true,
          }
        case 5:
          // ROAD
          return {
            text: "Destination Terminal",
            isShow: true,
            required: true,
          }
        case 6:
          // CUSTOMS BROKERAGE
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 7:
          // WAREHOUSING
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 8:
          // PACKAGING
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 9:
          // CROSSBORDER TRUCKING
          return {
            text: "Destination Country",
            isShow: true,
            required: true,
          }
        default:
          return {
            text: "",
            isShow: false,
            required: false,
          }
      }
    },
  },
  watch: {
    currentDetail: {
      deep: true,
      handler() {
        // this.parseData()
      },
    },
    selectedProduct: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.destinationProd = {}
          this.originalProd = {}
        })
      },
    },
  },
  mounted() {
    // this.parseData()
  },
  methods: {
    changeDestination() {
      this.destinationProd.city = null
    },
    addEmail() {
      this.listEmail.push({ txt: "" })
    },
    addLocation() {
      this.otherLocations.push({ type: "", address: "" })
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
    onParseData(data) {
      const obj = { ...data }
      if (obj.product_id === 1) {
        obj.origin = {
          country_id: data.origin.country_id,
          airport_id: data.origin.airport_id,
        }
        obj.destination = {
          country_id: data.destination.country_id,
          airport_id: data.destination.airport_id,
        }
      } else if (obj.product_id === 3) {
        obj.origin = {
          country_id: data.origin.country_id,
          port_id: data.origin.port_id,
        }
        obj.destination = {
          country_id: data.destination.country_id,
          port_id: data.destination.port_id,
        }
      } else {
        obj.origin = {
          country_id: data.origin.country_id,
          city_id: data.origin.city_id,
        }
        obj.destination = {
          country_id: data.destination.country_id,
          city_id: data.destination.city_id,
        }
      }

      return obj
    },
    async createOpportunity() {
      this.loadingUpdate = true
      // const formData = new FormData()
      // REQUIRED FIELD

      // eslint-disable-next-line no-unused-vars

      // prod
      // AIR => origin{ airport}
      // OCEAN => origin{ port}
      // RAIL => origin{ city}
      // REST => origin{ city}

      // - fixed country
      // WATERWAY, ROAD, CB, WAREHOUSING, PACKAGING => COUNTRY = VN

      // - no origin
      // CB, WAREHOUSING, PACKAGING

      const body = {
        product_id: this.selectedProduct ? this.selectedProduct : null,
        // owner: this.owner,
        detail: this.editorData,
        origin: {
          country_id: this.originalProd.country
            ? this.originalProd.country.id
            : null,
          city_id: this.originalProd.city ? this.originalProd.city.id : null,
          port_id: this.originalProd.city ? this.originalProd.city.id : null,
          airport_id: this.originalProd.city ? this.originalProd.city.id : null,
        },
        destination: {
          country_id: this.destinationProd.country
            ? this.destinationProd.country.id
            : null,
          city_id: this.destinationProd.city
            ? this.destinationProd.city.id
            : null,
          port_id: this.destinationProd.city
            ? this.destinationProd.city.id
            : null,
          airport_id: this.destinationProd.city
            ? this.destinationProd.city.id
            : null,
        },
      }
      const param = this.onParseData(body)

      const res = await api.opportunity.create(this.currentId, param)
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Create opportunity success")
          // this.updateCurrentData(res.data.data.company)
          this.backAction()
          return
        }
        const msg =
          "Failed when create opportunity: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when create opportunity: " + error.message ||
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
  },
}
</script>

<style lang="scss" scoped>
.company-opportunity-tab__create {
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
    padding-left: 80px;
    padding-right: 80px;
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
      width: 190px;
      white-space: nowrap;
      color: #000;
      font-weight: bold;
      line-height: 19px;
    }
    &__content {
      margin-bottom: 0;
      width: calc(100% - 195px);
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
</style>
