<template>
  <div class="company-contact-tab__detail h-100">
    <div class="each-info-part">
      <div
        class="
          info-part__title
          no-border-top
          has-back-btn
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <p class="mb-0 d-flex align-items-center">
          <v-tooltip v-if="showBackBtn" bottom>
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
          >Contact Detail
        </p>
        <div class="contact-group-action">
          <v-menu left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="#fff"
                class="
                  btn-normal-text
                  text-white
                  bc-btn
                  btn-actions-tabs btn-no-min-width
                  px-2
                "
                v-bind="attrs"
                v-on="on"
              >
                <img src="@/assets/imgs/icons/dots-horizontal.svg" alt="" />
              </v-btn>
            </template>
            <div class="bg-white py-3">
              <p class="add-contact-selection pointer" @click="onEdit">Edit</p>
              <p
                class="add-contact-selection pointer"
                style="color: #e04038"
                @click="openCfDelete"
              >
                Delete
              </p>
            </div>
          </v-menu>
        </div>
      </div>
      <v-row class="each-part pt-3 my-0 pr-2">
        <v-col xl="7" lg="7" cols="12" class="pt-0">
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
              <div class="w-max-content d-flex align-items-center">
                <img
                  v-if="item.properties && item.properties.email"
                  class="pointer mr-2"
                  src="@/assets/imgs/icons/email-noround-icon.svg"
                  :alt="item.id"
                  @click="navigateTo('/emails')"
                />
                <img
                  v-if="item.properties && item.properties.segment"
                  class="pointer mr-2"
                  src="@/assets/imgs/icons/chart-arc-icon.svg"
                  :alt="item.id"
                  @click="navigateTo(`/segments/${item.properties.segment.id}`)"
                />
              </div> </template
          ></v-data-table>
        </v-col>
        <v-col xl="5" lg="5" cols="12" class="pt-0">
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
            <p class="row-info__label">General Information</p>
            <v-btn
              v-if="isEdit"
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
              @click="editContact"
            >
              Save
            </v-btn>
          </div>

          <div v-if="!isEdit" class="detail-info read-only py-2">
            <table class="detail-info__table">
              <tbody>
                <tr>
                  <td style="width: 150px">
                    <p class="detail-row__title">Name</p>
                  </td>
                  <td>
                    <p class="detail-row__info">
                      {{ form.title ? form.title + ". " : ""
                      }}{{ form.full_name }}
                    </p>
                  </td>
                </tr>
                <tr style="width: 150px">
                  <td><p class="detail-row__title">Email</p></td>
                  <td>
                    <p class="detail-row__info">
                      <span
                        v-for="email in form.emails"
                        :key="email"
                        class="d-block"
                      >
                        {{ email }}
                      </span>
                    </p>
                  </td>
                </tr>
                <tr style="width: 150px">
                  <td><p class="detail-row__title">Country</p></td>
                  <td>
                    <p class="detail-row__info">
                      {{
                        form.country && form.country.name
                          ? form.country.name
                          : ""
                      }}
                    </p>
                  </td>
                </tr>
                <tr style="width: 150px">
                  <td><p class="detail-row__title">Position</p></td>
                  <td>
                    <p class="detail-row__info">{{ form.position }}</p>
                  </td>
                </tr>
                <tr style="width: 150px">
                  <td><p class="detail-row__title">Phone</p></td>
                  <td>
                    <p class="detail-row__info">
                      <span
                        v-for="(phone, idx) in removeNullistItem(
                          form.phones,
                          'number',
                        )"
                        :key="phone.number + idx"
                        class="d-flex align-items-center mb-1"
                        style="text-transform: capitalize"
                      >
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img
                              v-bind="attrs"
                              v-on="on"
                              :src="getPhoneTypeIcon(phone.type)"
                              alt=""
                              class="general-phone-info-icon"
                            />
                          </template>
                          <span style="text-transform: capitalize">{{
                            phone.type
                          }}</span>
                        </v-tooltip>
                        <!-- {{ phone.type ? " - " : "" }} -->
                        {{ phone.number }}
                      </span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <p class="additional-title">Additional Information</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 150px">
                    <p class="detail-row__title">Social network</p>
                  </td>
                  <td>
                    <p class="detail-row__info">
                      <a
                        v-if="
                          form.social_network && form.social_network.facebook
                        "
                        :href="form.social_network.facebook"
                        target="_blank"
                        class="
                          mr-3
                          mb-2
                          external-link__mod
                          d-flex
                          align-items-center
                        "
                        :title="form.social_network.facebook"
                        ><img
                          src="@/assets/imgs/icons/facebook-icon.svg"
                          alt="facebook-icon"
                          class="mr-2"
                        />
                        {{ form.social_network.facebook }}</a
                      >
                      <a
                        v-if="
                          form.social_network && form.social_network.linked_in
                        "
                        :href="form.social_network.linked_in"
                        target="_blank"
                        class="external-link__mod d-flex align-items-center"
                        :title="form.social_network.linked_in"
                        ><img
                          src="@/assets/imgs/icons/linkedin-icon.svg"
                          alt="linkedin-icon"
                          class="mr-2"
                        />{{ form.social_network.linked_in }}</a
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 150px">
                    <p class="detail-row__title w-100 mb-0">Anniversary</p>
                  </td>

                  <td>
                    <div class="detail-row__info w-100">
                      <p
                        v-for="ani in form.anniversaries"
                        :key="ani.title"
                        class="each-ani__paragraph"
                      >
                        <span class="each-ani__title">{{ ani.title }}</span>
                        <span class="each-ani__date">{{
                          ani.start_at ? parseDateString(ani.start_at) : ""
                        }}</span>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 150px">
                    <p class="detail-row__title w-100 mb-0">Attachments</p>
                  </td>

                  <td>
                    <div class="detail-row__info w-100">
                      <div
                        v-for="file in attachmentsComputed"
                        :key="file.id"
                        class="each-ani__paragraph mb-2"
                      >
                        <p
                          target="_blank"
                          class="row-info__content file-name text-no-wrap mb-0"
                        >
                          <a
                            :href="file.url"
                            target="_blank"
                            :download="file.url"
                            class="text-limit-w d-block w-100"
                          >
                            {{ file.original_name }}
                          </a>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 150px">
                    <p class="detail-row__title w-100">Note</p>
                  </td>
                  <td>
                    <pre
                      style="font-family: 'Roboto', 'san-serif' !important"
                      class="detail-row__info w-100"
                      v-html="form.note"
                    ></pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ON EDIT -->
          <div v-if="isEdit" class="detail-info read-only py-2">
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
                  <div class="row-info__content w-100 d-flex align-items-start">
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
            <div class="detail-row d-flex align-items-center flex-wrap">
              <p class="detail-row__title w-100 mb-2">Anniversary</p>
              <div class="row-info p-tb-12 w-100">
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
                <div class="row-info__content w-100">
                  <textarea
                    v-model="form.note"
                    rows="3"
                    class="row-info__content mr-1"
                    placeholder=""
                  >
                  </textarea>
                </div>
              </div>
            </div>
            <div class="detail-row d-flex align-start">
              <div class="row-info p-tb-12 w-100">
                <p class="detail-row__title">Attachments</p>
                <div class="row-info__content w-100">
                  <div
                    v-for="file in attachmentsComputed"
                    :key="file.id"
                    class="each-file-in-attachments"
                  >
                    <a
                      :href="file.url"
                      :n="file.url"
                      target="_blank"
                      class="row-info__content file-name text-no-wrap"
                      >{{ file.original_name }}.{{ file.extension }}</a
                    >
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
                    for="contactAttachment"
                    class="pointer label-browse-file"
                    @click="handleRemoveCacheFile('contactAttachment')"
                    :style="loadingUpdate ? 'pointer-events: none;' : ''"
                  >
                    {{ loadingUpdate ? "" : "Browse" }}
                    <v-progress-circular
                      v-if="loadingUpdate"
                      :size="20"
                      :width="3"
                      indeterminate
                      color="#403d3d"
                    ></v-progress-circular
                  ></label>
                  <input
                    type="file"
                    id="contactAttachment"
                    class="d-none"
                    multiple
                    @change="handleChangeFile"
                  />
                </div>
              </div>
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
import parseDataContacts from "@/mixins/parseDataContacts.js"
import commonMethods from "@/mixins/commonMethods.js"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
import DateRangeTableHeader from "@/components/Shared/DateRangeTableHeader.vue"

