<template>
  <div class="company-infomation-tab__create h-100">
    <div class="each-info-part">
      <p class="info-part__title no-border-top">Company Infomation</p>
      <v-row class="each-part pt-1">
        <v-col xl="6" lg="6" cols="12">
          <div class="row-info">
            <p class="row-info__label">
              Name<span class="required-star">*</span>
            </p>
            <input
              v-model="form.name"
              @input="convertToUpperCase('name')"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- EMAIL  -->
          <div class="row-info mt-2">
            <p class="row-info__label">
              Email<span class="required-star">*</span>
            </p>
            <div class="row-info__content">
              <div
                v-for="(email, idx) in listEmail"
                :key="idx"
                class="mb-3 d-flex align-items-center"
              >
                <input
                  v-model="email.txt"
                  type="text"
                  class="row-info__content w-100"
                />
                <v-tooltip v-if="listEmail.length > 1" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      src="@/assets/imgs/icons/red-close-icon.svg"
                      alt="remove-icon"
                      class="pointer ml-1"
                      :class="idx === 0 ? 'remove-icon-disabled' : ''"
                      @click="removeEmail(idx)"
                    />
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </div>
              <p class="add-email-btn pointer mb-3" @click="addEmail">
                <img
                  src="@/assets/imgs/icons/blue-add-circle-icon.svg"
                  alt=""
                  class="mr-2"
                />
                Add more Email
              </p>
            </div>
          </div>
          <!-- TYPE -->
          <div class="row-info mt-2">
            <p class="row-info__label">
              Type<span class="required-star">*</span>
            </p>

            <div class="row-info__content">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.type"
                :items="companyTypes"
                :return-object="true"
                item-text="name"
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

          <!-- WEBSITE -->
          <div class="row-info">
            <p class="row-info__label">Website</p>
            <input
              v-model="form.website"
              type="text"
              class="row-info__content"
            />
          </div>
        </v-col>
        <!-- RS -->
        <v-col xl="6" lg="6" cols="12">
          <!--  -->
          <div class="row-info">
            <p class="row-info__label">
              Country<span class="required-star">*</span>
            </p>
            <!-- <p class="row-info__content">
            {{ currentDetail.country ? currentDetail.country.name : "" }}
          </p> -->
            <div class="row-info__content">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.country"
                :items="countries"
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
          <!-- CITY -->
          <div class="row-info">
            <p class="row-info__label">City</p>

            <div class="row-info__content">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                :disabled="
                  !form.country || (form.country && form.country.id !== 233)
                "
                v-model="form.city"
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
            </div>
          </div>
          <!-- INDUSTRY -->
          <div class="row-info">
            <p class="row-info__label">Industry</p>

            <div class="row-info__content">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.industries"
                :items="industries"
                dense
                :multiple="true"
                item-text="name"
                :return-object="true"
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
          <!--  -->
          <div class="row-info">
            <p class="row-info__label">Stage</p>

            <div class="row-info__content">
              <v-autocomplete
                v-if="loadedData"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.stage"
                :items="companyStages"
                :return-object="true"
                item-text="name"
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

          <!-- AO -->
          <div class="row-info">
            <p class="row-info__label">
              Account Owner <span class="required-star">*</span>
            </p>
            <div class="row-info__content">
              <v-autocomplete
                v-if="loadedData"
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.account_owner_id"
                :items="listUser"
                item-value="id"
                item-text="name"
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
      </v-row>
    </div>
    <!-- % -->
    <div class="each-info-part">
      <p class="info-part__title">Billing Information</p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Company Name</p>
          <input
            v-model="billingInfomation.company_name"
            type="text"
            class="row-info__content"
          />
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">
            Tax code<span class="required-star">*</span>
          </p>
          <input
            v-model="billingInfomation.tax_code"
            type="text"
            class="row-info__content"
          />
        </v-col>
        <v-col class="row-info" cols="12">
          <p class="row-info__label">Address</p>
          <input
            v-model="billingInfomation.address"
            type="text"
            class="row-info__content"
          />
        </v-col>
      </v-row>
    </div>
    <!-- % -->
    <div class="each-info-part">
      <p class="info-part__title info-part__title-icon">
        Additional Information
        <!-- <img
          src="@/assets/imgs/icons/bxs-minus-circle-icon.svg"
          class="ml-2"
          alt="bxs-minus-circle-icon"
        /> -->
      </p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Social network:</p>
          <div class="row-info__content">
            <div
              class="
                w-100
                row-info__content
                border-form-block
                d-flex
                align-items-center
                p-1
                mb-2
              "
            >
              <img
                src="@/assets/imgs/icons/facebook-icon.svg"
                class="social__icon"
                alt="facebook-icon"
              />
              <input
                v-model="socialNetwork.facebook"
                type="text"
                class="w-100"
              />
            </div>
            <div
              class="
                w-100
                row-info__content
                border-form-block
                d-flex
                align-items-center
                p-1
              "
            >
              <img
                src="@/assets/imgs/icons/linkedin-icon.svg"
                class="social__icon"
                alt="linkedin-icon"
              />
              <input
                v-model="socialNetwork.linked_in"
                type="text"
                class="w-100"
              />
            </div>
          </div>
        </v-col>
        <v-col xl="6" lg="6" cols="12" class="py-1">
          <div class="row-info mb-3">
            <p class="row-info__label">Tel:</p>
            <div class="row-info__content">
              <vue-tel-input
                v-if="loadedData"
                v-model="form.phone"
                :dropdownOptions="phoneDropdownOptions"
                :mode="'international'"
                v-on:country-changed="countryChanged"
              ></vue-tel-input>
            </div>
          </div>
          <div class="row-info p-tb-12">
            <p class="row-info__label">Anniversary:</p>
            <div class="row-info__content date-open-top">
              <div
                v-for="(ani, idx) in anniversaries"
                :key="idx"
                class="mb-3 d-flex align-items-center"
              >
                <input
                  v-model="ani.title"
                  type="text"
                  class="row-info__content w-100"
                />
                <div class="single-date-wr">
                  <DateRangeTableHeader
                    :singleDatePicker="true"
                    :show-ranges="false"
                    :picked-date="pickedDateAni"
                    :placeholder-picker="'DD/MM/YYYY'"
                    :table-field="`${idx}`"
                    :format-default-date="'dmy'"
                    :opens="'left'"
                    :default-date="
                      ani && ani.start_at
                        ? {
                            startDate: String(ani.start_at).replaceAll(
                              '/',
                              '-',
                            ),
                            endDate: String(ani.start_at).replaceAll('/', '-'),
                          }
                        : {}
                    "
                    :picker-class="'date-picker__form'"
                    :wrapper-class="'date-picker-single-mod'"
                  />
                </div>

                <v-tooltip v-if="anniversaries.length > 1" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      src="@/assets/imgs/icons/red-close-icon.svg"
                      alt="remove-icon"
                      class="pointer ml-1"
                      @click="removeAni(idx)"
                    />
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </div>
              <p class="add-email-btn pointer mb-3" @click="addAni">
                <img
                  src="@/assets/imgs/icons/blue-add-circle-icon.svg"
                  alt=""
                  class="mr-2"
                />
                Add new anniversary
              </p>
            </div>
          </div>
        </v-col>

        <v-col class="row-info" cols="12">
          <p class="row-info__label">Other location:</p>

          <div class="row-info__content">
            <div
              v-for="(location, idx) in otherLocations"
              :key="idx"
              class="mb-3 d-flex align-items-center"
            >
              <div class="row-info__content w-100 d-flex align-items-start">
                <v-autocomplete
                  class="
                    v-autocomplete__nodetails
                    v-autocomplete__noshadow
                    v-autocomplete__borderform
                    v-autocomplete__modappend
                    v-autocomplete__formheight
                  "
                  v-model="location.type"
                  :items="locationTypes"
                  item-value="id"
                  :return-object="false"
                  item-text="name"
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
                <input
                  v-model="location.address"
                  type="text"
                  class="row-info__content w-100 ml-3"
                />
              </div>
              <v-tooltip v-if="otherLocations.length > 1" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    v-bind="attrs"
                    v-on="on"
                    src="@/assets/imgs/icons/red-close-icon.svg"
                    alt="remove-icon"
                    class="pointer ml-1"
                    @click="removeLocation(idx)"
                  />
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
            <p class="add-email-btn pointer mb-3" @click="addLocation">
              <img
                src="@/assets/imgs/icons/blue-add-circle-icon.svg"
                alt=""
                class="mr-2"
              />
              Add more Location
            </p>
          </div>
        </v-col>
        <v-col class="row-info" cols="12">
          <p class="row-info__label">Note</p>

          <div class="row-info__content">
            <textarea
              v-model="form.note"
              rows="3"
              class="row-info__content w-100 mr-1"
              placeholder=""
            >
            </textarea>
          </div>
        </v-col>
        <v-col class="row-info" cols="12">
          <p class="row-info__label">File attachments</p>
          <div class="row-info__content d-flex align-center flex-wrap">
            <label
              for="companyAttachment"
              class="pointer label-browse-file"
              @click="handleRemoveCacheFile('companyAttachment')"
              >Browse</label
            >
            <input
              type="file"
              id="companyAttachment"
              class="d-none"
              multiple
              @change="handleChangeFile"
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
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="action-gr-btn d-flex align-items-center update-gr-btn">
      <v-btn
        depressed
        color="#A7A7A700"
        class="
          btn-normal-text btn-actions-tabs
          bc-btn
          btn-font-weight-regular btn-font-color-66
          mr-3
          ml-auto
        "
        :disabled="loadingUpdate"
        @click="backGeneralInfo"
      >
        Cancel
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
        "
        :disabled="loadingUpdate"
        :loading="loadingUpdate"
        @click="createDetail"
      >
        Save & Close
      </v-btn>
    </div>
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import api from "@/services"
import dateMixins from "@/mixins/dateMixins.js"
import DateRangeTableHeader from "@/components/Shared/DateRangeTableHeader.vue"
import { mapState } from "vuex"
export default {
  name: "CompanyGeneralInfoCreate",
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
    backGeneralInfo: {
      type: Function,
    },
  },
  components: { DateRangeTableHeader },
  data() {
    return {
      form: {},
      billingInfomation: {},
      socialNetwork: { facebook: "", linked_in: "" },
      otherLocations: [],
      anniversaries: [],
      listEmail: [],
      filesClipboard: [],
      values: "",
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
    }
  },
  mixins: [objHandlerMixins, dateMixins],
  computed: {
    ...mapState({
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      companyTypes: (state) => state.others.companyTypes,
      companyStages: (state) => state.others.companyStages,
      locationTypes: (state) => state.others.locationTypes,
      listUser: (state) => state.others.listUser,
    }),
    attachmentsComputed() {
      const arr = this.currentDetail.attachments
        ? [...this.currentDetail.attachments]
        : []
      return arr.filter((o) => !this.listRemovedFile.includes(o.id)) || []
    },
  },
  watch: {
    currentDetail: {
      deep: true,
      handler() {
        this.parseData()
      },
    },
  },
  mounted() {
    this.parseData()
  },
  methods: {
    convertToUpperCase(fieldName) {
      this.form[fieldName] = this.form[fieldName].toUpperCase()
    },
    async parseData() {
      const getUserInfo = await api.user.getUserInfo()
      const userInfo = getUserInfo.data.data.user
      this.form = { ...this.currentDetail }
      this.form.stage = this.companyStages[0]
      this.form.account_owner_id = this.listUser.find(
        (x) => x.id === userInfo.id,
      )
      this.phoneNumber = this.currentDetail.phone
      this.listEmail = this.currentDetail.emails
        ? this.currentDetail.emails.map((o) => ({ txt: o }))
        : [{ txt: "" }]
      this.anniversaries = this.currentDetail.anniversaries
        ? this.currentDetail.anniversaries.slice()
        : [{ start_at: null, title: "" }]
      this.otherLocations =
        this.currentDetail && this.currentDetail.other_locations
          ? this.currentDetail.other_locations
          : [{ type: "", address: "" }]
      this.billingInfomation =
        this.currentDetail && this.currentDetail.billing_information
          ? this.currentDetail.billing_information
          : {}

      this.socialNetwork =
        this.currentDetail && this.currentDetail.social_network
          ? this.currentDetail.social_network
          : { facebook: "", linked_in: "" }
      this.$nextTick(() => {
        if (this.companyStages.length < 1 && this.listUser.length < 1) {
          this.parseData()
        } else {
          this.loadedData = true
        }
      })
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
    async createDetail() {
      this.loadingUpdate = true
      // const formData = new FormData()
      // REQUIRED FIELD
      const billing_information = {
        ...this.billingInfomation,
      }
      const anniversaries = this.anniversaries.map((o) => ({
        title: o.title,
        start_at: o.start_at,
      }))
      const social_network = { ...this.socialNetwork }
      const other_locations = [...this.otherLocations]

      // eslint-disable-next-line no-unused-vars
      const body = {
        billing_information,
        anniversaries,
        social_network,
        other_locations,
        // other_locations
      }
      const formData = new FormData()
      formData.append("name", this.form.name || "")
      formData.append("website", this.form.website || "")
      formData.append("note", this.form.note || "")
      formData.append("phone", String(this.form.phone).replaceAll(" ", ""))
      if (typeof this.form.account_owner_id != "object") {
        formData.append("account_owner_id", this.form.account_owner_id || "")
      } else {
        formData.append("account_owner_id", this.form.account_owner_id.id || "")
      }
      formData.append(
        "billing_information[company_name]",
        this.billingInfomation.company_name || "",
      )
      formData.append(
        "billing_information[tax_code]",
        this.billingInfomation.tax_code || "",
      )
      formData.append(
        "billing_information[address]",
        this.billingInfomation.address || "",
      )
      formData.append(
        "social_network[facebook]",
        this.socialNetwork.facebook ? this.socialNetwork.facebook : "",
      )
      formData.append(
        "social_network[linked_in]",
        this.socialNetwork.linked_in ? this.socialNetwork.linked_in : "",
      )
      if (this.form.country) {
        formData.append("country_id", this.form.country.id)
      }
      if (this.form.city && this.form.country && this.form.country.id === 233) {
        formData.append("city_id", this.form.city.id)
      }
      if (this.form.type) {
        formData.append("type_id", this.form.type.id)
      }
      if (this.form.stage) {
        formData.append("stage_id", this.form.stage.id)
      }
      if (this.form.industries) {
        this.form.industries.forEach((o) => {
          formData.append("industry_ids[]", o.id)
        })
      }
      this.listEmail.forEach((o) => {
        formData.append("emails[]", o.txt)
      })
      this.otherLocations.forEach((o, i) => {
        formData.append(`other_locations[${i}][type]`, o.type)
        formData.append(`other_locations[${i}][address]`, o.address)
      })
      this.anniversaries.forEach((o, i) => {
        formData.append(`anniversaries[${i}][title]`, o.title || "")
        formData.append(`anniversaries[${i}][start_at]`, o.start_at || "")
      })
      this.filesClipboard.forEach((o) =>
        formData.append("attachments[]", o.blob),
      )
      let res
      if (
        this.billingInfomation.tax_code == "" ||
        this.billingInfomation.tax_code == undefined ||
        this.billingInfomation.tax_code == null
      ) {
        this.$store.commit(
          "toast/getError",
          "Failed when create company: The tax code field is required",
        )
      } else {
        res = await api.company.create(formData)
      }
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Create company success")
          // this.updateCurrentData(res.data.data.company)
          this.backGeneralInfo()
          this.$router.push(`/companies/${res.data.data.company.id}?tab=0`)
          return
        }
        const msg =
          "Failed when create company: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when create company: " + error.message ||
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
  },
}
</script>

<style lang="scss" scoped>
.company-infomation-tab__create {
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
      min-width: 150px;
      white-space: nowrap;
      color: #000;
      font-weight: bold;
      line-height: 19px;
    }
    &__content {
      margin-bottom: 0;
      width: calc(100% - 155px);
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
