<template>
  <div class="company-infomation-tab h-100">
    <div class="each-info-part">
      <p class="info-part__title no-border-top">Customer Information</p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Customer Code:</p>
          <p class="row-info__content">
            {{ currentDetail.account_object_code }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Customer Name:</p>
          <p class="row-info__content">
            {{ currentDetail.account_object_name }}
          </p>
        </v-col>
        <v-col class="row-info" xl="12" lg="12" cols="12">
          <p class="row-info__label">Address:</p>
          <p class="row-info__content">
            {{ currentDetail.address }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Country:</p>
          <p class="row-info__content">
            {{ currentDetail.country }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Province (City):</p>
          <p class="row-info__content">
            {{ currentDetail.province_or_city }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">District:</p>
          <p class="row-info__content">
            {{ currentDetail.district }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Ward:</p>
          <p class="row-info__content">
            {{ currentDetail.ward_or_commune }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Created By:</p>
          <p class="row-info__content">
            {{ currentDetail.created_by }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Modified By:</p>
          <p class="row-info__content">
            {{ currentDetail.modified_by }}
          </p>
        </v-col>
      </v-row>
    </div>
    <!-- % -->
    <div class="each-info-part">
      <p class="info-part__title">Billing Information</p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Company Tax Code:</p>
          <p class="row-info__content">
            {{ currentDetail.company_tax_code }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Recieve Account:</p>
          <p class="row-info__content">{{ currentDetail.recieve_account }}</p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Pay Account:</p>
          <p class="row-info__content">{{ currentDetail.pay_account }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import dateMixins from "@/mixins/dateMixins.js"
export default {
  name: "CustomerInfo",
  props: {
    currentDetail: {
      type: Object,
    },
  },
  mixins: [objHandlerMixins, dateMixins],
  computed: {},
}
</script>

<style lang="scss" scoped>
.company-infomation-tab {
  border: 1px solid #cfd4d8;
  padding-bottom: 30px;
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
    &.p-tb-12 {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    &__label {
      margin-bottom: 0;
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
      .each-file-in-attachments {
        padding: 6px 12px;
        margin-right: 6px;
        background-color: #f0f0f0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      &.file-name {
        display: block;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #0a71bc;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .social {
    &__content {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      color: #0a71bc;
      text-decoration: underline;
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
</style>
