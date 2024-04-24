<template>
  <div class="company-opportunity-tab h-100">
    <div class="each-info-part h-100">
      <p
        class="
          info-part__title
          no-border-top
          d-flex
          align-items-center
          justify-content-between
          mb-0
        "
      >
        Opportunity detail
        <v-btn
          depressed
          :color="returnThemeColor()"
          class="btn-normal-text text-white bc-btn"
          @click="onCreateOppotunity"
        >
          <span class="font-size-20 fw-400 mr-1">+</span> Add Opportunity
        </v-btn>
      </p>
      <v-row v-show="isNodata" class="each-part pt-1 no-data-part">
        <v-col cols="12" class="no-data-wr">
          <img src="@/assets/imgs/table-nodata.png" alt="" />
          <p class="no-data-text">No opportunity data yet</p>
        </v-col>
      </v-row>
      <v-row
        v-show="!isNodata"
        class="each-part pt-0 data-part mt-0 h-100 my-0"
      >
        <v-col cols="12" class="data-wr pt-0">
          <div class="table-block h-100">
            <div style="height: 100%">
              <v-row class="h-100 py-0 m-0">
                <v-col cols="3" class="p-0 tab-side-overflow shadhow-list">
                  <div
                    v-if="listData && listData.length"
                    class="list-opportunity"
                  >
                    <div
                      v-for="(o, idx) in listData"
                      :key="o.id"
                      class="each-opportunity pointer"
                      :class="
                        selectedData && selectedData.id === o.id
                          ? 'on-active'
                          : ''
                      "
                      @click="selectedData = o"
                    >
                      {{ idx + 1 }}.
                      {{
                        o.product_id
                          ? parseFieldFromArray(products, "id", o.product_id)
                            ? parseFieldFromArray(products, "id", o.product_id)
                                .name
                            : ""
                          : ""
                      }}
                      <img
                        v-if="selectedData && selectedData.id === o.id"
                        src="@/assets/imgs/icons/chevron-right.svg"
                        class="hard-white-icon"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    v-if="!listData || !listData.length"
                    class="list-opportunity"
                  >
                    <p class="no-data-text">No data.</p>
                  </div>
                </v-col>
                <v-col
                  v-if="selectedData && selectedData.id"
                  cols="9"
                  class="p-0 tab-side-overflow"
                >
                  <div class="selected-data-detail">
                    <div class="selected-data__header mb-6">
                      <div
                        class="
                          contact-group-action
                          d-flex
                          align-items-center
                          justify-content-between
                        "
                      >
                        <p class="mb-0 d-flex tab-title align-items-center">
                          <v-tooltip v-if="isEdit" bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <img
                                v-bind="attrs"
                                v-on="on"
                                src="@/assets/imgs/icons/arrow-left-icon.svg"
                                alt="back-icon"
                                class="pointer mr-2"
                                @click="isEdit = false"
                              />
                            </template>
                            <span>Back</span>
                          </v-tooltip>
                          Opportunity detail
                        </p>
                        <v-menu left offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              depressed
                              color="#fff"
                              class="
                                btn-normal-text
                                text-white
                                bc-btn
                                btn-actions-tabs btn-no-min-width
                                px-2
                              "
                              v-bind="attrs"
                              v-on="on"
                            >
                              <img
                                src="@/assets/imgs/icons/dots-horizontal.svg"
                                alt=""
                              />
                            </v-btn>
                          </template>
                          <div class="bg-white py-3">
                            <p
                              class="add-contact-selection pointer"
                              @click="onEdit"
                            >
                              Edit
                            </p>
                            <p
                              class="add-contact-selection pointer"
                              style="color: #e04038"
                              @click="openCfDelete"
                            >
                              Delete
                            </p>
                          </div>
                        </v-menu>
                      </div>
                    </div>
                    <div v-if="!isEdit" class="selected-data__body">
                      <div class="each-info-row">
                        <p class="each-info-row__title">
                          Product <span class="required-star">*</span>
                        </p>
                        <p class="each-info-row__content font-weight-nomal">
                          {{
                            selectedData.product_id
                              ? parseFieldFromArray(
                                  products,
                                  "id",
                                  selectedData.product_id,
                                )
                                ? parseFieldFromArray(
                                    products,
                                    "id",
                                    selectedData.product_id,
                                  ).name
                                : ""
                              : ""
                          }}
                        </p>
                      </div>
                      <!-- <div class="each-info-row">
                        <p class="each-info-row__title">
                          Opportunity Owner <span class="required-star">*</span>
                        </p>
                        <p class="each-info-row__content font-weight-nomal">
                          {{ selectedData.owner }}
                        </p>
                      </div> -->
                      <div class="d-flex align-items-start">
                        <div class="each-info-row w-50">
                          <p class="each-info-row__title">
                            Origin Country <span class="required-star">*</span>
                          </p>
                          <p class="each-info-row__content font-weight-nomal">
                            {{
                              selectedData.origin
                                ? parseFieldFromArray(
                                    countries,
                                    "id",
                                    selectedData.origin.country_id,
                                  )
                                  ? parseFieldFromArray(
                                      countries,
                                      "id",
                                      selectedData.origin.country_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="each-info-row w-50">
                          <p class="each-info-row__title">
                            Destination Country
                            <span class="required-star">*</span>
                          </p>
                          <p class="each-info-row__content font-weight-nomal">
                            {{
                              selectedData.destination
                                ? parseFieldFromArray(
                                    countries,
                                    "id",
                                    selectedData.destination.country_id,
                                  )
                                  ? parseFieldFromArray(
                                      countries,
                                      "id",
                                      selectedData.destination.country_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                      </div>
                      <!-- PORT PART -->
                      <div
                        v-if="selectedData.product_id === 3"
                        class="d-flex align-items-start"
                      >
                        <div class="each-info-row w-50">
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ originalObj.text }}
                            <span
                              v-if="originalObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.origin
                                ? parseFieldFromArray(
                                    port,
                                    "id",
                                    selectedData.origin.port_id,
                                  )
                                  ? parseFieldFromArray(
                                      port,
                                      "id",
                                      selectedData.origin.port_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="each-info-row w-50">
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ destinationObj.text }}
                            <span
                              v-if="destinationObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.destination
                                ? parseFieldFromArray(
                                    port,
                                    "id",
                                    selectedData.destination.port_id,
                                  )
                                  ? parseFieldFromArray(
                                      port,
                                      "id",
                                      selectedData.destination.port_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                      </div>
                      <!-- PORT PART -->
                      <div
                        v-else-if="selectedData.product_id === 1"
                        class="d-flex align-items-start"
                      >
                        <div class="each-info-row w-50">
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ originalObj.text }}
                            <span
                              v-if="originalObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.origin
                                ? parseFieldFromArray(
                                    airport,
                                    "id",
                                    selectedData.origin.airport_id,
                                  )
                                  ? parseFieldFromArray(
                                      airport,
                                      "id",
                                      selectedData.origin.airport_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="each-info-row w-50">
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ destinationObj.text }}
                            <span
                              v-if="destinationObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.destination
                                ? parseFieldFromArray(
                                    airport,
                                    "id",
                                    selectedData.destination.airport_id,
                                  )
                                  ? parseFieldFromArray(
                                      airport,
                                      "id",
                                      selectedData.destination.airport_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                      </div>
                      <!-- CITY -->
                      <div v-else class="d-flex align-items-start">
                        <div class="each-info-row w-50">
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ originalObj.text }}
                            <span
                              v-if="originalObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.origin
                                ? parseFieldFromArray(
                                    cities,
                                    "id",
                                    selectedData.origin.city_id,
                                  )
                                  ? parseFieldFromArray(
                                      cities,
                                      "id",
                                      selectedData.origin.city_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                        <div class="each-info-row w-50">
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ destinationObj.text }}
                            <span
                              v-if="destinationObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <p
                            v-if="destinationObj.isShow"
                            class="each-info-row__content font-weight-nomal"
                          >
                            {{
                              selectedData.destination
                                ? parseFieldFromArray(
                                    cities,
                                    "id",
                                    selectedData.destination.city_id,
                                  )
                                  ? parseFieldFromArray(
                                      cities,
                                      "id",
                                      selectedData.destination.city_id,
                                    ).name
                                  : ""
                                : ""
                            }}
                          </p>
                        </div>
                      </div>
                      <!--  -->
                      <div class="each-info-row">
                        <p class="each-info-row__title">
                          Detail <span class="required-star">*</span>
                        </p>
                        <pre
                          style="font-family: 'Roboto', 'san-serif' !important"
                          class="each-info-row__content font-weight-nomal"
                          v-html="selectedData.detail"
                        ></pre>
                      </div>
                      <div class="each-info-row">
                        <p class="each-info-row__title">Create time</p>
                        <p class="each-info-row__content font-weight-nomal">
                          {{
                            selectedData.created_at
                              ? parseDateString(selectedData.created_at)
                              : ""
                          }}
                        </p>
                      </div>
                      <div class="each-info-row">
                        <p class="each-info-row__title">Update time</p>
                        <p class="each-info-row__content font-weight-nomal">
                          {{
                            selectedData.updated_at
                              ? parseDateString(selectedData.updated_at)
                              : ""
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- EDIT DATA -->
                    <div v-if="isEdit" class="selected-data__body">
                      <div class="each-info-row w-50 pr-6">
                        <p class="each-info-row__title">
                          Product <span class="required-star">*</span>
                        </p>
                        <div
                          class="
                            each-info-row__content
                            d-flex
                            align-items-center
                          "
                        >
                          <v-autocomplete
                            class="
                              v-autocomplete__nodetails
                              v-autocomplete__noshadow
                              v-autocomplete__borderform
                              v-autocomplete__modappend
                              v-autocomplete__formheight
                            "
                            v-model="editData.product_id"
                            :items="products"
                            item-text="name"
                            item-value="id"
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

                      <!-- <div class="each-info-row w-50 pr-6">
                        <p class="each-info-row__title">
                          Opportunity Owner <span class="required-star">*</span>
                        </p>
                        <div class="each-info-row__content font-weight-nomal">
                          <input
                            v-model="editData.owner"
                            type="text"
                            class="row-info__content w-100"
                          />
                        </div>
                      </div> -->
                      <!--  -->

                      <div class="d-flex align-items-start">
                        <div class="each-info-row w-50">
                          <p class="each-info-row__title">
                            Origin Country <span class="required-star">*</span>
                          </p>
                          <div
                            class="
                              each-info-row__content
                              d-flex
                              align-items-center
                            "
                            style="max-width: 180px"
                          >
                            <v-autocomplete
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="originProd.country_id"
                              :items="countriesComputed"
                              item-text="name"
                              item-value="id"
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
                        <div class="each-info-row w-50">
                          <p class="each-info-row__title">
                            Destination Country
                            <span class="required-star">*</span>
                          </p>
                          <div
                            class="
                              each-info-row__content
                              d-flex
                              align-items-center
                            "
                            style="max-width: 180px"
                          >
                            <v-autocomplete
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="destinationProd.country_id"
                              :items="countriesComputed"
                              item-text="name"
                              item-value="id"
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
                      </div>

                      <!--  -->
                      <div class="d-flex align-items-start">
                        <div class="each-info-row w-50">
                          <p
                            v-if="originalObj.isShow"
                            class="each-info-row__title"
                          >
                            {{ originalObj.text }}
                            <span
                              v-if="originalObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <div
                            v-if="originalObj.isShow"
                            class="
                              each-info-row__content
                              d-flex
                              align-items-center
                            "
                            style="max-width: 180px"
                          >
                            <v-autocomplete
                              v-if="editData.product_id === 1"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="originProd.airport_id"
                              :items="airportOriginComputed"
                              item-text="name"
                              item-value="id"
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
                            <v-autocomplete
                              v-else-if="editData.product_id === 3"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="originProd.port_id"
                              :items="portOriginComputed"
                              item-text="name"
                              item-value="id"
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
                            <v-autocomplete
                              v-if="![1, 3, 9].includes(editData.product_id)"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="originProd.city_id"
                              :disabled="
                                !originProd || originProd.country_id != 233
                              "
                              :items="cities"
                              item-text="name"
                              item-value="id"
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
                        <div class="each-info-row w-50">
                          <p class="each-info-row__title">
                            {{ destinationObj.text }}
                            <span
                              v-if="destinationObj.required"
                              class="required-star"
                              >*</span
                            >
                          </p>
                          <div
                            class="
                              each-info-row__content
                              d-flex
                              align-items-center
                            "
                            style="max-width: 180px"
                          >
                            <v-autocomplete
                              v-if="editData.product_id === 1"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="destinationProd.airport_id"
                              :items="airportDestinationComputed"
                              item-text="name"
                              item-value="id"
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
                            <v-autocomplete
                              v-else-if="editData.product_id === 3"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="destinationProd.port_id"
                              :items="portDestinationComputed"
                              item-text="name"
                              item-value="id"
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
                            <v-autocomplete
                              v-if="![1, 3, 9].includes(editData.product_id)"
                              class="
                                v-autocomplete__nodetails
                                v-autocomplete__noshadow
                                v-autocomplete__borderform
                                v-autocomplete__modappend
                                v-autocomplete__formheight
                                mr-1
                              "
                              v-model="destinationProd.city_id"
                              :disabled="
                                !destinationProd ||
                                destinationProd.country_id != 233
                              "
                              :items="cities"
                              item-text="name"
                              item-value="id"
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
                      </div>

                      <!--  -->
                      <div class="each-info-row">
                        <p class="each-info-row__title">
                          Detail <span class="required-star">*</span>
                        </p>
                        <div
                          class="each-info-row__content font-weight-nomal mt-2"
                        >
                          <textarea
                            v-model="editData.detail"
                            name=""
                            id=""
                            rows="4"
                            class="row-info__content"
                          ></textarea>
                          <!-- <ckeditor
                            ref="myck4"
                            id="myck4"
                            v-model="editData.detail"
                            :config="editorConfig"
                            @namespaceloaded="onNamespaceLoaded"
                          ></ckeditor> -->
                        </div>
                      </div>
                      <div
                        class="
                          action-gr-btn
                          d-flex
                          align-items-center
                          update-gr-btn
                          mt-3
                        "
                      >
                        <v-btn
                          depressed
                          :color="returnThemeColorBtnSC()"
                          class="
                            btn-normal-text btn-actions-tabs
                            bc-btn
                            btn-font-weight-regular btn-font-color-66
                            text-white
                            v-btn__textwhite
                            ml-auto
                          "
                          style="min-width: 110px"
                          :disabled="loadingUpdate"
                          :loading="loadingUpdate"
                          @click="submitEdit"
                        >
                          Save
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col
                  v-if="!selectedData || !selectedData.id"
                  cols="9"
                  class="p-0 tab-side-overflow"
                >
                  <div
                    class="
                      w-100
                      h-100
                      d-flex
                      flex-column
                      align-items-center
                      justify-content-center
                    "
                  >
                    <img src="@/assets/imgs/table-nodata.png" alt="" />
                    <p class="no-data-text">No opportunity selected.</p>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <ConfirmNormal
      :content="deleteConfirmContent"
      :is-visible="showDeletePopup"
      :on-cancel="onCancelDelete"
      :on-confirm="onConfirmDelete"
      :on-loading="loadingDelete"
      :close-outside="true"
    />
  </div>
</template>

<script>
import api from "@/services"
import { mapState } from "vuex"

//
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
import { tStr } from "validation_t/src"
import dateMixins from "@/mixins/dateMixins.js"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
export default {
  name: "CompanyContact",
  props: {
    currentDetail: {
      type: Object,
    },
    currentId: {
      type: String,
    },
    onCreateOppotunity: {
      type: Function,
    },
    onShowDetailContact: {
      type: Function,
    },
  },
  components: { ConfirmNormal },
  mixins: [objHandlerMixins, dateMixins],
  created() {},
  mounted() {
    this.getListData()
  },
  beforeDestroy() {},
  data() {
    return {
      isNodata: false,
      toggleDialog: false,
      loadingDelete: false,
      loadingUpdate: false,
      showDeletePopup: false,
      isEdit: false,
      editData: {},
      listData: [],
      selectedData: {},
      destinationProd: {},
      originProd: {},
      selectedProduct: null,
      // CK4
      listParam: {
        ApprovalName: "Tiêu đề",
        CreatorAsglId: "Người đề xuất - Mã nhân viên",
        CreatorDepartment: "Người đề xuất - Phòng ban",
        CreatorName: "Người đề xuất - Tên",
        CreatorPosition: "Người đề xuất - Chức vụ",
        TestVanBanDai: "test văn bản dài",
      },
      editorData: "",
      editorConfig: {
        removePlugins: "iframe,image",
        toolbarGroups: [
          { name: "styles" },
          { name: "colors" },
          { name: "basicstyles" },
          // { name: "document", groups: ["document", "doctools"] },

          // { name: "clipboard", groups: ["clipboard", "undo"] },
          { name: "forms" },

          {
            name: "paragraph",
            groups: ["list", "blocks", "align", "TextIndent", "indent"],
          },
          { name: "tools", groups: ["table"] },
          { name: "insert", groups: ["PageBreak"] },
        ],
        extraPlugins: [
          "pagebreak",
          "justify",
          "textindent",
          "indentblock",
          "timestamp",
        ],
        indentation: "20px",
        indentationKey: "tab",
      },
      content: "",
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler() {
        this.isEdit = false
      },
    },
  },
  computed: {
    ...mapState({
      products: (state) => state.others.products,
      cities: (state) => state.others.cities,
      countries: (state) => state.others.countries,
      port: (state) => state.others.port,
      airport: (state) => state.others.airport,
      currentCK4: (state) => state.currentCK4,
    }),
    countriesComputed() {
      if (
        this.selectedData &&
        [4, 5, 6, 7, 8].includes(this.selectedData.product_id)
      ) {
        return this.countries.filter((o) => o.id === 233)
      }
      if (this.selectedData && this.selectedData.product_id === 9) {
        return this.countries.filter((o) => o.id && o.southeast_asia)
      }
      return this.countries
    },
    portOriginComputed() {
      if (!this.originProd || !this.originProd.country_id) {
        return []
      }
      const rslt = this.countries.filter(
        (o) => o.id == this.originProd.country_id,
      )
      if (!rslt || !rslt.length) {
        return []
      }
      return this.port.filter(
        (o) => o.id && o.country && o.country.id == rslt[0].id,
      )
    },
    airportOriginComputed() {
      if (!this.originProd || !this.originProd.country_id) {
        return []
      }
      const rslt = this.countries.filter(
        (o) => o.id == this.originProd.country_id,
      )
      if (!rslt || !rslt.length) {
        return []
      }
      return this.airport.filter(
        (o) => o.id && o.country && o.country.id == rslt[0].id,
      )
    },
    portDestinationComputed() {
      if (!this.destinationProd || !this.destinationProd.country_id) {
        return []
      }
      const rslt = this.countries.filter(
        (o) => o.id == this.destinationProd.country_id,
      )
      if (!rslt || !rslt.length) {
        return []
      }
      return this.port.filter(
        (o) => o.id && o.country && o.country.id == rslt[0].id,
      )
    },
    airportDestinationComputed() {
      if (!this.destinationProd || !this.destinationProd.country_id) {
        return []
      }
      const rslt = this.countries.filter(
        (o) => o.id == this.destinationProd.country_id,
      )
      if (!rslt || !rslt.length) {
        return []
      }
      return this.airport.filter(
        (o) => o.id && o.country && o.country.id == rslt[0].id,
      )
    },

    deleteConfirmContent() {
      return `You want to delete this ? <b>Opportunity</b>`
    },
    listParamComputed() {
      if (!this.listParam) {
        return []
      }
      const listCaption = Object.values(this.listParam)
      const listName = Object.keys(this.listParam)
      const arr = listCaption.map((o, idx) => {
        return {
          caption: o,
          name: listName[idx],
        }
      })
      return arr
    },
    originalObj() {
      const selectedProduct = this.selectedData
        ? this.selectedData.product_id
        : 0
      switch (+selectedProduct) {
        case 1:
          // AIR
          return {
            text: "Origin Airport",
            isShow: true,
            required: true,
          }
        case 2:
          // RAIL
          return {
            text: "Origin Station",
            isShow: true,
            required: true,
          }
        case 3:
          // OCEAN
          return {
            text: "Port of Loading",
            isShow: true,
            required: true,
          }
        case 4:
          // WATERWAY

          return {
            text: "Origin Terminal",
            isShow: true,
            required: true,
          }
        case 5:
          // ROAD
          return {
            text: "Origin Terminal",
            isShow: true,
            required: true,
          }
        case 6:
          // CUSTOMS BROKERAGE
          return {
            text: " ",
            isShow: false,
            required: false,
          }
        case 7:
          // WAREHOUSING
          return {
            text: " ",
            isShow: false,
            required: false,
          }
        case 8:
          // PACKAGING
          return {
            text: " ",
            isShow: false,
            required: false,
          }

        default:
          return {
            text: "",
            isShow: false,
            required: false,
          }
      }
    },

    destinationObj() {
      const selectedProduct = this.selectedData
        ? this.selectedData.product_id
        : 0
      switch (+selectedProduct) {
        case 1:
          // AIR
          return {
            text: "Destination Airport",
            isShow: true,
            required: true,
          }
        case 2:
          // RAIL
          return {
            text: "Destination Station",
            isShow: true,
            required: true,
          }
        case 3:
          // OCEAN
          return {
            text: "Port of Discharge",
            isShow: true,
            required: true,
          }
        case 4:
          // WATERWAY

          return {
            text: "Destination Terminal",
            isShow: true,
            required: true,
          }
        case 5:
          // ROAD
          return {
            text: "Destination Terminal",
            isShow: true,
            required: true,
          }
        case 6:
          // CUSTOMS BROKERAGE
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 7:
          // WAREHOUSING
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 8:
          // PACKAGING
          return {
            text: "Location",
            isShow: true,
            required: true,
          }
        case 9:
          // PACKAGING
          return {
            text: "",
            isShow: false,
            required: false,
          }
        default:
          return {
            text: "",
            isShow: false,
            required: false,
          }
      }
    },
  },
  methods: {
    openCfDelete() {
      this.showDeletePopup = true
    },
    onCancelDelete() {
      this.showDeletePopup = false
    },
    closeEdit() {
      this.isEdit = false
      this.editData = {}
      this.originProd = {}
      this.destinationProd = {}
    },
    onEdit() {
      this.isEdit = true
      this.editData = {
        ...this.selectedData,
      }
      const oriObj = { ...this.selectedData.origin }
      if (oriObj.country_id) {
        const rslt = this.countries.filter((o) => o.id == oriObj.country_id)
        oriObj.country = rslt.length ? rslt[0] : null
      }
      this.originProd = { ...oriObj }
      const desObj = { ...this.selectedData.destination }
      if (desObj.country_id) {
        const rslt = this.countries.filter((o) => o.id == desObj.country_id)
        desObj.country = rslt.length ? rslt[0] : null
      }
      this.destinationProd = { ...desObj }
    },
    async getListData(query = {}) {
      const res = await api.opportunity.getListData(this.currentId, query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.listData = res.data.data.opportunities
          if (
            !res.data.data.opportunities ||
            !res.data.data.opportunities.length
          ) {
            this.isNodata = true
          }
          if (
            res.data.data.opportunities &&
            res.data.data.opportunities.length
          ) {
            this.selectedData = res.data.data.opportunities[0]
          }
          return
        }
        const msg =
          "Failed when get opportunities list: " +
          (res.status === 404
            ? "Not found"
            : res.data.message || String(res) || " Try again")

        this.$store.commit("toast/getError", msg)
      } catch (error) {
        console.log(error)
      }
    },

    parseDataObj(obj) {
      return {
        ...obj,
        emails_computed: "",
        gender_computed: this.parseGender(obj.gender),
        companies_computed: this.mergeStringFromField(obj.companies, "name"),
        phones_computed:
          obj.phones && obj.phones.length ? obj.phones[0].number : "",
      }
    },
    async onConfirmDelete() {
      this.loadingDelete = true
      const res = await api.opportunity.delete(
        this.currentId,
        this.selectedData.id,
      )
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Remove opportunity success")
          this.selectedData = {}
          this.getListData()
          this.onCancelDelete()
          return
        }
        const msg =
          "Failed when remove opportunity: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when remove opportunity: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    updateLocalData(_data) {
      const myIdx = this.listData.findIndex((o) => o.id === _data.id)
      if (myIdx === -1) {
        return
      }
      this.selectedData = _data
      this.listData.splice(myIdx, 1, _data)
    },
    async submitEdit() {
      this.loadingUpdate = true
      // const formData = new FormData()
      // REQUIRED FIELD

      // eslint-disable-next-line no-unused-vars
      // const formData = new FormData()
      // formData.append("product_id", this.editData.product_id || "")
      // formData.append("owner", this.editData.owner || "")
      // formData.append("detail", this.editData.detail || "")
      // formData.append("origin[country_id]", this.originProd.country_id || "")
      // formData.append("origin[city_id]", this.originProd.city_id || "")
      // formData.append(
      //   "destination[country_id]",
      //   this.destinationProd.country_id || "",
      // )
      // formData.append("origin[city_id]", this.destinationProd.city_id || "")
      const body = {
        product_id: this.editData.product_id || "",
        owner: this.editData.owner || "",
        detail: this.editData.detail || "",
        origin: {
          country_id: this.originProd.country_id || null,
          city_id: this.originProd.city_id || null,
          airport_id: this.originProd.airport_id || null,
          port_id: this.originProd.port_id || null,
        },
        destination: {
          country_id: this.destinationProd.country_id || null,
          city_id: this.destinationProd.city_id || null,
          airport_id: this.destinationProd.airport_id || null,
          port_id: this.destinationProd.port_id || null,
        },
      }
      const res = await api.opportunity.update(
        this.currentId,
        this.editData.id,
        body,
      )
      this.loadingUpdate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          this.updateLocalData(res.data.data.opportunity)
          this.closeEdit()
          return
        }
        const msg =
          "Failed when update opportunity: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when update opportunity: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    // CK4

    onEditorReady() {
      const target = document.querySelector("#edtor-wrapper_m")
      if (target) {
        const toolbar = target.querySelector(".ck.ck-toolbar__items")
        console.log(toolbar)
      }
      alert("rd")
    },
    handleInsertCap() {
      if (!this.currentCap) {
        return
      }
      const objResultCap = this.listParamComputed.filter(
        (o) => o.name === this.currentCap,
      )
      if (!objResultCap || !objResultCap.length) {
        return
      }
      const str = `{!${objResultCap[0].name}!}`
      this.content += str
    },
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    returnName(_str) {
      if (!_str) {
        return _str
      }
      const result = tStr.removeAscentNormal(_str)
      const arrResult = result.split(" ")
      // eslint-disable-next-line no-unused-vars
      arrResult.forEach((o) => {
        o = this.capitalizeFirstLetter(o)
      })
      return String(arrResult.join(""))
        .replace(/[^\w\s]/gi, "")
        .replaceAll(" ", "_")
    },
    handleChangeField(e, _val) {
      console.log(_val)
      if (e) {
        const str = `<p class="${this.returnName(_val.caption)}">${
          _val.caption
        }:{!${_val.name}!}</p>`
        this.content += str
      } else {
        const str = `<p>${_val.caption}:{!${_val.name}!}</p>`

        this.content = this.content.replaceAll(str, "")
      }
    },

    onNamespaceLoaded(CKEDITOR) {
      // Add external `placeholder` plugin which will be available for each
      // editor instance on the page.
      this.$store.commit("SET_CURRENT_CK4", CKEDITOR)
      // const listParamComputed = this.listParamComputed;
      CKEDITOR.plugins.add("textindent", {
        icons: "textindent",
        // availableLangs: { vi: 1 },
        // lang: "vi",
        init: function (editor) {
          var indentation = editor.config.indentation
          var indentationKey = editor.config.indentationKey

          if (typeof indentation == "undefined") indentation = "20px"
          if (typeof indentationKey == "undefined") indentationKey = "tab"

          // if (editor.ui.addButton) {
          //   editor.ui.addButton("textindent", {
          //     label: "Ds",
          //     title: "Ds",
          //     icons: "textindent",
          //     command: "ident-paragraph",
          //     toolbar: "paragraph",
          //   });
          // }

          if (indentationKey !== false) {
            editor.on("key", function (ev) {
              if (
                ev.data.domEvent.$.key.toLowerCase() ===
                  indentationKey.toLowerCase().trim() ||
                ev.data.keyCode === indentationKey
              ) {
                editor.execCommand("ident-paragraph")
                ev.cancel()
              }
            })
          }

          editor.on("selectionChange", function () {
            var style_textindente = new CKEDITOR.style({
              element: "p",
              styles: { "text-indent": indentation },
              overrides: [
                {
                  element: "text-indent",
                  attributes: { size: "0" },
                },
              ],
            })

            if (style_textindente.checkActive(editor.elementPath(), editor))
              editor
                .getCommand("ident-paragraph")
                .setState(CKEDITOR.TRISTATE_ON)
            else
              editor
                .getCommand("ident-paragraph")
                .setState(CKEDITOR.TRISTATE_OFF)
          })

          editor.addCommand("ident-paragraph", {
            allowedContent: "p{text-indent}",
            requiredContent: "p",
            // eslint-disable-next-line no-unused-vars
            exec: function (evt) {
              var range = editor.getSelection().getRanges()[0]

              var walker = new CKEDITOR.dom.walker(range),
                node

              var state = editor.getCommand("ident-paragraph").state

              while ((node = walker.next())) {
                if (node.type == CKEDITOR.NODE_ELEMENT) {
                  if (node.getName() === "p") {
                    editor.fire("saveSnapshot")
                    if (state == CKEDITOR.TRISTATE_ON) {
                      node.removeStyle("text-indent")
                      editor
                        .getCommand("ident-paragraph")
                        .setState(CKEDITOR.TRISTATE_OFF)
                    } else {
                      node.setStyle("text-indent", indentation)
                      editor
                        .getCommand("ident-paragraph")
                        .setState(CKEDITOR.TRISTATE_ON)
                    }
                  }
                }
              }

              if (node === null) {
                node = editor
                  .getSelection()
                  .getStartElement()
                  .getAscendant("p", true)

                editor.fire("saveSnapshot")

                if (state == CKEDITOR.TRISTATE_ON) {
                  node.removeStyle("text-indent")
                  editor
                    .getCommand("ident-paragraph")
                    .setState(CKEDITOR.TRISTATE_OFF)
                } else {
                  node.setStyle("text-indent", indentation)
                  editor
                    .getCommand("ident-paragraph")
                    .setState(CKEDITOR.TRISTATE_ON)
                }
              }
            },
          })
        },
      })

      CKEDITOR.plugins.add("timestamp", {
        icons: "timestamp",
        init: function (editor) {
          editor.addCommand("insertTimestamp", {
            exec: function (editor) {
              var now = new Date()
              editor.insertHtml(
                "The current date and time is: <em>" + now.toString() + "</em>",
              )
            },
          })
          // editor.ui.addButton("Timestamp", {
          //  label: "Insert Timestamp",
          //  command: "insertTimestamp",
          //  toolbar: "insert",
          // });
          let config = editor.config
          editor.ui.addRichCombo("my-combo", {
            label: "Danh sách trường",
            title: "Danh sách trường",
            className: "list-params",
            toolbar: "insert",
            panel: {
              css: [CKEDITOR.skin.getPath("editor")].concat(config.contentsCss),
              multiSelect: false,
              attributes: { "aria-label": "Danh sách trường" },
            },

            init: function () {
              const localListParamComputed =
                localStorage.getItem("listParamComputed")
              if (localListParamComputed) {
                const newList = JSON.parse(localListParamComputed)
                this.startGroup("Danh sách các trường")
                // eslint-disable-next-line no-unused-vars
                newList.forEach((o, idx) => {
                  this.add(`{!${o.name}!}`, `${o.caption}`)
                })
              }
            },

            onClick: function (value) {
              editor.focus()
              editor.fire("saveSnapshot")

              editor.insertHtml(value)

              editor.fire("saveSnapshot")
            },
          })
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.company-opportunity-tab {
  border: 1px solid #cfd4d8;
  padding-bottom: 10px;
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
    padding-bottom: 18px;
  }
  .tab-side-overflow {
    height: calc(100vh - 307px);
    overflow-x: hidden;
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
.add-contact-selection {
  white-space: nowrap;
  color: #000;
  font-weight: bold;
  padding: 9px 16px;
  margin: 0 !important;
}
.list-opportunity {
  padding: 24px 40px 12px;
  height: 100%;
}
.shadhow-list {
  box-shadow: 0px 3px 6px #00000029;
}
.selected-data-detail {
  padding: 24px 40px 12px;
  .tab-title {
    font-weight: bold;
    color: #000;
    font-size: 20px;
    line-height: 24px;
  }
}
.each-opportunity {
  padding: 12px 16px;
  background: #fff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  &:hover {
    background: #d52d24d9 0% 0% no-repeat padding-box;
    color: #fff;
  }
  &.on-active {
    background: #e04038 0% 0% no-repeat padding-box;
    color: #fff;
  }
}
.each-info-row {
  display: flex;
  align-items: flex-start;
  &__title {
    font-weight: bold;
    color: #000;
    width: 185px;
  }
  &__content {
    width: calc(100% - 185px);
  }
}
</style>
