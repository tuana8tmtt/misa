<template>
  <div class="company-infomation-tab h-100">
    <div class="each-info-part">
      <p class="info-part__title no-border-top">Company Infomation</p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Name:</p>
          <p class="row-info__content">{{ currentDetail.name }}</p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Country:</p>
          <p class="row-info__content">
            {{ currentDetail.country ? currentDetail.country.name : "" }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Email:</p>
          <p class="row-info__content">
            {{
              currentDetail.emails
                ? mergeStringFromFlatArray(currentDetail.emails)
                : ""
            }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Industry:</p>
          <p class="row-info__content">
            {{
              currentDetail.industries
                ? mergeStringFromField(currentDetail.industries, "short_name")
                : ""
            }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Type:</p>
          <p class="row-info__content">
            {{ currentDetail.type ? currentDetail.type.short_name || "" : "" }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Stage:</p>
          <p class="row-info__content">
            {{
              currentDetail.stage ? currentDetail.stage.short_name || "" : ""
            }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Website:</p>
          <p class="row-info__content">
            <a :href="currentDetail.website" target="_blank">{{
              currentDetail.website ? currentDetail.website : ""
            }}</a>
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Account Owner:</p>
          <p class="row-info__content">
            {{
              currentDetail.account_owner
                ? currentDetail.account_owner.name
                : ""
            }}
          </p>
        </v-col>
      </v-row>
    </div>
    <!-- % -->
    <div class="each-info-part">
      <p class="info-part__title">Billing Information</p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Company Name:</p>
          <p class="row-info__content">
            {{ billingInfomation.company_name }}
          </p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Tax code:</p>
          <p class="row-info__content">{{ billingInfomation.tax_code }}</p>
        </v-col>
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Address:</p>
          <p class="row-info__content">{{ billingInfomation.address }}</p>
        </v-col>
      </v-row>
    </div>
    <!-- % -->
    <div class="each-info-part">
      <p class="info-part__title info-part__title-icon">
        Additional Information
        <!-- <img
          src="@/assets/imgs/icons/bxs-minus-circle-icon.svg"
          class="ml-2"
          alt="bxs-minus-circle-icon"
        /> -->
      </p>
      <v-row class="each-part pt-1">
        <v-col class="row-info" xl="6" lg="6" cols="12">
          <p class="row-info__label">Social network:</p>
          <div class="row-info__content">
            <a
              v-if="socialNetwork.facebook"
              class="row-info__content social__content social__fb"
              :href="socialNetwork.facebook"
              target="_blank"
            >
              <img
                src="@/assets/imgs/icons/facebook-icon.svg"
                class="social__icon"
                alt="facebook-icon"
              />
              {{ socialNetwork.facebook }}
            </a>
            <a
              v-if="socialNetwork.linked_in"
              class="row-info__content social__content social__linked_in"
              :href="socialNetwork.facebook"
              target="_blank"
            >
              <img
                src="@/assets/imgs/icons/linkedin-icon.svg"
                class="social__icon"
                alt="linkedin-icon"
              />
              {{ socialNetwork.linked_in }}
            </a>
          </div>
        </v-col>
        <v-col xl="6" lg="6" cols="12" class="py-1">
          <div class="row-info mb-3">
            <p class="row-info__label">Tel:</p>
            <p class="row-info__content">{{ currentDetail.phone }}</p>
          </div>
          <div class="row-info p-tb-12">
            <p class="row-info__label">Anniversary:</p>
            <div>
              <p
                v-for="(ani, ida) in anniversaries"
                :key="ida"
                class="row-info__content w-100"
              >
                {{ ani.title }}{{ " - " + parseDateString(ani.start_at) }}
              </p>
            </div>
          </div>
        </v-col>

        <v-col class="row-info" cols="12">
          <p class="row-info__label">Other location:</p>

          <div class="row-info__content">
            <p
              v-for="(location, idx) in otherLocations"
              :key="idx"
              class="row-info__content mb-2"
              @click="coppyText(`${location.type} - ${location.address}`)"
            >
              <span class="other-location__type">{{ location.type }} - </span>
              <span class="other-location__address">{{
                location.address
              }}</span>
            </p>
          </div>
        </v-col>
        <v-col class="row-info" cols="12">
          <p class="row-info__label">Note:</p>

          <pre
            class="row-info__content"
            style="font-family: 'Roboto', 'san-serif' !important"
            v-html="currentDetail.note"
          ></pre>
        </v-col>
        <v-col class="row-info" cols="12">
          <p class="row-info__label">File Attachments</p>
          <div class="row-info__content d-flex flex-wrap">
            <div
              v-for="file in currentDetail.attachments"
              :key="file.id"
              class="each-file-in-attachments"
            >
              <a
                :href="file.url"
                :n="file.url"
                :download="file.url"
                target="_blank"
                class="row-info__content file-name"
                >{{ file.original_name }}.{{ file.extension }}</a
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import dateMixins from "@/mixins/dateMixins.js"
export default {
  name: "CompanyGeneralInfomation",
  props: {
    currentDetail: {
      type: Object,
    },
  },
  mixins: [objHandlerMixins, dateMixins],
  computed: {
    billingInfomation() {
      return this.currentDetail && this.currentDetail.billing_information
        ? this.currentDetail.billing_information
        : {}
    },
    socialNetwork() {
      return this.currentDetail && this.currentDetail.social_network
        ? this.currentDetail.social_network
        : {}
    },
    otherLocations() {
      return this.currentDetail && this.currentDetail.other_locations
        ? this.currentDetail.other_locations
        : []
    },
    anniversaries() {
      return this.currentDetail && this.currentDetail.anniversaries
        ? this.currentDetail.anniversaries
        : []
    },
  },
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
