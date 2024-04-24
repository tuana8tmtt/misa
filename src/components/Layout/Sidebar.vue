<template>
  <nav class="sidebar__wr">
    <!-- <p class="nav-title">MAIN MENU</p> -->
    <ul class="list-navigator pt-3">
      <!-- <li class="each-navigator pointer">
        <img
          src="@/assets/imgs/icons/reports-icon.svg"
          alt="company-icon"
          class="sidebar__icon"
        />
        Report
      </li> -->
      <li class="each-navigator pointer" :class="['dashboard', 'dashboard-detail', 'dashboard-create'].includes(routeName)
        ? 'active'
        : ''
        " @click="navigateTo('/dashboard')">
        <img src="@/assets/imgs/icons/companies-icon.svg" alt="company-icon" class="sidebar__icon" />
        Dashboard
      </li>
      <li class="each-navigator pointer" :class="['companies', 'company-detail', 'company-create'].includes(routeName)
        ? 'active'
        : ''
        " @click="navigateTo('/companies')">
        <img src="@/assets/imgs/icons/companies-icon.svg" alt="company-icon" class="sidebar__icon" />
        Companies
      </li>
      <li class="each-navigator pointer" :class="['contacts', 'contacts-create', 'contact-detail'].includes(routeName)
        ? 'active'
        : ''
        " @click="navigateTo('/contacts')">
        <img src="@/assets/imgs/icons/contact-icon.svg" alt="company-icon" class="sidebar__icon" />
        Contacts
      </li>
      <li :class="['misa'].includes(routeName) ? 'active' : ''" class="each-navigator pointer contain-expand">
        <v-expansion-panels :value="activeConfigMisa" multiple class="mb-0">
          <v-expansion-panel class="config-expand" :key="0">
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              <img src="@/assets/imgs/icons/config-menu-icon.svg" alt="company-icon" class="sidebar__icon" />
              Misa
              <img src="@/assets/imgs/icons/filled-chervon-up.svg" alt="company-icon"
                class="chervon-expand__icon ml-auto" />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <div class="each-config-route" :class="['customers', 'customers-create', 'customer-detail'].includes(
                  routeName,
                )
                  ? 'active'
                  : ''
                  " @click="navigateTo('/customers')">
                  Customers
                </div>
                <div class="each-config-route" :class="['providers', 'providers-create', 'providers-detail'].includes(
                  routeName,
                )
                  ? 'active'
                  : ''
                  " @click="navigateTo('/providers')">
                  Providers
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </li>
      <!-- <li class="each-navigator pointer" :class="['customers', 'customers-create', 'customer-detail'].includes(
        routeName,
      )
        ? 'active'
        : ''
        " @click="navigateTo('/customers')">
        <img src="@/assets/imgs/icons/contact-icon.svg" alt="company-icon" class="sidebar__icon" />
        Customers
      </li>
      <li class="each-navigator pointer" :class="['providers', 'providers-create', 'providers-detail'].includes(
        routeName,
      )
        ? 'active'
        : ''
        " @click="navigateTo('/providers')">
        <img src="@/assets/imgs/icons/contact-icon.svg" alt="company-icon" class="sidebar__icon" />
        Providers
      </li> -->
      <li class="each-navigator pointer" :class="['segments', 'segments-create', 'segments-detail'].includes(routeName)
        ? 'active'
        : ''
        " @click="navigateTo('/segments')">
        <img src="@/assets/imgs/icons/segments-icon.svg" alt="company-icon" class="sidebar__icon" />
        Segments
      </li>
      <li :class="['events'].includes(routeName) ? 'active' : ''" @click="navigateTo('/events')"
        class="each-navigator pointer">
        <img src="@/assets/imgs/icons/event-icon.svg" alt="company-icon" class="sidebar__icon" />
        Events
      </li>
      <li :class="['emails'].includes(routeName) ? 'active' : ''" @click="navigateTo('/emails')"
        class="each-navigator pointer">
        <img src="@/assets/imgs/icons/email-icon.svg" alt="company-icon" class="sidebar__icon" />
        Emails
      </li>
      <li :class="['configs'].includes(routeName) ? 'active' : ''" class="each-navigator pointer contain-expand">
        <v-expansion-panels :value="activeConfig" multiple class="mb-0">
          <v-expansion-panel class="config-expand" :key="0">
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              <img src="@/assets/imgs/icons/config-menu-icon.svg" alt="company-icon" class="sidebar__icon" />
              Configuration
              <img src="@/assets/imgs/icons/filled-chervon-up.svg" alt="company-icon"
                class="chervon-expand__icon ml-auto" />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <div class="each-config-route" :class="['config-user'].includes(routeName) ? 'active' : ''"
                  @click="navigateTo('/config-user')">
                  USER
                </div>
                <div class="each-config-route" :class="['config-country'].includes(routeName) ? 'active' : ''
                  " @click="navigateTo('/config-country')">
                  COUNTRY
                </div>
                <div class="each-config-route" :class="['config-airport'].includes(routeName) ? 'active' : ''
                  " @click="navigateTo('/config-airport')">
                  AIRPORT
                </div>
                <div class="each-config-route" :class="['config-port'].includes(routeName) ? 'active' : ''"
                  @click="navigateTo('/config-port')">
                  PORT
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </li>
    </ul>
  </nav>
