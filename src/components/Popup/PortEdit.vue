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

      <v-card class="user-edit-confirm__card of-visible-card">
        <div class="modal-header">
          <p class="mb-0">Edit Port</p>
          <img
            src="@/assets/imgs/icons/red-close-icon.svg"
            alt=""
            class="pointer"
            @click="onCancel"
          />
        </div>
        <div class="user-edit-confirm__content">
          <div
            class="user-edit-confirm__inner-msg mb-3 d-flex align-items-center"
          >
            <label class="d-block text-left"
              >Port Code <span class="required-star pl-1">*</span></label
            >
            <input
              v-model="form.code"
              type="text"
              class="row-info__content w-100"
              placeholder="Port Code"
            />
          </div>
          <!--  -->
          <div
            class="user-edit-confirm__inner-msg mb-3 d-flex align-items-center"
          >
            <label class="d-block text-left"
              >Port Name <span class="required-star pl-1">*</span></label
            >
            <input
              v-model="form.name"
              type="text"
              class="row-info__content w-100"
              placeholder="Port Name"
            />
          </div>
          <!--  -->
          <div
            class="user-edit-confirm__inner-msg mb-3 d-flex align-items-center"
          >
            <label class="d-block text-left"
              >Country <span class="required-star pl-1">*</span></label
            >
            <div class="row-info__content">
              <v-autocomplete
                class="
                  v-autocomplete__nodetails
                  v-autocomplete__noshadow
                  v-autocomplete__borderform
                  v-autocomplete__modappend
                  v-autocomplete__formheight
                "
                v-model="form.country_id"
                :items="countries"
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
          <!--  -->
          <div
            class="user-edit-confirm__inner-msg mb-3 d-flex align-items-center"
          >
            <label for="user-password" class="d-block text-left">Status</label>
            <div class="d-flex align-items-center">
              <p
                class="status-text mb-0 pr-3"
                :class="form.is_active ? '' : 'inactive-label'"
              >
                Inactive
              </p>
              <v-switch v-model="form.is_active" color="#3AC430"></v-switch>
              <p
                class="status-text mb-0 pl-3"
                :class="form.is_active ? 'active-label' : ''"
              >
                Active
              </p>
            </div>
          </div>
          <!--  -->

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
              mx-auto
            "
            width="260px"
            :loading="onLoading"
            @click="submit"
          >
            Save & Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
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
  data() {
    return {
      dialog: false,
      title: "",
      getNoti: false,
      timeHM: "",
      startDate: "",
      form: {},
      companyTypes: [],
    }
  },
  mounted() {
    this.dialog = this.isVisible
  },
  computed: {
    ...mapState({
      countries: (state) => state.others.countries,
    }),
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
      this.form = { ...this.selectedData }
      if (this.selectedData && this.selectedData.country) {
        this.form.country_id = this.selectedData.country.id
      }
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
        name: this.form.name,
        code: this.form.code,
        country_id: this.form.country_id,
        is_active: !!this.form.is_active,
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
.user-edit-confirm {
  &__title {
    color: #000 !important;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    padding: 14px 0;
  }

  &__content {
    padding: 28px 16px;
    color: #000;
    label {
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      white-space: nowrap;
      width: 120px;
      min-width: 120px;
    }
    input.row-info__content {
      height: 44px;
    }
    .row-info__content {
      height: 44px;
      width: 100%;
      .v-input__slot {
        min-height: unset !important;
        height: 44px !important;
      }
      .v-input__append-inner {
        height: 42px !important;
        border-radius: 0 8px 8px 0;
      }
    }
  }
  &__inner-msg {
    text-align: center;
  }
  &__card {
    border-radius: 8px !important;
    overflow: hidden;
    .modal-header {
      background: #7030a0;
      height: 50px;
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      font-weight: bold;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 16px;
    }
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
    .status-text {
      font-size: 16px;
      font-weight: bold;
      color: #b3b3b3;
      &.active-label {
        color: #3ac430;
      }
      &.inactive-label {
        color: #d11313;
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
