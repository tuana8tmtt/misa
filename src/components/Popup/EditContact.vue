<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="dialog"
      width="640"
      @click:outside="handleClickOutside"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="popup-edit-contact__card">
        <div class="popup-edit-contact__content">
          <div class="popup-edit-contact__inner-msg">
            <div class="detail-info read-only py-2">
              <div class="detail-row d-flex align-items-center">
                <p class="detail-row__title">
                  Name<span class="required-star">*</span>
                </p>
                <div class="row-info__content d-flex align-items-center">
                  <input
                    v-model="form.first_name"
                    type="text"
                    class="row-info__content mr-1"
                    placeholder="First name"
                    @input="capitalizeEachWord('first_name')"
                  />
                  <input
                    v-model="form.last_name"
                    type="text"
                    class="row-info__content ml-1"
                    placeholder="Last name"
                    @input="capitalizeEachWord('last_name')"
                  />
                </div>
              </div>
              <div class="row-info">
                <p class="detail-row__title">Gender</p>
                <div class="row-info__content d-flex align-items-center">
                  <v-radio-group
                    v-model="form.title"
                    row
                    class="mt-0 vuetify-no-msg"
                  >
                    <v-radio
                      v-for="n in [
                        { name: 'Mr', id: 'Mr' },
                        { name: 'Ms', id: 'Ms' },
                        { name: 'Mrs', id: 'Mrs' },
                      ]"
                      :key="n.id"
                      :label="n.name"
                      :value="n.id"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
              <div class="row-info">
                <p class="detail-row__title">
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

              <div class="row-info">
                <p class="detail-row__title">Position</p>
                <input
                  v-model="form.position"
                  type="text"
                  class="detail-row__info row-info__content"
                />
              </div>
              <div class="row-info mt-1">
                <p class="detail-row__title">Phone</p>

                <div class="row-info__content">
                  <div
                    v-for="(phone, idx) in phoneList"
                    :key="idx"
                    class="mb-3 d-flex align-items-center"
                  >
                    <div
                      class="row-info__content w-100 d-flex align-items-start"
                    >
                      <v-autocomplete
                        class="
                          v-autocomplete__nodetails
                          v-autocomplete__noshadow
                          v-autocomplete__borderform
                          v-autocomplete__modappend
                          v-autocomplete__formheight
                        "
                        v-model="phone.type"
                        :items="phoneTypes"
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

                      <div class="row-info__content w-100 ml-3">
                        <vue-tel-input
                          v-model="phone.number"
                          :dropdownOptions="phoneDropdownOptions"
                          :mode="'international'"
                          v-on:country-changed="countryChanged"
                        ></vue-tel-input>
                      </div>
                    </div>
                    <v-tooltip v-if="phoneList.length >= 1" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <img
                          v-bind="attrs"
                          v-on="on"
                          src="@/assets/imgs/icons/red-close-icon.svg"
                          alt="remove-icon"
                          class="pointer ml-1"
                          @click="removePhone(idx)"
                        />
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </div>
                  <p class="add-email-btn pointer mb-3" @click="addPhoneSocial">
                    <img
                      src="@/assets/imgs/icons/blue-add-circle-icon.svg"
                      alt=""
                      class="mr-2"
                    />
                    Add more phone
                  </p>
                </div>
              </div>
              <p class="additional-title my-0 py-2">Additional Information</p>
              <div class="detail-row d-flex align-items-center flex-wrap mb-2">
                <p class="detail-row__title">Social network</p>
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
              </div>
              <div class="detail-row d-flex align-items-start">
                <p class="detail-row__title mb-2">Anniversary</p>
                <div class="row-info__content p-tb-12">
                  <div class="row-info__content date-open-top w-100">
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
                                  endDate: String(ani.start_at).replaceAll(
                                    '/',
                                    '-',
                                  ),
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
              </div>
              <div class="detail-row d-flex align-items-center flex-wrap">
                <div class="row-info p-tb-12 w-100">
                  <p class="detail-row__title">Note</p>
                  <div class="row-info__content">
                    <textarea
                      v-model="form.note"
                      rows="3"
                      class="row-info__content w-100 mr-1"
                      placeholder=""
                    >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <v-card-actions>
          <v-btn
            class="
              cfp-btn cfp-btn__cancel
              btn-normal-text btn-font-weight-regular
            "
            color="#CFD4D8"
            @click="onCancel"
            :disabled="onLoading"
          >
            {{ buttonCancelText }}
          </v-btn>
          <v-btn
            class="
              cfp-btn cfp-btn__approve
              btn-normal-text btn-font-weight-regular
            "
            :color="returnThemeColorBtnSC()"
            :loading="onLoading"
            @click="submit"
          >
            {{ buttonConfirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex"
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import api from "@/services"
import DateRangeTableHeader from "@/components/Shared/DateRangeTableHeader.vue"

export default {
  mixins: [objHandlerMixins, dateMixins, commonMethods],
  props: {
    selectedData: {
      type: Object,
      default() {},
    },
    closeOutside: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    onLoading: {
      type: Boolean,
      default: false,
    },
    buttonConfirmText: {
      type: String,
      default: "Save",
    },
    buttonCancelText: {
      type: String,
      default: "No",
    },
    onCancel: {
      type: Function,
    },
    onConfirm: {
      type: Function,
    },
  },
  components: { DateRangeTableHeader },
  computed: {
    ...mapState({
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      companyTypes: (state) => state.others.companyTypes,
      companyStages: (state) => state.others.companyStages,
      locationTypes: (state) => state.others.locationTypes,
    }),
  },
  data() {
    return {
      dialog: false,
      detailData: {},
      form: {},
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
      ],
      anniversaries: [{ start_at: null, title: "" }],
      phoneDropdownOptions: {
        showDialCodeInSelection: true,
        showSearchBox: true,
        showFlags: true,
        showDialCodeInList: true,
      },
      listEmail: [{ txt: "" }],
      socialNetwork: {},
      otherLocations: [],
      phoneList: [],
    }
  },
  mounted() {
    this.dialog = this.isVisible
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
      this.resetData()
    },
    selectedData: {
      deep: true,
      handler() {
        if (this.selectedData && this.selectedData.id) {
          this.getDetailData()
        }
      },
    },
    detailData: {
      deep: true,
      handler() {
        if (this.detailData && this.detailData.id) {
          this.form = { ...this.detailData }
          this.phoneNumber = this.detailData.phone
          this.listEmail = this.detailData.emails
            ? this.detailData.emails.map((o) => ({ txt: o }))
            : [{ txt: "" }]

          this.phoneList = this.detailData.phones
            ? this.detailData.phones.slice()
            : [{ type: "", number: "" }]
          this.anniversaries = this.detailData.anniversaries
            ? this.detailData.anniversaries.slice()
            : [{ start_at: null, title: "" }]
          this.otherLocations =
            this.detailData && this.detailData.other_locations
              ? this.detailData.other_locations
              : [{ type: "", address: "" }]
          this.billingInfomation =
            this.detailData && this.detailData.billing_information
              ? this.detailData.billing_information
              : {}

          this.socialNetwork =
            this.detailData && this.detailData.social_network
              ? this.detailData.social_network
              : {}
        }
      },
    },
  },
  methods: {
    capitalizeEachWord(fieldName) {
      const words = this.form[fieldName].split(" ")
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1),
      )
      this.form[fieldName] = capitalizedWords.join(" ")
    },
    resetData() {
      this.form = {}
      this.anniversaries = [{ start_at: null, title: "" }]
      this.listEmail = [{ txt: "" }]
      this.socialNetwork = {}
      this.otherLocations = []
      this.phoneList = []
    },
    async getDetailData() {
      const res = await api.contact.getDetailData(this.selectedData.id, {})
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.detailData = res.data.data.contact

          return
        }
        const msg =
          "Failed when get contact detail: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")

        this.$store.commit("toast/getError", msg)
      } catch (error) {
        console.log(error)
      }
    },
    handleClickOutside() {
      if (this.closeOutside) {
        this.onCancel()
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
    removePhone(idx) {
      this.phoneList.splice(idx, 1)
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
    submit() {
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
        title: this.form.title,
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
      this.onConfirm(body)
    },
  },
}
</script>
<style lang="scss">
.popup-edit-contact {
  &__title {
    color: #000 !important;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    padding: 14px 0;
  }
  &__content {
    padding: 24px 24px 0;
    color: #000;
    max-height: calc(90vh - 100px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
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
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.35);
      }
    }
  }
  &__inner-msg {
    text-align: center;
  }
  &__card {
    border-radius: 8px !important;
    overflow: hidden;
    .v-card__actions {
      padding: 0 !important;
      margin-top: 18px;
      border: none !important;
    }
    .cfp-btn {
      margin: 0 !important;
      width: 50% !important;
      height: 50px !important;
      &__cancel {
        border-radius: 0px 0px 0px 8px !important;
      }
      &__approve {
        color: #fff !important;
        border-radius: 0px 0px 8px 0px !important;
      }
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
    margin-bottom: 0;
    width: calc(100% - 155px);
    /* width: 100%; */
    color: #000;
    line-height: 19px;
  }
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
.detail-row {
  padding: 8px 0;
  &__title {
    letter-spacing: 0px;
    color: #000000;
    font-weight: bold;
    white-space: nowrap;
    width: 120px;
    margin-bottom: 0;
    text-align: left;
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
.add-email-btn {
  color: #0a71bc;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  align-items: center;
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
</style>
