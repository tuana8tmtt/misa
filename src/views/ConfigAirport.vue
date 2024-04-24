<template>
  <DefaultLayout>
    <div>
      <div class="bread-crumb has-btn">
        <p class="bc-page__title">Manage Airport</p>
        <v-btn
          depressed
          :color="returnThemeColor()"
          class="btn-normal-text text-white bc-btn"
          @click="openCreateDataDialog"
        >
          <span class="font-size-20 fw-400 mr-1">+</span> New
        </v-btn>
      </div>
      <div class="airport-tab h-100 bg-white">
        <div class="each-info-part">
          <v-row v-show="isNodata" class="each-part pt-1 no-data-part">
            <v-col cols="12" class="no-data-wr">
              <img src="@/assets/imgs/table-nodata.png" alt="" />
              <p class="no-data-text">No contact data yet</p>
            </v-col>
          </v-row>
          <v-row v-show="!isNodata" class="each-part pt-0 data-part mt-0">
            <v-col cols="12" class="data-wr pt-0">
              <div class="filter-block py-3 px-3 bg-white">
                <!-- <v-menu offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <p
                      class="btn-add-selected pointer"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add selected to segment
                    </p>
                  </template>
                  <div class="bg-white">
                    <p class="btn-add-new-segment pointer mb-0">
                      + Create new segment
                    </p>
                    <div class="on-dropdown-search dropdown-search__full">
                      <img
                        src="@/assets/imgs/icons/companies-icon.svg"
                        alt=""
                      />
                      <input type="text" placeholder="Search" />
                    </div>
                    <div class="list-segment"></div>
                    <div class="btn-apply">
                      <v-btn
                        depressed
                        color="#E04038"
                        class="
                          btn-normal-text
                          text-white
                          bc-btn
                          btn-small
                          d-block
                          ml-auto
                        "
                      >
                        Apply
                      </v-btn>
                    </div>
                  </div>
                </v-menu> -->

                <input
                  v-model="searchKey"
                  type="text"
                  class="input-filter mr-0 ml-auto"
                  placeholder="Search here ..."
                />
                <!-- <v-btn
                  depressed
                  color="#fff"
                  class="btn-normal-text text-black btn-add-filter"
                  @click="triggerFilter"
                >
                  <span class="font-size-20 fw-400 mr-1">{{
                    isToolPanelShow ? "-" : "+"
                  }}</span>
                  {{ isToolPanelShow ? "Hide" : "Show" }} Filter
                </v-btn> -->
              </div>
              <div class="table-block no-filter-table">
                <div style="height: calc(100vh - 240px)">
                  <ag-grid-vue
                    style="width: 100%; height: 100%"
                    class="ag-theme-alpine"
                    id="myGridContact"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="rowData"
                    :frameworkComponents="frameworkComponents"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :rowModelType="'infinite'"
                    :loadingOverlayComponentFramework="
                      loadingOverlayComponentFramework
                    "
                    :suppressMenuHide="true"
                    :loadingOverlayComponentParams="
                      loadingOverlayComponentParams
                    "
                    :noRowsOverlayComponentFramework="
                      noRowsOverlayComponentFramework
                    "
                    :noRowsOverlayComponentParams="noRowsOverlayComponentParams"
                    :sideBar="sideBar"
                    :suppressPaginationPanel="true"
                    :rowSelection="'multiple'"
                    :suppressRowClickSelection="true"
                    @cell-clicked="cellClicked"
                    @grid-ready="onGridReady"
                  ></ag-grid-vue>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <ConfirmNormal
        :content="deleteConfirmContent"
        :is-visible="showDeletePopup"
        :on-cancel="onCancelDelete"
        :on-confirm="onConfirmDelete"
        :on-loading="loadingDelete"
        :close-outside="true"
      />

      <AirportEdit
        :is-visible="showEditPopup"
        :selected-data="selectedToEdit"
        :on-cancel="onCancelEdit"
        :on-confirm="onConfirmEdit"
        :on-loading="loadingEdit"
        :close-outside="true"
      />
      <AirportCreate
        :is-visible="showCreatePopup"
        :on-cancel="onCancelCreate"
        :on-confirm="createData"
        :on-loading="loadingCreate"
        :close-outside="true"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import "ag-grid-enterprise"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import TextAndFilter from "@/components/AgTableCustomComponent/Header/TextAndFilter.vue"
