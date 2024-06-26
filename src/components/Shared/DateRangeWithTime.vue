<template>
  <DateRangePicker
    ref="picker"
    v-model="dateRange"
    :opens="opens"
    :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
    :single-date-picker="singleDatePicker"
    :time-picker="timePicker"
    :time-picker24-hour="timePicker24Hour"
    :show-weeknumbers="showWeekNumbers"
    :show-dropdowns="showDropdowns"
    :auto-apply="autoApply"
    :control-container-class="wrapperClass"
    :linked-calendars="linkedCalendars"
    :ranges="showRanges && settingsRanges"
    @update="updateValues"
    @toggle="checkOpen"
  >
    <template v-slot:input="picker" style="min-width: 350px">
      <div
        class="
          date-range-slot-wrapper-tb
          d-star-noflex
          justify-content-between
          otbb
          w-100
        "
        :class="pickerClass"
        v-if="picker.startDate && picker.endDate"
      >
        <div class="d-flex align-items-center">
          <span class="fw-500 text-center font-size-15">
            {{
              picker.startDate
                ? getDateObject(picker.startDate)
                : "Ngày bắt đầu"
            }}
          </span>
          <p v-if="!singleDatePicker" class="pl-2 my-0 mb-0 mr-1 font-size-15">
            tới
          </p>
          <span
            v-if="!singleDatePicker"
            class="fw-500 text-center font-size-15"
          >
            {{
              picker.endDate ? getDateObject(picker.endDate) : "Ngày kết thúc"
            }}
          </span>
        </div>
        <!-- <v-icon class="pointer font-size-16" @click="handleClearDate">
          mdi-close
        </v-icon>
      -->
        <div class="calendar-icon">
          <img
            src="@/assets/imgs/icons/calendar-star-icon.svg"
            alt="back-icon"
            height="17px"
            class="pointer calendar-star-icon"
          />
        </div>
      </div>
      <div
        v-if="!(picker.startDate && picker.endDate)"
        class="pointer date-range-slot-wrapper-tb"
        :class="picker.startDate && picker.endDate ? 'hvll' : ''"
      >
        <span
          class="
            w-100
            pointer
            d-flex
            align-items-center
            justify-content-between
            font-size-15
          "
          style="color: #a7a7a7"
        >
          <img
            v-if="iconPrepend"
            src="@/assets/imgs/icons/calendar-star-icon.svg"
            alt="back-icon"
            height="17px"
            class="pointer mr-1 calendar-star-icon"
          />
          {{ placeholderPicker }}

          <div v-if="!iconPrepend" class="calendar-icon">
            <img
              src="@/assets/imgs/icons/calendar-star-icon.svg"
              alt="back-icon"
              height="17px"
              class="pointer calendar-star-icon"
            />
          </div>
        </span>
      </div>
    </template>
  </DateRangePicker>
</template>