// import DateRangeTableHeader from "@/components/Shared/DateRangeTableHeader.vue"
import { mapState } from "vuex"
export default {
  name: "CompanyContactDetail",
  components: { ConfirmNormal, DateRangeTableHeader },
  props: {
    currentDetail: {
      type: Object,
    },
    showBackBtn: {
      type: Boolean,
      default: true,
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
          text: "Events",
          align: "start",
          value: "properties.message",
        },
        { text: "Events type", value: "description" },
        { text: "Events timestamp", value: "created_at" },
        { text: "Action", value: "actions" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
    }
  },

  mixins: [
    objHandlerMixins,
    dateMixins,
    commonMethods,
    routeMixins,
    parseDataContacts,
  ],
  computed: {
    ...mapState({
      countries: (state) => state.others.countries,
      cities: (state) => state.others.cities,
      industries: (state) => state.others.industries,
      companyTypes: (state) => state.others.companyTypes,
      companyStages: (state) => state.others.companyStages,
      locationTypes: (state) => state.others.locationTypes,
    }),
    attachmentsComputed() {
      const arr = this.form.attachments ? [...this.form.attachments] : []
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
    id() {
      if (this.id) {
        this.getDetailData()
        this.getDetailDataLogs()
      }
    },
  },
  mounted() {
    const query = this.$route.query
    if (query.contactId) {
      this.id = query.contactId
    }
  },
  methods: {
    capitalizeEachWord(fieldName) {
      const words = this.form[fieldName].split(" ")
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1),
      )
      this.form[fieldName] = capitalizedWords.join(" ")
    },
    async getDetailData() {
      const res = await api.contact.getDetailData(this.id, {})
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.form = res.data.data.contact

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
    async getDetailDataLogs() {
      const res = await api.contact.getListLog(this.id, {})
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.desserts = [...res.data.data.logs]

          return
        }
        const msg =
          "Failed when get contact logs: " +
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
    async removeFile(file) {
      const body = {
        attachment_id: file.id,
      }

      const res = await api.contact.removeAttachment(this.currentId, body)
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.updateCurrentData(res.data.data.contact)
          this.form = res.data.data.contact
          this.listRemovedFile.push(file.id)
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
      const formData = new FormData()
      attachments.forEach((f) => {
        formData.append("attachments[]", f.blob)
      })
      this.loadingUpdate = true
      const res = await api.contact.addAttachment(this.form.id, formData)
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.updateCurrentData(res.data.data.contact)
          this.form = res.data.data.contact
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
  width: calc(100% - 120px);
  .file-name {
    display: block;

    width: fit-content;
    max-width: 100%;
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
    min-width: 120px;
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
.detail-info__table {
  table-layout: fixed;
  width: 100%;
  /* tr {
    padding-bottom: 4px;
  } */
  td {
    vertical-align: baseline;
    padding-bottom: 4px;
  }
}
</style>