</template>

<script>
import routeMixins from "@/mixins/routeMixins.js"
export default {
  mixins: [routeMixins],
  data() {
    return {
      // activeConfig: [],
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    activeConfig() {
      return [
        "config-user",
        "config-country",
        "config-airport",
        "config-port",
      ].includes(this.routeName)
        ? [0]
        : []
    },
    activeConfigMisa() {
      return [
        "customers",
        "providers",
      ].includes(this.routeName)
        ? [0]
        : []
    },
  },
}
</script>

<style lang="scss">
.sidebar__wr {
  width: 210px;
  background-color: #000;
  color: #a7a7a7;
  padding-bottom: 22px;

  .nav-title {
    padding: 22px;
    text-align: left;
    font-size: 12px;
    line-height: 15px;
  }

  .list-navigator {
    list-style: none;
    padding: 0 !important;
  }

  .each-navigator {
    font-size: 16px;
    line-height: 23px;
    padding: 15px 22px;

    &:hover {
      color: #fff;
      background-color: #e04038db;

      .sidebar__icon {
        filter: brightness(0) invert(1);
      }
    }

    &.active {
      color: #fff;
      background-color: #e04038;

      .sidebar__icon {
        filter: brightness(0) invert(1);
      }
    }
  }

  .sidebar__icon {
    width: 16px;
    height: 16px;
    margin-right: 12px;
  }
}

// THEME
.trust_ana_theme {
  .sidebar__wr {
    width: 210px;
    background-color: #7030a0;
    color: #fff;
    padding-bottom: 22px;

    .nav-title {
      padding: 22px;
      text-align: left;
      font-size: 12px;
      line-height: 15px;
    }

    .list-navigator {
      list-style: none;
      padding: 0 !important;
    }

    .v-expansion-panels {
      &::before {
        box-shadow: none !important;
      }
    }

    .config-expand {
      background-color: transparent !important;

      &::before {
        box-shadow: none !important;
      }

      &:hover {
        .v-expansion-panel-header {
          background-color: #e04038db;
        }
      }

      .v-expansion-panel-header {
        .v-expansion-panel-header__icon {
          display: none !important;
        }

        width: 100%;
        font-size: 16px !important;
        padding: 15px 12px 15px 22px !important;
        display: flex !important;
        align-items: center;
        justify-content: flex-start;
        min-height: unset !important;
        color: #fff;

        .sidebar__icon {
          flex: unset !important;
          width: 16px !important;
        }

        .chervon-expand__icon {
          flex: unset !important;
          height: 9px;
          transition: 0.2s ease;
        }

        &--active {
          background-color: #e04038db;
          color: #fff !important;

          .chervon-expand__icon {
            transform: rotateZ(180deg);
          }
        }
      }

      .v-expansion-panel-content {
        padding: 0 26px;
        font-size: 16px;
        line-height: 24px;
        color: #fff !important;

        .v-expansion-panel-content__wrap {
          cursor: pointer;
          padding: 0 22px !important;
        }

        .each-config-route {
          font-size: 16px;
          line-height: 24px;
          padding: 12px 0;

          &:hover {
            font-weight: 500;
            color: #fa482b;
          }

          &.active {
            font-weight: bold;
            color: #fa482b;
          }
        }
      }
    }

    .each-navigator {
      font-size: 16px;
      line-height: 23px;
      padding: 15px 22px;

      &.contain-expand {
        padding: 0 !important;
      }

      &:hover {
        color: #fff;
        background-color: #e04038db;

        .sidebar__icon {
          filter: brightness(0) invert(1);
        }

        .config-expand {
          .v-expansion-panel-header {
            color: #fff;
          }
        }

        &.contain-expand {
          background-color: transparent;
        }
      }

      &.active {
        color: #fff;
        background-color: #e04038;

        .sidebar__icon {
          filter: brightness(0) invert(1);
        }

        .config-expand {
          .v-expansion-panel-header {
            color: #fff;
          }
        }
      }
    }

    .sidebar__icon {
      width: 16px;
      height: 16px;
      margin-right: 12px;
    }
  }
}
</style>