<script>
import { tDate } from "validation_t/src"
import DateRangePicker from "vue2-daterange-picker"
// import { convertDateToStr } from "@/utils/dateHelper"
import "vue2-daterange-picker/dist/vue2-daterange-picker.css"
export default {
  props: {
    singleDatePicker: {
      type: Boolean,
      default: false,
    },
    timePicker: {
      type: Boolean,
      default: false,
    },
    timePicker24Hour: {
      type: Boolean,
      default: true,
    },
    showWeekNumbers: {
      type: Boolean,
      default: false,
    },
    showDropdowns: {
      type: Boolean,
      default: true,
    },
    linkedCalendars: {
      type: Boolean,
      default: true,
    },
    autoApply: {
      type: Boolean,
      default: true,
    },
    showRanges: {
      type: Boolean,
      default: false,
    },
    pickedDate: {
      type: Function,
    },
    onFilterAdvance: {
      type: Boolean,
      default: true,
    },
    iconPrepend: {
      type: Boolean,
      default: false,
    },
    placeholderPicker: {
      type: String,
      default: "Date Range Picker",
    },
    pickerClass: {
      type: String,
      default: "",
    },
    wrapperClass: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    defaultDate: {
      type: Object,
      default() {
        return {}
      },
    },
    keyForcedUpdate: {
      type: Number,
      default: 0,
    },
    tableField: {
      type: String,
      default: "",
    },
    opens: {
      type: String,
      default: "right",
    },
    formatDefaultDate: {
      type: String,
      default: "",
    },
    defaultToday: {
      type: Boolean,
      default: false,
    },
  },
  components: { DateRangePicker },
  data() {
    return {
      dateRange: {
        startDate: null,
        endDate: null,
      },
      date: new Date(),
    }
  },
  computed: {
    settingsRanges() {
      let today = new Date()
      today.setHours(0, 0, 0, 0)

      let yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      return {
        "Hôm nay": [today, today],
        "Hôm qua": [yesterday, yesterday],
        "Tuần này": [
          new Date(
            today.getFullYear(),
            today.getMonth(),
            new Date().getDate() - new Date().getDay() + 1,
          ),
          new Date(
            today.getFullYear(),
            today.getMonth(),
            new Date().getDate() + 7 - new Date().getDay(),
          ),
        ],
        "Tháng này": [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        ],
        "Tháng trước": [
          new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          new Date(new Date().getFullYear(), new Date().getMonth(), 0),
        ],
        "Năm nay": [
          new Date(new Date().getFullYear(), 0, 1),
          new Date(new Date().getFullYear(), 11, 31),
        ],
      }
    },
  },
  mounted() {
    if (this.defaultDate) {
      this.defaultDate.startDate && this.defaultDate.endDate
        ? (() => {
            let arrFr = String(this.defaultDate.startDate)
              .split(" ")[0]
              .split("-")
            let arrTo = String(this.defaultDate.endDate)
              .split(" ")[0]
              .split("-")
            if (this.formatDefaultDate === "dmy") {
              this.dateRange = {
                startDate: `${arrFr[1]}-${arrFr[2]}-${arrFr[0]}`,
                endDate: `${arrTo[1]}-${arrTo[2]}-${arrTo[0]}`,
              }
            } else {
              this.dateRange = {
                startDate: `${arrFr[1]}-${arrFr[2]}-${arrFr[0]}`,
                endDate: `${arrTo[1]}-${arrTo[2]}-${arrTo[0]}`,
              }
            }
          })()
        : (() => {
            this.dateRange = {
              startDate: null,
              endDate: null,
            }
          })()
    } else {
      if (this.defaultToday) {
        const todayObj = tDate.formatDateCustomize(new Date())
        const dateString = `${todayObj.yyyy}-${todayObj.MM}-${todayObj.dd}`
        console.log(dateString)
        this.dateRange = {
          startDate: dateString,
          endDate: dateString,
        }
      } else {
        this.dateRange = {
          startDate: null,
          endDate: null,
        }
      }
    }
  },

  watch: {
    isClear() {
      if (this.isClear) {
        this.dateRange = {
          startDate: null,
          endDate: null,
        }
      }
    },
    keyForcedUpdate() {
      // console.log('key changes');
      this.handleClearDate()
    },
    defaultDate: {
      deep: true,
      handler() {
        if (this.defaultDate) {
          this.defaultDate.startDate && this.defaultDate.startDate
            ? (() => {
                let arrFr = String(this.defaultDate.startDate)
                  .split(" ")[0]
                  .split("-")
                let arrTo = String(this.defaultDate.endDate)
                  .split(" ")[0]
                  .split("-")

                this.dateRange = {
                  startDate: `${arrFr[1]}-${arrFr[2]}-${arrFr[0]}`,
                  endDate: `${arrTo[1]}-${arrTo[2]}-${arrTo[0]}`,
                }
              })()
            : (() => {
                this.dateRange = {
                  startDate: null,
                  endDate: null,
                }
              })()
        } else {
          this.dateRange = {
            startDate: null,
            endDate: null,
          }
        }
      },
    },
  },
  methods: {
    updateValues(_val) {
      let valNew = {
        startDate: this.parseDate(_val.startDate),
        endDate: this.parseDate(_val.endDate),
      }

      let objReturn = this.tableField
        ? { fieldUpdate: this.tableField, value: valNew }
        : { value: valNew }
      this.pickedDate(objReturn)
    },
    checkOpen(_val) {
      console.log(_val)
      //  console.log(_val, "checkOpen");
    },
    getDateObject(_date) {
      let date = tDate.formatDateCustomize(_date, "vi", 12)
      return `${date.dd}/${date.MM}/${date.yyyy}`
    },
    getDateObjectV2(_date) {
      let date2 = tDate.formatDate(_date, "dd/MM/yyyy hh:mm:ss 12", "en")
      const part = date2.split(" ")
      return `${part[1].slice(0, 5)}-${part[2]} ${part[0]}`
    },
    parseDate(_date) {
      let date = tDate.formatDateCustomize(_date)
      return `${date.dd}-${date.MM}-${date.yyyy}`
    },
    checkInt(_val) {
      // null or undefine is unacceptable
      if (!_val) {
        return false
      }
      return !isNaN(_val)
        ? Number.isInteger(+_val) && +_val.toString().length < 20
        : false
    },
    checkFloat(_val) {
      if (!_val) {
        return false
      }
      return !isNaN(_val)
    },
    checkString(_val) {
      // null or undefine is unacceptable
      if (!_val) {
        return false
      }
      return _val.toString().length < 256
    },
    checkText(_val) {
      // null or undefine is unacceptable
      return _val
    },
    handleClearDate() {
      this.dateRange = {
        startDate: null,
        endDate: null,
      }
      let objDate = {
        fieldUpdate: this.tableField,
        value: this.dateRange,
      }

      this.pickedDate(objDate)
    },
    checkDate(_val) {
      // null or undefine is unacceptable
      if (!_val) {
        return false
      }
      // date instance : 2020/1/2
      let arr = _val.split("/")
      let a2 = `${arr[1]}/${arr[0]}/${arr[2]}`
      let a = new Date(_val)
      let b = new Date(a2)
      return !isNaN(a.getTime()) || !isNaN(b.getTime())
    },
  },
}
</script>

<style lang="scss">
.vue-daterange-picker {
  .calendars {
    flex-wrap: nowrap !important;
  }
}
.calendars.row {
  flex-wrap: nowrap !important;
  padding-bottom: 20px;
}
.date-range-slot-wrapper-tb {
  background-color: rgba(255, 255, 255, 0.891);
  min-width: unset;
  width: 100%;
  display: flex;
  justify-content: space-between;
  min-height: 28px;
  height: 100%;
  /* margin-bottom: 4px; */

  border: 1px solid #cfd4d8 !important;
  border-radius: 4px;
  padding-left: 4px;
}
.v-date-picker-table {
  table {
    tr {
      td {
        button {
          color: #000 !important;
        }
      }
    }
  }
}
.calendar-icon {
  height: 100%;
  border-left: 1px solid #cfd4d8;
  background-color: #f8f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 3px;
  border-radius: 0 4px 4px 0;
}
.calendar-star-icon {
  filter: invert(0.4);
}
.calendar-time {
  select {
    cursor: pointer !important;
  }
}
</style>
