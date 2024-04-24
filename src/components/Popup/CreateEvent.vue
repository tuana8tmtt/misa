<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="dialog"
      width="600"
      :min-height="600"
      @click:outside="handleClickOutside"
      :content-class="'of-visible-card'"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="create-segment-confirm__card of-visible-card">
        <div class="create-segment-confirm__content">
          <h2 class="create-segment-confirm__title">Set new event</h2>
          <div
            class="
              create-segment-confirm__inner-msg
              d-flex
              align-items-center
              mb-3
            "
          >
            <label for="segment-time" class="d-block text-left mb-1"
              >Set time:</label
            >
            <!-- <input
              type="text"
              class="row-info__content w-100"
              v-model="title"
            /> -->
            <div class="w-100 inner-datepicker-w100 d-flex">
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
          <div
            class="
              create-segment-confirm__inner-msg
              mb-3
              d-flex
              align-items-center
            "
          >
            <label for="segment-name" class="d-block text-left"
              >Event title:</label
            >
            <input
              type="text"
              class="row-info__content w-100"
              v-model="title"
            />
          </div>
          <div
            class="create-segment-confirm__inner-msg d-flex align-items-center"
          >
            <label class="d-block text-left mb-1"></label>
            <div class="row-info__content w-100">
              <v-checkbox
                v-model="getNoti"
                :label="`Get notification`"
                class="m-0"
              ></v-checkbox>
            </div>
          </div>
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
              ml-auto
            "
            :loading="onLoading"
            @click="submit"
          >
            Create
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DateRangeWithTime from "@/components/Shared/DateRangeWithTime.vue"
export default {
  props: {
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
      default: "Delete",
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
  components: { DateRangeWithTime },
  data() {
    return {
      dialog: false,
      title: "",
      getNoti: false,
      timeHM: "",
      startDate: "",
    }
  },
  mounted() {
    this.dialog = this.isVisible
    this.title = ""
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
      this.title = ""
    },
  },
  methods: {
    formatStringDate(_strDate) {
      if (_strDate) {
        const dateArray = _strDate.split("-")
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
      }
      return ""
    },
    submit() {
      const body = {
        title: this.title,
        start_at_date: this.formatStringDate(this.startDate),
        start_at_time: this.timeHM,
        should_notify: this.getNoti,
      }
      this.onConfirm(body)
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
  },
}
</script>
<style lang="scss">
.create-segment-confirm {
  &__title {
    color: #000 !important;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    padding: 14px 0;
  }

  &__content {
    padding: 6px 24px 18px;
    color: #000;
    label {
      font-size: 14px;
      white-space: nowrap;
      width: 120px;
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
      height: 40px !important;
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
.of-visible-card {
  overflow: visible !important;
}
.inner-datepicker-w100 {
  .vue-daterange-picker {
    width: 100% !important;
    height: 100%;
  }
}
.input-time-form {
  font-size: 14px;
  height: 36px !important;
}
</style>
