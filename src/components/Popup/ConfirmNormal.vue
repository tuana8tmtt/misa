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

      <v-card class="popup-confirm__card">
        <div class="popup-confirm__content">
          <img
            src="@/assets/imgs/icons/alert-triangle.svg"
            alt=""
            class="d-block mx-auto"
          />
          <h2 class="popup-confirm__title">{{ title }}</h2>
          <div class="popup-confirm__inner-msg" v-html="content"></div>
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
            :color="returnThemeColor()"
            :loading="onLoading"
            @click="onConfirm"
          >
            {{ buttonConfirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "You are sure?",
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
    }
  },
  mounted() {
    this.dialog = this.isVisible
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
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
.popup-confirm {
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
