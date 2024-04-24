<template>
  <DefaultLayout>
    <div style="height: calc(100% - 70px)">
      <div class="bread-crumb has-btn">
        <p class="bc-page__title">Events Management</p>
        <v-btn
          depressed
          :color="returnThemeColor()"
          class="btn-normal-text text-white bc-btn"
          @click="openCreatePopup"
        >
          <span class="font-size-20 fw-400 mr-1">+</span> Create Event
        </v-btn>
      </div>
      <div class="events-tab h-100 bg-white">
        <div class="each-info-part h-100">
          <v-row v-show="isNodata" class="each-part pt-1 no-data-part mx-0">
            <v-col cols="12" class="no-data-wr">
              <img src="@/assets/imgs/table-nodata.png" alt="" />
              <p class="no-data-text">No contact data yet</p>
            </v-col>
          </v-row>
          <v-row
            v-show="!isNodata"
            class="each-part pt-0 data-part mt-0 mx-0 h-100"
          >
            <v-col cols="8" class="pt-7 px-6 calendar-col h-100">
              <div style="height: calc(100vh - 260px)">
                <div
                  class="
                    calendar-header-btn-gr
                    d-flex
                    justify-content-between
                    py-1
                  "
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-bind="attrs"
                        v-on="on"
                        src="@/assets/imgs/icons/menu-left-icon.svg"
                        @click="$refs.calendar.prev()"
                        alt="prev_month"
                        height="25px"
                        class="pointer"
                      />
                    </template>
                    <span>Previous month</span>
                  </v-tooltip>
                  <p class="mb-0 current-month-p">{{ currentMonthText }}</p>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <img
                        v-bind="attrs"
                        v-on="on"
                        src="@/assets/imgs/icons/menu-right-icon.svg"
                        @click="$refs.calendar.next()"
                        alt="next_month"
                        height="25px"
                        class="pointer"
                      />
                    </template>
                    <span>Next month</span>
                  </v-tooltip>
                </div>
                <v-calendar
                  :key="keyCalendar"
                  ref="calendar"
                  v-model="value"
                  color="primary"
                  type="month"
                  :events="eventsComputed"
                  :event-color="getEventColor"
                  :event-ripple="false"
                  @change="getEvents"
                  @mousedown:event="startDrag"
                  @mousedown:time="startTime"
                  @mousemove:time="mouseMove"
                  @mouseup:time="endDrag"
                  @mouseleave.native="cancelDrag"
                >
                  <template v-slot:event="{ event, timed }">
                    <!-- <div class="v-event-draggable" v-html="eventSummary()"></div> -->
                    <v-menu
                      transition="slide-x-transition"
                      :offset-x="true"
                      bottom
                      right
                      :nudge-right="10"
                      :close-on-click="true"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          v-bind="attrs"
                          v-on="on"
                          class="v-event-draggable px-2 each-event text-center"
                          @click="eventClick(event)"
                        >
                          {{ event.name }}
                        </div>
                      </template>

                      <v-list>
                        <div class="list-event__wr">
                          <div
                            v-for="(e, idx) in event.eventList"
                            :key="idx"
                            class="each-event-in-list my-2"
                            :class="e.contact ? 'hight-light-event' : ''"
                            @click="setSelectedToView(e)"
                          >
                            {{
                              e.timed
                                ? getTimeString(e.start_at)
                                : "At this day"
                            }}
                            -
                            {{ e.title }}
                          </div>
                        </div>
                      </v-list>
                    </v-menu>

                    <div
                      v-if="timed"
                      class="v-event-drag-bottom"
                      @mousedown.stop="extendBottom(event)"
                    ></div>
                  </template>
                </v-calendar>
              </div>
            </v-col>
            <v-col cols="4" class="pt-7 pl-6 pr-1 h-100 side-event-col">
              <v-tabs-items v-model="tab" class="h-100">
                <v-tab-item class="up-coming-tab h-100 rs-tab">
                  <div class="up-coming-event__wr h-100 rs-tab__wr">
                    <p class="up-coming-title rs-tab__title">Upcoming events</p>
                    <div class="up-coming-list__wr pr-6">
                      <div
                        v-for="groupComing in listUpcomingComputed"
                        :key="groupComing.start"
                        class="up-coming-list mb-4"
                      >
                        <p class="date-computed-d">
                          {{
                            groupComing.start
                              ? getDateString(groupComing.start)
                              : ""
                          }}
                        </p>
                        <div
                          v-for="(e, idx) in groupComing.eventList"
                          :key="e.title + idx"
                          class="each-up-coming-event mb-2"
                          @click="setSelectedToView(e)"
                        >
                          <p class="mb-0">
                            {{ e.start_at ? getTimeString(e.start_at) : "" }} -
                            {{ e.title }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
                <v-tab-item class="up-coming-tab h-100 rs-tab">
                  <div class="up-coming-event__wr h-100 rs-tab__wr">
                    <p
                      class="
                        up-coming-title
                        rs-tab__title
                        d-flex
                        align-items-center
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
                            @click="selectedToView = {}"
                          />
                        </template>
                        <span>Back</span> </v-tooltip
                      >Event detail
                    </p>
                    <div
                      v-if="selectedToView && selectedToView.contact"
                      class="up-coming-list__wr pr-6"
                    >
                      <div v-if="selectedToViewContact.type === 'employee'">
                        <p class="additional-title mb-0 pt-0">
                          Contact Information
                        </p>
                        <div class="detail-row d-flex align-items-center">
                          <p class="detail-row__title">Name</p>
                          <p class="detail-row__info">
                            {{
                              selectedToViewContact.title
                                ? selectedToViewContact.title + ". "
                                : ""
                            }}{{ selectedToViewContact.full_name }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-start">
                          <p class="detail-row__title">Email</p>
                          <p class="detail-row__info">
                            <span
                              v-for="email in selectedToViewContact.emails"
                              :key="email"
                              class="d-block"
                              style="word-break: break-all"
                            >
                              {{ email }}
                            </span>
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-center">
                          <p class="detail-row__title">Position</p>
                          <p class="detail-row__info">
                            {{ selectedToViewContact.position }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-start">
                          <p class="detail-row__title">Phone</p>
                          <p class="detail-row__info">
                            <span
                              v-for="(
                                phone, idx
                              ) in selectedToViewContact.phones"
                              :key="phone.number + idx"
                              class="d-flex align-items-center"
                              style="text-transform: capitalize"
                            >
                              <!-- <img
                                v-if="phone.type === 'skype'"
                                src="@/assets/imgs/icons/skype-icon.svg"
                                alt="skype-icon"
                                class="mr-1"
                              />
                              <img
                                v-else
                                src="@/assets/imgs/icons/whatsapp-icon.svg"
                                alt="whatsapp-icon"
                                class="mr-1"
                              /> -->

                              {{ phone.type ? phone.type + " - " : "" }}
                              {{ phone.number }}
                            </span>
                          </p>
                        </div>
                      </div>
                      <!-- COMPANY -->
                      <div v-if="selectedToViewContact.type === 'company'">
                        <p class="additional-title mb-0 pt-0">
                          Company Information
                        </p>
                        <div class="detail-row d-flex align-items-center">
                          <p class="detail-row__title">Company name</p>
                          <p class="detail-row__info">
                            {{ selectedToViewCompany.name }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-start">
                          <p class="detail-row__title">Country</p>
                          <p class="detail-row__info">
                            {{
                              selectedToViewContact.country_id
                                ? parseFieldFromArray(
                                    countries,
                                    "id",
                                    selectedToViewContact.country_id,
                                  )
                                  ? parseFieldFromArray(
                                      countries,
                                      "id",
                                      selectedToViewContact.country_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-center">
                          <p class="detail-row__title">Industry</p>
                          <p class="detail-row__info">
                            {{
                              selectedToViewCompany.industries
                                ? mergeStringFromField(
                                    selectedToViewCompany.industries,
                                    "short_name",
                                  )
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-start">
                          <p class="detail-row__title">Email</p>
                          <p class="detail-row__info">
                            {{
                              selectedToViewCompany.emails
                                ? mergeStringFromFlatArray(
                                    selectedToViewCompany.emails,
                                  )
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="detail-row d-flex align-items-start">
                          <p class="detail-row__title">Account Owner</p>
                          <p class="detail-row__info">
                            {{ selectedToViewCompany.account_owner }}
                          </p>
                        </div>
                      </div>
                      <!--  -->
                      <p class="additional-title">Additional Information</p>
                      <div class="detail-row d-flex align-items-start">
                        <p class="detail-row__title">Social network</p>
                        <p class="detail-row__info">
                          <a
                            v-if="
                              selectedToViewContact.social_network &&
                              selectedToViewContact.social_network.facebook
                            "
                            :href="
                              selectedToViewContact.social_network.facebook
                            "
                            target="_blank"
                            class="
                              mr-3
                              mb-3
                              external-link__mod
                              d-flex
                              align-items-center
                            "
                            :title="
                              selectedToViewContact.social_network.facebook
                            "
                            ><img
                              src="@/assets/imgs/icons/facebook-icon.svg"
                              alt="facebook-icon"
                              class="mr-2"
                            />
                            {{
                              selectedToViewContact.social_network.facebook
                            }}</a
                          >
                          <a
                            v-if="
                              selectedToViewContact.social_network &&
                              selectedToViewContact.social_network.linked_in
                            "
                            :href="
                              selectedToViewContact.social_network.linked_in
                            "
                            class="external-link__mod d-flex align-items-center"
                            target="_blank"
                            :title="
                              selectedToViewContact.social_network.linked_in
                            "
                            ><img
                              src="@/assets/imgs/icons/linkedin-icon.svg"
                              alt="linkedin-icon"
                              class="mr-2"
                            />
                            {{
                              selectedToViewContact.social_network.linked_in
                            }}</a
                          >
                        </p>
                      </div>
                      <div
                        class="detail-row d-flex align-items-center flex-wrap"
                      >
                        <p class="detail-row__title w-100 mb-2">Anniversary</p>
                        <div class="detail-row__info w-100">
                          <p
                            v-for="ani in selectedToViewContact.anniversaries"
                            :key="ani.title"
                            class="each-ani__paragraph"
                            :class="[
                              checkAniToDay(ani.start_at)
                                ? 'hight-light-event'
                                : '',
                              selectedToView.anniversary &&
                              selectedToView.anniversary.id === ani.id
                                ? 'hight-light-event'
                                : '',
                            ]"
                          >
                            <span class="each-ani__title">{{ ani.title }}</span>
                            <span class="each-ani__date">{{
                              ani.start_at ? parseDateString(ani.start_at) : ""
                            }}</span>
                          </p>
                        </div>
                        <div
                          v-if="selectedToViewContact.note"
                          class="detail-row d-flex align-items-center flex-wrap"
                        >
                          <p class="detail-row__title w-100">Note</p>
                          <div
                            class="detail-row__info w-100"
                            v-html="selectedToViewContact.note"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </div>
      </div>
      <ConfirmNormal
        :content="deleteConfirmContent"
        :is-visible="showDeletePopup"
        :on-cancel="onCancelDelete"
        :on-confirm="onConfirmDelete"
        :on-loading="loadingDelete"
        :close-outside="true"
      />
      <CreateEvent
        :is-visible="showCreatePopup"
        :on-cancel="onCancelCreate"
        :on-confirm="onCreate"
        :on-loading="loadingCreate"
        :close-outside="true"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import api from "@/services"
import { mapState } from "vuex"
import DefaultLayout from "@/layouts/default.vue"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
import CreateEvent from "@/components/Popup/CreateEvent.vue"

//
import dateMixins from "@/mixins/dateMixins.js"
import commonMethods from "@/mixins/commonMethods.js"
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
export default {
  name: "Event",
  props: {
    onCreateNewContact: {
      type: Function,
    },
  },
  components: {
    DefaultLayout,
    ConfirmNormal,
    CreateEvent,
  },
  mixins: [objHandlerMixins, dateMixins, commonMethods],
  created() {},
  mounted() {
    const query = { ...this.$route.query }
    if (query.ai) {
      this.targetAI = +query.ai
    }
    if (query.d) {
      this.preventAutoLoad = true
      this.$nextTick(() => {
        this.preventAutoLoad = false

        this.value = query.d
      })
    }
    this.getListUpcoming()
  },
  beforeDestroy() {},
  data() {
    return {
      isNodata: false,
      paginationPageSize: 15,
      currentPagination: {
        current_page: 1,
        per_page: 15,
        total_pages: 1,
      },
      editData: {},
      showDeletePopup: false,
      loadingDelete: false,
      customSpecialList: ["status"],
      selectedToDelete: {},
      selectedToView: {},
      showEditPopup: false,
      loadingEdit: false,
      selectedToEdit: {},
      monthTextArray: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      // EVENT
      value: "",
      events: [],
      colors: [
        "#2196F3",
        "#3F51B5",
        "#673AB7",
        "#00BCD4",
        "#4CAF50",
        "#FF9800",
        "#757575",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
      startDate: {},
      endDate: {},

      targetAI: 0,
      listUpcoming: [],
      showCreatePopup: false,
      loadingCreate: false,
      keyCalendar: 1,
      tab: 0,
      preventAutoLoad: false,
    }
  },
  watch: {
    selectedToView: {
      deep: true,
      handler() {
        if (this.selectedToView && this.selectedToView.title) {
          this.tab = 1
        } else {
          this.tab = 0
        }
      },
    },
    events: {
      deep: true,
      handler() {
        if (this.targetAI) {
          const rslt = this.events.filter((o) => {
            return o.anniversary && o.anniversary.id == this.targetAI
          })
          if (rslt && rslt.length) {
            this.setSelectedToView(rslt[0])
          }
        }
      },
    },
    targetAI: {
      deep: true,
      handler() {
        if (this.targetAI) {
          const rslt = this.events.filter((o) => {
            return o.anniversary && o.anniversary.id == this.targetAI
          })
          if (rslt && rslt.length) {
            this.setSelectedToView(rslt[0])
          }
        }
      },
    },
    $route: {
      deep: true,
      handler() {
        const query = this.$route.query
        if (query.ai) {
          this.targetAI = +query.ai
        }
        if (query.d) {
          this.preventAutoLoad = true
          this.$nextTick(() => {
            this.preventAutoLoad = false
            this.value = query.d
          })
        }
      },
    },
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
      countries: (state) => state.others.countries,
    }),
    currentMonthText() {
      return `${this.monthTextArray[this.startDate.month - 1]} - ${
        this.startDate.year
      }`
    },
    deleteConfirmContent() {
      return `Delete contact <b>${
        this.selectedToDelete ? this.selectedToDelete.full_name : ""
      }</b> from the list?`
    },
    eventsComputed() {
      const dateArray = [
        ...new Set(this.events.map((o) => String(o.start).slice(0, 10))),
      ]
      const eventsGroup = dateArray.map((o) => {
        const matchEvents = this.events.filter(
          (e) => e.start && e.start.includes(o),
        )
        return {
          eventList: [...matchEvents],
          color: "#1F916A",
          end: undefined,
          name:
            matchEvents.length +
            (matchEvents.length > 1 ? " Events" : " Event"),
          start: `${o} 00:00:00`,
          timed: false,
        }
      })
      return eventsGroup
    },
    listUpcomingComputed() {
      const dateArray = [
        ...new Set(
          this.listUpcoming.map((o) => String(o.start_at).slice(0, 10)),
        ),
      ]
      const eventsGroup = dateArray.map((o) => {
        const matchEvents = this.listUpcoming.filter(
          (e) => e.start_at && e.start_at.includes(o),
        )
        return {
          eventList: [...matchEvents],

          name:
            matchEvents.length +
            (matchEvents.length > 1 ? " events" : " event"),
          start: o,
          timed: false,
        }
      })
      return eventsGroup
    },
    selectedToViewContact() {
      return this.selectedToView.contact || {}
    },
    selectedToViewCompany() {
      return this.selectedToView.contact
        ? this.selectedToView.contact.company || {}
        : {}
    },
  },
  methods: {
    setSelectedToView(data) {
      if (data.contact) {
        this.selectedToView = data
      }
    },
    getTimeString(_str) {
      if (_str) {
        const arrRslt = _str.split(" ")
        return String(arrRslt[1].slice(0, 5))
      }
      return _str
    },
    getDateString(_str) {
      // y-m-d => d, MMM y
      if (_str) {
        const arrRslt = _str.split("-")
        return `${arrRslt[2]}, ${this.monthTextArray[+arrRslt[1] - 1]} ${
          arrRslt[0]
        }`
      }
      return _str
    },
    async onCreate(_val) {
      if (!_val.title || !String(_val.title).trim()) {
        const msg = "Failed when create event: " + "Event title is required"
        this.$store.commit("toast/getError", msg)
        return
      }
      this.loadingCreate = true
      const res = await api.calendar.createEvents(_val)
      this.loadingCreate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Create event success")
          this.keyCalendar += 1
          this.onCancelCreate()
          return
        }
        const msg =
          "Failed when create event: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when create event: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    openCreatePopup() {
      this.showCreatePopup = true
    },
    onCancelCreate() {
      this.showCreatePopup = false
    },
    removeClicked(_val) {
      this.selectedToDelete = { ..._val }
      this.showDeletePopup = true
      // console.log(_val, "removeClicked fired in parent component")
    },
    onCancelDelete() {
      this.selectedToDelete = {}

      this.showDeletePopup = false
    },
    async onConfirmDelete() {
      this.loadingDelete = true
      const res = await api.segment.delete(this.selectedToDelete.id)
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Remove contact success")
          this.onCancelDelete()
          this.filterChangedCallback()
          return
        }
        const msg =
          "Failed when remove contact: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when remove contact: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    async onConfirmEdit(data) {
      this.loadingEdit = true
      const res = await api.segment.update(this.selectedToEdit.id, data)
      this.loadingEdit = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.form = res.data.data.contact
          this.onCancelEdit()
          this.filterChangedCallback()
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

    onCancelEdit() {
      this.selectedToEdit = {}

      this.showEditPopup = false
    },
    closeEdit() {
      this.toggleDialog = false
    },

    async getListData(query = {}) {
      const res = await api.calendar.getListData(query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          console.log(res.data.data.calendar_events)
        }
      } catch (error) {
        console.log(error)
      }
    },

    handleChangePage(_val) {
      this.currentPagination = {
        ...this.currentPagination,
        current_page: _val,
        page: _val,
      }

      this.paginationChagedCallback()
    },
    handleChangePerPage(_val) {
      this.paginationPageSize = _val
      this.currentPagination = {
        ...this.currentPagination,
        per_page: _val,
        current_page: 1,
        page: 1,
      }

      this.paginationChagedCallback()
    },

    parseDataObj(obj) {
      return {
        ...obj,
        // emails_computed: obj.emails.join(", "),
        gender_computed: this.parseGender(obj.gender),
        companies_computed: this.mergeStringFromField(obj.companies, "name"),
        phones_computed:
          obj.phones && obj.phones.length ? obj.phones[0].number : "",
      }
    },
    async getListUpcoming() {
      const res = await api.calendar.getListUpcoming()
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.listUpcoming = [...res.data.data.calendar_events]
        }
      } catch (error) {
        console.log(error)
      }
    },
    // EVENT
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event
        this.dragTime = null
        this.extendOriginal = null
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms)

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start

        this.dragTime = mouse - start
      } else {
        this.createStart = this.roundTime(mouse)
        this.createEvent = {
          name: `Event #${this.events.length}`,
          color: this.rndElement(this.colors),
          start: this.createStart,
          end: this.createStart,
          timed: true,
        }

        this.events.push(this.createEvent)
      }
    },
    extendBottom(event) {
      this.createEvent = event
      this.createStart = event.start
      this.extendOriginal = event.end
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms)

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start
        const end = this.dragEvent.end
        const duration = end - start
        const newStartTime = mouse - this.dragTime
        const newStart = this.roundTime(newStartTime)
        const newEnd = newStart + duration

        this.dragEvent.start = newStart
        this.dragEvent.end = newEnd
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)

        this.createEvent.start = min
        this.createEvent.end = max
      }
    },
    endDrag() {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
      this.extendOriginal = null
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal
        } else {
          const i = this.events.indexOf(this.createEvent)
          if (i !== -1) {
            this.events.splice(i, 1)
          }
        }
      }

      this.createEvent = null
      this.createStart = null
      this.dragTime = null
      this.dragEvent = null
    },
    roundTime(time, down = true) {
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime))
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute,
      ).getTime()
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16)
      const r = (rgb >> 16) & 0xff
      const g = (rgb >> 8) & 0xff
      const b = (rgb >> 0) & 0xff

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color
    },
    async getEvents({ start, end }) {
      // color:"#4CAF50"
      // end:1643510700000
      // name:"Birthday"
      // start:1643505300000
      // timed:true
      if (this.preventAutoLoad) {
        return
      }
      const events = []
      let listEvents = []
      // eslint-disable-next-line no-unused-vars
      const min = new Date(`${start.date}T00:00:00`).getTime()
      // eslint-disable-next-line no-unused-vars
      const max = new Date(`${end.date}T23:59:59`).getTime()
      this.startDate = { ...start }
      this.endDate = { ...end }
      const body = {
        start: start.date,
        end: end.date,
      }
      const res = await api.calendar.getListData(body)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          listEvents = [...res.data.data.calendar_events]
        }
      } catch (error) {
        console.log(error)
      }
      for (let i = 0; i < listEvents.length; i++) {
        const o = listEvents[i]
        events.push({
          ...o,
          timed: o.timed,
          title: o.title,
          start: o.start_at,
          color: "#1F916A",
          end: o.timed ? "" : o.end_at,
        })
      }

      this.events = events
    },
    eventClick(val) {
      console.log(val)
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)]
    },
    checkAniToDay(_date) {
      if (!_date) {
        return false
      }
      const arr = _date.split(" ")[0]
      const arrDrslt = arr.split("-")
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const date = new Date().getDate()
      return (
        year === +arrDrslt[0] &&
        month === +arrDrslt[1] - 1 &&
        date === +arrDrslt[2]
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.events-tab {
  border: 1px solid #cfd4d8;
  padding-bottom: 0;
  .no-data-part {
    height: calc(100% - 20px);
    .no-data-wr {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      padding-top: 50px;
    }
  }
  .each-part {
    padding-bottom: 0;
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
  }
  .btn-add-selected {
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 0;
    letter-spacing: 0px;
    color: #000000;
  }
}
</style>
<style lang="scss">
.btn-add-new-segment {
  letter-spacing: 0px;
  color: #0a71bc;
  line-height: 40px;
  padding: 12px 16px;
  font-weight: 500;
}
.on-dropdown-search {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #f8f8fa;
  input {
    width: 100%;
    padding-left: 12px;
  }
}
.btn-apply {
  background: #f8f8fa 0% 0% no-repeat padding-box;
  padding: 4px 16px;
}
.list-segment {
  height: 200px;
  padding: 14px 16px;
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
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
    }
  }
}
.add-contact-selection {
  white-space: nowrap;
  color: #000;
  font-weight: bold;
  padding: 9px 16px;
  margin: 0 !important;
}
body {
  .v-calendar-weekly__day-label {
    text-align: left;
  }
  .v-calendar-weekly__head-weekday {
    text-align: left;
    font-weight: bold;
    padding: 10px 0;
    /* border-top: 1px solid #cfd4d8; */
    border-bottom: 1px solid #cfd4d8;
    padding-left: 4px;
  }
  .theme--light.v-calendar-weekly,
  .theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday {
    border-color: #cfd4d8;
  }
}
.calendar-header-btn-gr {
  border-top: 1px solid #cfd4d8;
  border-right: 1px solid #cfd4d8;
  border-left: 1px solid #cfd4d8;
  margin-right: -1px;
}
.current-month-p {
  font-weight: bold;
  font-size: 14px;
}
.calendar-col {
  border-right: 1px solid #cfd4d8;
}
.list-event__wr {
  padding: 0px 16px;
  width: 380px;
  /* min-height: 100px; */
  max-height: 600px;
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
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .each-event-in-list {
    background: #ffffff 0% 0% no-repeat padding-box;
    padding: 12px;
    border: 1px solid #cfd4d8;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #cfd4d85f;
    }
    &.over-time,
    &.on-detail {
      border-color: #e04038;
      background-color: #f66b641a;
    }
  }
}
.up-coming-list__wr {
  height: calc(100% - 40px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 20px;
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
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .date-computed-d {
    color: #666666;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .detail-row {
    padding: 8px 0;
    &__title {
      letter-spacing: 0px;
      color: #000000;
      font-weight: bold;
      white-space: nowrap;
      width: 50%;
      word-break: break-word;
      white-space: break-spaces;
      margin-bottom: 0;
    }
    &__info {
      letter-spacing: 0px;
      padding-left: 6px;
      width: 50%;
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
}
.each-up-coming-event {
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 12px;
  border: 1px solid #cfd4d8;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #cfd4d85f;
  }
  &.over-time,
  &.on-detail {
    border-color: #e04038;
    background-color: #f66b641a;
  }
}
.hight-light-event {
  border-color: #e04038 !important;
  background-color: #f66b641a !important;
}
.rs-tab {
  &__title {
    line-height: 20px;
    font-weight: bold;
  }
}
.v-event {
  height: 24px !important;
  width: 90% !important;
  margin: auto !important;
  font-size: 14px !important;
}
.each-event {
  height: 24px !important;
  line-height: 24px !important;
}
</style>
