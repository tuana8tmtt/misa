<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="dialog"
      width="800"
      @click:outside="handleClickOutside"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->

      <v-card class="popup-preview__card">
        <div class="popup-preview__content">
          <div class="header-preview d-flex align-items-start">
            <!-- <img
              src="@/assets/imgs/logo-template.png"
              alt=""
              class="mr-3 mt-3"
            /> -->
            <div class="header-preview-tt">
              <p class="mb-2 text-right">Preview</p>
              <div class="from-to-block">
                <p class="mb-0">From: {{ from }}</p>
                <!-- <p class="mb-0">
                  To:
                  {{
                    content.segments && content.segments.length
                      ? mergeStringFromField(content.segments, "name")
                      : " --- "
                  }}
                </p> -->
              </div>
            </div>
          </div>
          <p class="mb-3 font-weight-bold">{{ subject }}</p>

          <div
            class="popup-preview__inner-msg pb-3"
            style="overflow: hidden"
            v-html="body"
          ></div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import api from "@/services"
export default {
  mixins: [objHandlerMixins],
  props: {
    content: {
      type: Object,
      default() {},
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
      subject: "",
      body: "",
      from: "",
    }
  },
  mounted() {
    this.dialog = this.isVisible
  },
  watch: {
    isVisible() {
      this.dialog = this.isVisible
      if (this.isVisible) {
        this.previewEmail({
          subject: this.content.subject,
          body: this.content.body,
        })
      }
    },
  },
  methods: {
    handleClickOutside() {
      if (this.closeOutside) {
        this.onCancel()
      }
    },

    async previewEmail(payload = {}) {
      const res = await api.email.preview(payload)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.subject = res.data.data.subject
          this.body = res.data.data.body
          this.from = res.data.data.from
          return
        }
        const msg =
          "Failed when preview email: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when preview email: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
  },
}
</script>
<style lang="scss">
.popup-preview {
  &__content {
    padding: 12px 24px 0;
    color: #000;
  }
  &__card {
    border-radius: 8px !important;
    overflow: hidden;

    .header-preview-tt {
      width: 100%;
      padding-bottom: 20px;
      color: #000;
      font-weight: 500;
      .from-to-block {
        padding-top: 20px;
        border-top: 2px solid #cfd4d8;
      }
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
  }
}
</style>
