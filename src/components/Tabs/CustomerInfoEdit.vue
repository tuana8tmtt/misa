<template>
  <div class="customer-infomation-tab__edit h-100">
    <div class="each-info-part">
      <p class="info-part__title no-border-top">Customer Infomation</p>
      <v-row class="each-part pt-1">
        <v-col xl="6" lg="6" cols="12">
          <div class="row-info">
            <p class="row-info__label">
              Customer Code<span class="required-star">*</span>
            </p>
            <input
              v-model="form.account_object_code"
              @input="convertToUpperCase('name')"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- Customer name  -->
          <div class="row-info mt-2">
            <p class="row-info__label">
              Customer Name<span class="required-star">*</span>
            </p>
            <input
              v-model="form.account_object_name"
              @input="convertToUpperCase('name')"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- address -->
          <div class="row-info mt-2">
            <p class="row-info__label">
              Address<span class="required-star">*</span>
            </p>
            <input
              v-model="form.address"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Country -->
          <div class="row-info">
            <p class="row-info__label">
              Country<span class="required-star">*</span>
            </p>
            <input
              v-model="form.country"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- Legal Representative -->
          <div class="row-info">
            <p class="row-info__label" style="text-wrap: wrap">
              Legal Representative
            </p>
            <input
              v-model="form.legal_representative"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Tax Code -->
          <div class="row-info">
            <p class="row-info__label" style="text-wrap: wrap">
              Company Tax Code <span class="required-star">*</span>
            </p>
            <input
              v-model="form.company_tax_code"
              type="text"
              class="row-info__content"
            />
          </div>
        </v-col>
        <!-- Province -->
        <v-col xl="6" lg="6" cols="12">
          <!--  -->
          <div class="row-info">
            <p class="row-info__label">Province (City)</p>
            <input
              v-model="form.province_or_city"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- District -->
          <div class="row-info">
            <p class="row-info__label">District</p>
            <input
              v-model="form.district"
              type="text"
              class="row-info__content"
            />
          </div>
          <!-- Ward -->
          <div class="row-info">
            <p class="row-info__label">Ward</p>
            <input
              v-model="form.ward_or_commune"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Recieve Account -->
          <div class="row-info">
            <p class="row-info__label">Recieve Account</p>
            <input
              v-model="form.receive_account"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Pay Account -->
          <div class="row-info">
            <p class="row-info__label">Pay Account</p>
            <input
              v-model="form.pay_account"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Created By -->
          <div class="row-info">
            <p class="row-info__label">
              Created By<span class="required-star">*</span>
            </p>
            <input
              v-model="form.created_by"
              type="text"
              class="row-info__content"
            />
          </div>

          <!-- Modified By -->
          <div class="row-info">
            <p class="row-info__label">
              Modified By<span class="required-star">*</span>
            </p>
            <input
              v-model="form.modified_by"
              type="text"
              class="row-info__content"
            />
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
        @click="updateDetail"
      >
        Update
      </v-btn>
    </div>
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import api from "@/services"
import dateMixins from "@/mixins/dateMixins.js"
import { mapState } from "vuex"
export default {
  name: "CustomerInfoEdit",
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
  components: {},
  data() {
    return {
      form: {},
      values: "",
      defaultCountry: "",
      loadedData: false,
      loadingUpdate: false,
    }
  },
  mixins: [objHandlerMixins, dateMixins],
  computed: {
    ...mapState({}),
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
    parseData() {
      this.form = this.currentDetail ? this.currentDetail : {}
      this.$nextTick(() => {
        this.loadedData = true
      })
    },
    async updateDetail() {
      this.loadingUpdate = true
      // const formData = new FormData()
      // REQUIRED FIELD

      const body = {
        account_object_code: this.form.account_object_code,
        account_object_name: this.form.account_object_name,
        address: this.form.address ? this.form.address : null,
        legal_representative: this.form.legal_representative
          ? this.form.legal_representative
          : null,
        district: this.form.district ? this.form.district : null,
        ward_or_commune: this.form.ward_or_commune
          ? this.form.ward_or_commune
          : null,
        country: this.form.country ? this.form.country : null,
        province_or_city: this.form.province_or_city
          ? this.form.province_or_city
          : null,
        company_tax_code: this.form.company_tax_code
          ? this.form.company_tax_code
          : null,
        receive_account: this.form.receive_account
          ? this.form.receive_account
          : null,
        pay_account: this.form.pay_account ? this.form.pay_account : null,
        created_by: this.form.created_by ? this.form.created_by : null,
        modified_by: this.form.created_by ? this.form.modified_by : null,
        // other_locations
      }

      let res = await api.customer.update(this.currentId, body)

      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          this.updateCurrentData(res.data.data.customer)
          this.backGeneralInfo()
          return
        }
        const msg =
          "Failed when get industries: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when get industries: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.customer-infomation-tab__edit {
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
    width: 200px;
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
.remove-icon-been-hide {
  opacity: 0;
  pointer-events: none;
}
</style>