import api from "@/services"
import { mapState } from "vuex"
import agFilters from "@/mixins/filterMixins.js"
import CustomLoadingOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customLoadingOverlayVue"
import CustomNoRowsOverlay from "@/components/AgTableCustomComponent/LoadingOverlay/customNoRowsOverlayVue"
import UserActions from "@/components/AgTableCustomComponent/CustomCell/UserActions"
import SegmentStatus from "@/components/AgTableCustomComponent/CustomCell/SegmentStatus"
import FilterBySelectSingle from "@/components/AgTableCustomComponent/CustomFilters/FilterBySelectSingle.vue"
import FilterBySelect from "@/components/AgTableCustomComponent/CustomFilters/FilterBySelect.vue"
import DefaultLayout from "@/layouts/default.vue"
import ConfirmNormal from "@/components/Popup/ConfirmNormal.vue"
import AirportEdit from "@/components/Popup/AirportEdit.vue"
import AirportCreate from "@/components/Popup/AirportCreate.vue"
//
import objHandlerMixins from "@/mixins/objHandlerMixins.js"
export default {
  name: "Contact",
  props: {
    onCreateNewContact: {
      type: Function,
    },
    onShowDetailContact: {
      type: Function,
    },
  },
  components: {
    DefaultLayout,
    ConfirmNormal,
    AirportEdit,
    AirportCreate,
    // eslint-disable-next-line vue/no-unused-components
    agColumnHeader: TextAndFilter,
    // eslint-disable-next-line vue/no-unused-components
    customLoadingOverlay: CustomLoadingOverlay,
    // eslint-disable-next-line vue/no-unused-components
    UserActions: UserActions,
    // eslint-disable-next-line vue/no-unused-components
    SegmentStatus: SegmentStatus,
    // eslint-disable-next-line vue/no-unused-components
    customNoRowsOverlay: CustomNoRowsOverlay,
    // eslint-disable-next-line vue/no-unused-components
    FilterBySelectSingle: FilterBySelectSingle,
    // eslint-disable-next-line vue/no-unused-components
    FilterBySelect: FilterBySelect,
  },
  mixins: [objHandlerMixins, agFilters],
  created() {
    this.sideBar = ["columns"]
    this.frameworkComponents = { agColumnHeader: "agColumnHeader" }
    this.loadingOverlayComponentParams = {
      loadingMessage: "Loading data ...",
    }
    this.noRowsOverlayComponentParams = {
      noRowsMessageFunc: () => "No data found",
    }
  },
  mounted() {
    const query = this.$route.query
    if (query && query.search) {
      this.searchKey = query.search
    }
    this.$store.commit(
      "agFilter/setCurrentTable",
      "ColumnFiltersWithSidebarSingle",
    )
  },
  beforeDestroy() {
    this.$store.commit("agFilter/setCustomFilter", {})
    this.$store.commit("agFilter/setCurrentTable", "")
  },
  data() {
    var filterParams = {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue
        if (dateAsString == null) return -1
        var dateParts = dateAsString.split("/")
        var cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1
        }
      },
      browserDatePicker: true,
    }
    return {
      isNodata: false,
      paginationPageSize: 15,
      currentPagination: {
        current_page: 1,
        per_page: 15,
        total_pages: 1,
      },
      showEditPopup: false,
      showCreatePopup: false,
      columnDefs: [
        {
          field: "id",
          maxWidth: 100,
          headerName: "ID",
          filter: false,
          cellStyle: { cursor: "pointer" },
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
            // custom filter. DOC : https://www.ag-grid.com/vue-data-grid/filter-text/
            debounceMs: 1000,
            buttons: ["reset", "clear"],
          },
        },
        {
          field: "code",
          maxWidth: 200,
          headerName: "Airport Code",
          filter: false,
          cellStyle: { cursor: "pointer" },
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
            // custom filter. DOC : https://www.ag-grid.com/vue-data-grid/filter-text/
            debounceMs: 1000,
            buttons: ["reset", "clear"],
          },
        },
        {
          field: "name",
          filter: false,
          // filter: "agSetColumnFilter",

          // icons: "fa-bars",
          headerName: "Airport Name",
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
          },
        },
        {
          field: "country.name",
          filter: false,
          // icons: "fa-bars",
          // maxWidth: "auto",
          headerName: "Country",
          filterParams: {
            filterChangedCallback: this.filterChangedCallback,
          },
        },

        {
          field: "is_active",
          filter: false,
          maxWidth: 150,
          // maxWidth: "auto",
          headerName: "Status",
          cellRendererFramework: "SegmentStatus",
          filterParams: {
            ...filterParams,
            filterChangedCallback: this.filterChangedCallback,
          },
        },
        {
          field: "action",
          filter: false,
          maxWidth: 100,
          headerName: "Action",
          valueFormatter: (params) => {
            return params.value || "ayo"
          },
          cellRendererFramework: "UserActions",
          cellRendererParams: () => {
            return {
              openDetailDataDialog: this.openDetailDataDialog,
              openEditDataDialog: this.openEditDataDialog,
            }
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      gridFilterApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: false,
        suppressMenuHide: true,
        menuTabs: ["filterMenuTab"],
      },
      rowData: null,
      toggleDialog: false,
      editData: {},
      lockDownFilterApi: false, // use to lock api callback when debug
      frameworkComponents: null,
      loadingOverlayComponentFramework: "customLoadingOverlay",
      loadingOverlayComponentParams: null,
      noRowsOverlayComponentFramework: "customNoRowsOverlay",
      noRowsOverlayComponentParams: null,
      sideBar: null,
      showDeletePopup: false,
      loadingDelete: false,
      customSpecialList: ["status"],
      selectedToDelete: {},
      selectedToEdit: {},
      searchKey: "",
      refKeySearch: 0,
      loadingEdit: false,
      loadingCreate: false,
    }
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
    }),
    isToolPanelShow() {
      return this.gridApi ? this.gridApi.isToolPanelShowing() : false
    },
    deleteConfirmContent() {
      return `Delete contact <b>${
        this.selectedToDelete ? this.selectedToDelete.full_name : ""
      }</b> from the list?`
    },
  },
  watch: {
    searchKey() {
      if (!this.gridApi) {
        return
      }
      if (this.refSearch) {
        clearTimeout(this.refSearch)
      }
      this.refSearch = setTimeout(() => {
        this.filterChangedCallback()
      }, 700)
    },
  },
  methods: {
    openCreateUserDialog() {
      console.log("clicked")
    },
    openDetailDataDialog() {
      console.log("clicked")
    },
    openEditDataDialog(val) {
      this.showEditPopup = true
      this.selectedToEdit = { ...val }
    },
    openCreateDataDialog() {
      this.showCreatePopup = true
    },
    onEdit() {
      console.log("create clicked")
    },
    // onRowSelected(event) {
    //   window.alert(
    //     "row " + event.node.data.id + " selected = " + event.node.isSelected(),
    //   )
    // },
    triggerFilter() {
      if (this.gridApi.isToolPanelShowing()) {
        this.gridApi.closeToolPanel()
      } else {
        this.gridApi.openToolPanel("filters")
      }
    },
    removeClicked(_val) {
      this.selectedToDelete = { ..._val }
      this.showDeletePopup = true
      // console.log(_val, "removeClicked fired in parent component")
    },
    async setFav(_val) {
      let res
      if (!_val.favorite) {
        res = await api.airport.setFav(_val.id)
      } else {
        res = await api.airport.unFav(_val.id)
      }
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit(
            "toast/getSuccess",
            "Set favourite segment success",
          )

          this.filterChangedCallback()
          return
        }
        const msg =
          "Failed when set favourite: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when set favourite: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    onCancelDelete() {
      this.selectedToDelete = {}

      this.showDeletePopup = false
    },
    async onConfirmDelete() {
      this.loadingDelete = true
      const res = await api.airport.delete(this.selectedToDelete.id)
      if (!res) {
        return null
      }
      this.loadingDelete = false
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Remove contact success")
          this.onCancelDelete()
          this.filterChangedCallback()
          return
        }
        const msg =
          "Failed when remove contact: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when remove contact: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    async onConfirmEdit(data) {
      this.loadingEdit = true
      const res = await api.airport.update(this.selectedToEdit.id, data)
      this.loadingEdit = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Successfully Updated")
          // this.form = res.data.data.contact
          this.$store.dispatch("others/getListAirport")
          this.onCancelEdit()
          this.filterChangedCallback()
          return
        }
        const msg =
          "Failed when update airport: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when update airport: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
    },
    detailClicked(_val) {
      this.$router.push(`/segments/${_val.id}`)
      // this.selectedToEdit = { ..._val }
      // this.showEditPopup = true
      // console.log(_val, "editClicked fired in parent component")
    },
    onCancelEdit() {
      this.selectedToEdit = {}

      this.showEditPopup = false
    },
    onCancelCreate() {
      this.showCreatePopup = false
    },
    closeEdit() {
      this.toggleDialog = false
    },
    cellClicked(event) {
      if (event.data.id === event.value) {
        // window.alert(`Cột ID: {event.value}`);
        console.log(event.data)
        // const query = { ...this.$route.query }
        // this.$router.replace({
        //   query: {
        //     ...query,
        //     contactId: event.data.id,
        //   },
        // })
        // this.onShowDetailContact()
      }
    },
    showNoRowsOverlay() {
      this.gridApi.showNoRowsOverlay()
    },
    showLoadingOverlay() {
      this.gridApi.showLoadingOverlay()
    },
    hideLoadingOverlay() {
      this.gridApi.hideOverlay()
    },
    // eslint-disable-next-line no-unused-vars
    expandFilterGroup(_groups = []) {
      console.log(this.gridApi.getToolPanelInstance("filters"))
      // this.gridApi.getToolPanelInstance("filters").expandFilters(_groups)
    },
    customfilterValueGetter(params, m, a) {
      console.log(params, m, a)
      // if (params.data) {
      //   return this.objCategoryEditor[params.data.IsSubcategoryText]
      // }
    },
    bracketsFormatter() {
      var url =
        "data:image/jpeg;base64,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"
      var flagImage =
        '<img style="cursor: pointer" border="0" width="15" height="10" src="' +
        url +
        '">'
      const eDivEdit = document.createElement("div")
      eDivEdit.innerHTML =
        '<span class="my-css-class"><button class="btn-edit">Sửa</button></span>'
      const eButtonEdit = eDivEdit.querySelector(".btn-edit")

      const eDivDelete = document.createElement("div")
      eDivDelete.innerHTML =
        '<span class="my-css-class"><button class="btn-delete">Xóa</button></span>'
      const eButtonDelete = eDivDelete.querySelector(".btn-delete")

      eButtonEdit.addEventListener("click", () => {
        console.log("edited")
      })
      eButtonDelete.addEventListener("click", () => {
        console.log("deleted")
      })
      return flagImage + eDivEdit.innerHTML + eDivDelete.innerHTML
    },
    async filterChangedCallback(modelObj = null) {
      this.showLoadingOverlay()
      let model = this.gridApi.getFilterModel()
      if (modelObj) {
        model = {
          ...model,
          ...this.customFilters,
          ...modelObj,
        }
      }
      // check status custom phase
      if (model.status && !model.status.filter) {
        delete model.status
      }
      if (model.status_single && !model.status_single.filter) {
        delete model.status_single
      }
      let filterApplied = this.parseFilterToParams(model)
      const localQuery = {
        search: this.searchKey,
      }
      const localQueryString = new URLSearchParams(localQuery)
      if (filterApplied) {
        filterApplied += `&${localQueryString}`
      } else {
        filterApplied += `${localQueryString}`
      }

      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: 1,
      }
      this.$router
        .replace(`/config-airport?${filterApplied}`)
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      const queries = this.$route.query
      const queriesComputed = { ...queries }
      this.customSpecialList.forEach((o) => {
        const tainted = Object.hasOwnProperty.call(
          queries,
          `filterModel[${o}][filter]`,
        )
        if (
          queriesComputed[`filterModel[status_single][filterType]`] ===
            "single-choices" &&
          (!tainted || tainted)
        ) {
          const arrFromFilter = queriesComputed[
            `filterModel[status_single][filter]`
          ]
            ? queriesComputed[`filterModel[status_single][filter]`]
            : []
          queriesComputed[`filterModel[status_single][filter][0]`] =
            arrFromFilter
        }
        if (
          queriesComputed[`filterModel[${o}][filterType]`] ===
            "multiple-choices" &&
          tainted
        ) {
          const arrFromFilter = queriesComputed[`filterModel[${o}][filter]`]
            ? queriesComputed[`filterModel[${o}][filter]`].split(",")
            : []
          arrFromFilter.forEach((j, idx) => {
            queriesComputed[`filterModel[${o}][filter][${idx}]`] = j
          })
        }
      })
      if (!this.lockDownFilterApi) {
        const _this = this
        const updateData = (data, pagination) => {
          const _pagination = pagination
          this.currentPagination = { ..._pagination }
          if (data && Array.isArray(data)) {
            this.paginationPageSize = data.length
          }
          let dataSource = {
            getRows: function (params) {
              setTimeout(function () {
                params.successCallback(
                  data,
                  pagination ? pagination.total : data.length,
                )
                _this.hideLoadingOverlay()
              }, 100)
            },
          }
          this.gridApi.setDatasource(dataSource)
          this.syncFilter()
        }
        const query = {
          ...this.handleRemoveUnusedQuery(queriesComputed),
          ...paginationQuery,
          search: this.searchKey,
        }
        const res = await api.airport.getListData(query)
        if (!res) {
          return null
        }
        try {
          if (res.status > 199 && res.status < 399) {
            const datas = res.data.data.airports.map((o) => {
              return this.parseDataObj(o)
            })
            // updateData(datas, res.data.data.meta.pagination)
            updateData(datas, null)
            if (!datas.length) {
              setTimeout(function () {
                _this.showNoRowsOverlay()
              }, 120)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async paginationChagedCallback() {
      this.showLoadingOverlay()
      const prevQuery = this.$route.query
      const model = this.gridApi.getFilterModel()
      const filterApplied = this.parseFilterToParams(model)
      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: this.currentPagination.current_page,
      }
      this.$router
        .replace({
          path: `/config-airport`,
          query: {
            ...prevQuery,
            ...filterApplied,
            ...paginationQuery,
          },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      if (!this.lockDownFilterApi) {
        const _this = this
        const updateData = (data, pagination) => {
          if (data && Array.isArray(data)) {
            this.paginationPageSize = data.length
          }
          const _pagination = pagination
          this.currentPagination = { ..._pagination }
          let dataSource = {
            getRows: function (params) {
              setTimeout(function () {
                params.successCallback(
                  data,
                  pagination ? pagination.total : data.length,
                )
                _this.hideLoadingOverlay()
              }, 100)
            },
          }
          this.gridApi.setDatasource(dataSource)
          this.syncFilter()
        }
        const query = {
          search: this.searchKey,
          ...prevQuery,
          ...filterApplied,
          ...paginationQuery,
        }
        const res = await api.airport.getListData(query)
        if (!res) {
          return null
        }
        try {
          if (res.status > 199 && res.status < 399) {
            const datas = res.data.data.airports.map((o) => {
              return this.parseDataObj(o)
            })
            // updateData(datas, res.data.data.meta.pagination)
            updateData(datas, null)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getListApproval(query = {}) {
      const res = await api.airport.getListData(query)
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          return res.data.data.airports
        }
      } catch (error) {
        console.log(error)
      }
    },
    syncFilter() {
      const queries = this.$route.query
      const queryParse = { ...this.parseQueryToFilter(queries) }
      const listQueryKeys = Object.keys(queryParse)
      for (const key in queryParse) {
        if (Object.hasOwnProperty.call(queryParse, key)) {
          if (
            queryParse[key].filterType &&
            queryParse[key].filterType === "set"
          ) {
            queryParse[key].values = queryParse[key].values.split(",")
          }
        }
      }
      const customFilters = {}
      if (queryParse.status_single || queryParse.status) {
        customFilters.status_single = {
          ...queryParse.status_single,
        }
        customFilters.status = {
          ...queryParse.status,
        }
      }
      if (Object.keys(customFilters).length) {
        this.$store.commit("agFilter/setCustomFilter", customFilters)
      }
      this.gridApi.setFilterModel(queryParse)
      this.expandFilterGroup(listQueryKeys)
    },
    async onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi

      this.gridApi.closeToolPanel()
      this.hideLoadingOverlay()
      this.showLoadingOverlay()
      // setting filter from route query
      // this.syncFilter()
      // end setting filter
      const _this = this
      const updateData = (data, pagination) => {
        if (data && Array.isArray(data)) {
          this.paginationPageSize = data.length
        }

        const _pagination = pagination
        this.currentPagination = { ..._pagination }
        let dataSource = {
          getRows: function (params) {
            setTimeout(function () {
              if (!data.length) {
                _this.showNoRowsOverlay()
              } else {
                _this.hideLoadingOverlay()
              }

              params.successCallback(
                data,
                pagination ? pagination.total : data.length,
              )
            }, 100)
          },
        }
        params.api.setDatasource(dataSource)
        this.syncFilter()
      }

      const queries = this.$route.query
      const paginationQuery = {
        size: this.currentPagination.per_page,
        page: this.currentPagination.current_page,
      }
      if (queries.size) {
        paginationQuery.size = queries.size
        this.paginationPageSize = queries.size
      }
      if (queries.page) {
        paginationQuery.page = queries.page
      }

      this.currentPagination = { ...this.currentPagination, ...paginationQuery }
      const query = {
        ...queries,
        ...paginationQuery,
      }
      const queriesComputed = { ...query, search: this.searchKey }
      this.customSpecialList.forEach((o) => {
        const tainted = Object.hasOwnProperty.call(
          queries,
          `filterModel[${o}][filter]`,
        )
        if (
          queriesComputed[`filterModel[status_single][filterType]`] ===
            "single-choices" &&
          (!tainted || tainted)
        ) {
          const arrFromFilter = queriesComputed[
            `filterModel[status_single][filter]`
          ]
            ? queriesComputed[`filterModel[status_single][filter]`]
            : []
          queriesComputed[`filterModel[status_single][filter][0]`] =
            arrFromFilter
        }
        if (
          queriesComputed[`filterModel[${o}][filterType]`] ===
            "multiple-choices" &&
          tainted
        ) {
          const arrFromFilter = queriesComputed[`filterModel[${o}][filter]`]
            ? queriesComputed[`filterModel[${o}][filter]`].split(",")
            : []
          arrFromFilter.forEach((j, idx) => {
            queriesComputed[`filterModel[${o}][filter][${idx}]`] = j
          })
        }
      })
      this.$router
        .replace({
          path: `/config-airport`,
          query: {
            ...queries,
            ...paginationQuery,
          },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            return null
          }
        })
      const res = await api.airport.getListData(
        this.handleRemoveUnusedQuery(queriesComputed),
      )
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          const datas = res.data.data.airports.map((o) => {
            return this.parseDataObj(o)
          })
          // updateData(datas, res.data.data.meta.pagination)
          updateData(datas, null)
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleChangePage(_val) {
      this.currentPagination = {
        ...this.currentPagination,
        current_page: _val,
        page: _val,
      }

      this.paginationChagedCallback()
    },
    handleChangePerPage(_val) {
      this.paginationPageSize = _val
      this.currentPagination = {
        ...this.currentPagination,
        per_page: _val,
        current_page: 1,
        page: 1,
      }

      this.paginationChagedCallback()
    },
    handleRemoveUnusedQuery(_model) {
      if (!_model) {
        return {}
      }
      const model = { ..._model }
      const keyArray = Object.keys(_model)
      if (keyArray.includes("filterModel[status][filter]")) {
        delete model["filterModel[status][filter]"]
      }
      if (keyArray.includes("filterModel[status_single][filter]")) {
        delete model["filterModel[status_single][filter]"]
      }
      return model
    },

    parseDataObj(obj) {
      return {
        ...obj,
        // emails_computed: obj.emails.join(", "),
        gender_computed: this.parseGender(obj.gender),
        companies_computed: this.mergeStringFromField(obj.companies, "name"),
        phones_computed:
          obj.phones && obj.phones.length ? obj.phones[0].number : "",
      }
    },

    async createData(body) {
      this.loadingCreate = true

      const res = await api.airport.create(body)
      this.loadingCreate = false
      if (!res) {
        return null
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.$store.commit("toast/getSuccess", "Create airport success")
          this.$store.dispatch("others/getListAirport")
          this.filterChangedCallback()
          this.onCancelCreate()
          this.selectedData = {}
          return
        }
        const msg =
          "Failed when create airport: " +
          (res.data.message || String(res) || " Try again")
        this.$store.commit("toast/getError", msg)
      } catch (error) {
        const msg =
          "Failed when create airport: " + error.message ||
          error.data.message ||
          String(error) ||
          " Try again"
        this.$store.commit("toast/getError", msg)
      }
      // this.onConfirm(body)
    },
  },
}
</script>

<style lang="scss" scoped>
.airport-tab {
  border: 1px solid #cfd4d8;
  padding-bottom: 0px;
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
    padding-bottom: 0;
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
.btn-add-new-segment {
  letter-spacing: 0px;
  color: #0a71bc;
  line-height: 40px;
  padding: 12px 16px;
  font-weight: 500;
}
.on-dropdown-search {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #f8f8fa;
  input {
    width: 100%;
    padding-left: 12px;
  }
}
.btn-apply {
  background: #f8f8fa 0% 0% no-repeat padding-box;
  padding: 4px 16px;
}
.list-segment {
  height: 200px;
  padding: 14px 16px;
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
.add-contact-selection {
  white-space: nowrap;
  color: #000;
  font-weight: bold;
  padding: 9px 16px;
  margin: 0 !important;
}
.on-fav {
  filter: sepia(0.5);
}
</style>
