<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="dialog"
      width="320"
      @click:outside="handleClickOutside"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="create-segment-confirm__card">
        <div class="create-segment-confirm__content">
          <h2 class="create-segment-confirm__title">Quick create segment</h2>
          <div class="create-segment-confirm__inner-msg">
            <label for="segment-name" class="d-block text-left mb-1"
              >Segment name:</label
            >
            <input
              type="text"
              class="row-info__content w-100"
              v-model="segmentName"
            />
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
            @click="onConfirm(segmentName)"
          >
            Save
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
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
  data() {
    return {
      dialog: false,
      segmentName: "",
    }
  },
  mounted() {
    this.dialog = this.isVisible
    this.segmentName = ""
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
      this.segmentName = ""
    },
  },
  methods: {
    handleClickOutside() {
      if (this.closeOutside) {
        this.onCancel()
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
</style>
