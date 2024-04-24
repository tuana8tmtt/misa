<template>
  <div style="display: inline-block; width: 100%">
    <div style="padding: 10px; background-color: #d3d3d3; text-align: center">
      <div class="on-dropdown-search dropdown-search__full p-0 bg-transparent">
        <img src="@/assets/imgs/icons/look-up-icon.svg" alt="" />
        <input type="text" placeholder="Search" v-model="keySearch" />
      </div>
    </div>
    <!-- multi select -->
    <div class="select-list-wr px-2">
      <div class="filter-list__content">
        <div
          v-for="(item, idx) in dataListComputed"
          :key="idx"
          class="each-filter-option"
        >
          <input
            v-model="ftValue"
            type="radio"
            :id="`item-numb-${idx}`"
            name="vehicle1"
            :value="item.id"
          />
          <label :for="`item-numb-${idx}`"> {{ item[itemText] || item }}</label>
        </div>
        <div
          v-if="!dataListComputed || !dataListComputed.length"
          class="each-filter-option"
        >
          <label> No data found</label>
        </div>
      </div>
      <div class="clear-button">
        <div @click="clearFilter" class="text">Clear</div>
      </div>
    </div>
  </div>
</template>

<script>
// filterWithSideBar_status
import { mapState } from "vuex"
import { tStr } from "validation_t/src"
export default {
  props: {},
  data() {
    return {
      year: "All",
      ftValue: null,

      itemValue: "id",
      itemText: "name",
      multiple: true,
      albleToReact: true,
      keySearch: "",
    }
  },
  watch: {
    ftValue: {
      deep: true,
      handler() {
        if (this.albleToReact) {
          this.updateFilterMulti()
        }
      },
    },
    customFilters: {
      deep: true,
      handler() {
        if (this.customFilters && this.customFilters.stage_id) {
          this.handlerSyncStoredFilter(this.customFilters.stage_id)
        }
      },
    },
  },
  computed: {
    ...mapState({
      customFilters: (state) => state.agFilter.customFilters,
      companyStages: (state) => state.others.companyStages,
    }),
    dataListComputed() {
      return this.companyStages.filter((o) => {
        try {
          const oVal = tStr.removeAscent(o.name)
          const kVal = tStr.removeAscent(this.keySearch)
          return oVal.includes(kVal)
        } catch (error) {
          return false
        }
      })
    },
  },
  mounted() {
    if (this.customFilters && this.customFilters.stage_id) {
      this.handlerSyncStoredFilter(this.customFilters.stage_id)
    } else {
      this.keySearch = ""
      this.ftValue = null
    }
  },
  methods: {
    clearFilter() {
      this.ftValue = null
      this.keySearch = ""
    },
    updateFilterMulti() {
      if (this.ftValue) {
        this.params.filterChangedCallback({
          stage_id: {
            filter: this.ftValue,
            filterType: "single-choices",
            type: "select",
          },
        })
      } else {
        this.params.filterChangedCallback({
          stage_id: {
            filter: this.ftValue,
            filterType: "single-choices",
            type: "select",
          },
        })
      }
    },
    handlerSyncStoredFilter(_filterObj) {
      if (_filterObj.filterType === "single-choices") {
        this.albleToReact = false
        this.ftValue = _filterObj.filter ? _filterObj.filter : ""
      }
      this.$nextTick(() => {
        this.albleToReact = true
      })
    },

    // this example isn't using getModel() and setModel(),
    // so safe to just leave these empty. don't do this in your code!!!
    getModel() {},

    setModel() {},
  },
}
</script>

<style lang="scss">
.select-list-wr {
  width: 100%;
  .each-filter-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 0;

    label {
      cursor: pointer;
      padding-left: 6px;
    }
  }
  .filter-list__content {
    max-height: 250px;
    padding: 6px 0;
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
}
</style>
