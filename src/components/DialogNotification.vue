<template>
  <v-menu
    id="menu-notifi"
    bottom
    right
    content-class="dropdown-menu menu-notifi"
    offset-y
    class="notifi-menu"
    transition="slide-y-transition"
    max-width="520"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        :color="notiPagination.total_unreceived ? '#f55a4e' : '#ffffff00'"
        overlap
        tile
        :content="
          notiPagination.total_unreceived > 9
            ? '9+'
            : notiPagination.total_unreceived
        "
        style="border-radius: 100%"
      >
        <!-- <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="handleReceived"
        >
          mdi-bell
        </v-icon> -->
        <span
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="handleReceived"
        >
          <img src="@/assets/imgs/icons/bell-icon.svg" alt="" />
        </span>
      </v-badge>
    </template>
    <v-card
      class="notifi-card"
      id="card-noti"
      v-scroll:#card-noti="logScroll"
      :height="
        listNotiComputed.length > 1 ? (listNotiComputed.length + 1) * 100 : 200
      "
      max-height="400px"
    >
      <p
        class="noti-header px-4 pt-0 font-weight-bold pb-0"
        style="height: 60px; line-height: 60px"
      >
        Notification
      </p>
      <v-list v-if="listNotiComputed.length" class="list-item p-0">
        <v-list-item
          v-for="(notification, id) in listNotiComputed"
          :key="id"
          class="v-listitem d-flex"
          :class="notification.read_at ? 'readed-noti' : 'unread-noti'"
          @click="handleClickOnNoti(notification)"
        >
          <v-list-item class="p-0">
            <v-avatar class="no-round" color="#006a9b00" size="42">
              <img
                v-if="notification.data.target === 'Email'"
                src="@/assets/imgs/icons/email-noti-icon.svg"
                alt=""
              />
              <img
                v-else
                src="@/assets/imgs/icons/default-noti-icon.svg"
                alt=""
              />
            </v-avatar>
            <v-list-item-content class="ml-2 p-0">
              <!-- <b class="title-noti">{{
                notification.data ? notification.data.title : "---"
              }}</b> -->
              <p class="text-noti">
                {{ notification.data ? notification.data.message : "---" }}
              </p>
              <p class="p-0 m-0 descript-noti">
                <!-- Lúc -->
                {{
                  notification.created_at
                    ? parseTimeToText(notification.created_at)
                    : ""
                }}
              </p>
            </v-list-item-content>
            <div v-if="!notification.read_at" class="new-noti"></div>
          </v-list-item>
        </v-list-item>
        <ThreeDots v-if="onLoadingNoti" />
      </v-list>
      <v-list v-else>
        <v-list-item class="no-noti d-flex justify-center">
          <p class="pb-5">No Notification</p>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import api from "@/services"
import ThreeDots from "@/components/Loaders/ThreeDots.vue"
import { mapState } from "vuex"
export default {
  components: { ThreeDots },
  props: [
    "handleRedirectTodo",
    "handleRedirectApproval",
    "handleRedirectTicket",
  ],
  data() {
    return {
      refNotiScroll: 0,
      CHAT_URL: process.env.VUE_APP_CHAT_URL,
    }
  },
  computed: {
    ...mapState({
      listNoti: (state) => state.others.listNoti,
      currentSizeTask: (state) => state.tasks.currentSizeTask,
      notiCounter: (state) => state.others.notiCounter,
      preventLoadmoreNoti: (state) => state.others.preventLoadmoreNoti,
      notiPagination: (state) => state.others.notiPagination,
      maxNotiCounter: (state) => state.others.maxNotiCounter || 0,
      onLoadingNoti: (state) => state.onLoadingNoti,
    }),
    listNotiComputed() {
      const arr = Array.isArray(this.listNoti) ? this.listNoti.slice() : []
      return arr
    },
  },
  created() {
    // this.getTotalNotifi();
    // this.getNotifi(this.per_page);
  },
  methods: {
    parseTimeToText(date) {
      if (!date) {
        return ""
      }
      let timeFomart = ""
      let now = new Date()
      let _date = new Date(date)
      let militiSecond = now.getTime() - _date.getTime()
      let dayTime = 1000 * 3600 * 24
      let hourTime = 1000 * 3600
      militiSecond <= hourTime
        ? (() => {
            let time = Math.round(Math.abs(militiSecond / (1000 * 60)))
            if (!time) {
              timeFomart = "Now"
            } else {
              timeFomart = time + ` ${time > 1 ? "minutes" : "minute"}  ago`
            }
          })()
        : (() => {
            militiSecond > hourTime && militiSecond <= dayTime
              ? (() => {
                  let time = Math.round(Math.abs(militiSecond / hourTime))
                  timeFomart = time + ` ${time > 1 ? "hours" : "hour"}  ago`
                })()
              : (() => {
                  let time = Math.round(Math.abs(militiSecond / dayTime))
                  timeFomart = time + ` ${time > 1 ? "days" : "day"}  ago`
                })()
          })()

      return timeFomart
    },
    logScroll(e) {
      if (this.preventLoadmoreNoti || this.notiCounter >= this.maxNotiCounter) {
        return
      }
      if (this.refNotiScroll) {
        clearTimeout(this.refNotiScroll)
      }
      this.refNotiScroll = setTimeout(() => {
        if (!e.target) {
          return
        }
        if (
          e.target.clientHeight + e.target.scrollTop + 200 >=
          e.target.scrollHeight
        ) {
          this.$store.commit("others/setNotiCounter", this.notiCounter + 10)
          this.$store.dispatch("others/getListNoti")
        }
      }, 300)
    },
    handleReceived() {
      api.noti.updateReceived()
    },
    handleRedirectDiscussion(_idTarget) {
      const url = `${this.CHAT_URL}/discussion/${_idTarget}?chatTab=discussion&per_page=15`
      window.open(url)
    },
    handleRedirectNoti(_idTarget) {
      const url = `${this.CHAT_URL}/announcement/${_idTarget}`
      window.open(url)
    },
    async handleClickOnNoti(_noti) {
      if (_noti.data && _noti.data.action) {
        if (_noti.data.event === "anniversary.alarm") {
          this.$router.push(
            `/events?d=${_noti.data.start_at}&ai=${_noti.data.id}`,
          )
        }
        if (_noti.data.target === "Email") {
          this.$router.push(`/emails?eTab=tab-1&ei=${_noti.data.id}`)
        }
        // if (_noti.data.action === "detail") {
        //   // const notiEventArray = _noti.data.event.split('.')
        //   if (String(_noti.data.target).toLowerCase() === "task") {
        //     this.handleRedirectTodo(+_noti.data.id)
        //   }
        //   if (String(_noti.data.target).toLowerCase() === "approval") {
        //     this.handleRedirectApproval(+_noti.data.id, _noti)
        //   }
        //   if (String(_noti.data.target).toLowerCase() === "ticket") {
        //     this.handleRedirectTicket(+_noti.data.id)
        //   }
        //   if (String(_noti.data.target).toLowerCase() === "discussion") {
        //     this.handleRedirectDiscussion(+_noti.data.id)
        //   }
        //   if (String(_noti.data.target).toLowerCase() === "announcement") {
        //     this.handleRedirectNoti(+_noti.data.id)
        //   }
        // }
      }
      const res = await api.noti.updateRead(_noti.id)
      if (res.status && res.status >= 200 && res.status < 400) {
        this.$store.commit("others/UPDATE_READ_NOTI", _noti)
      }
    },
    // async getNotifi(_perpage:number) {
    //   const _data = await this.$api.notifications.getNotifi(_perpage);
    //   _data.data.meta.code >= 200 && _data.data.meta.code < 400
    //     ? (() => {
    //         this.notifications = _data.data.data;
    //         this.per_page = _data.data.meta.pagination.per_page;
    //         this.totalListNotifi = _data.data.meta.pagination.total;
    //       })()
    //     : (() => {
    //         this.color = 'error';
    //         this.message = 'Có lỗi xảy ra.Vui lòng thử lại sau';
    //         this.snackbar = true;
    //       })();
    // },
    // handleRead(notifi:any) {
    // notifi.read_at
    // ? (() => {})()
    // : (() => {
    //     this.postRead(notifi.id);
    //   })();
    // },
    // async postRead(_id:any) {
    //   const _data = await this.$api.notifications.postRead(_id);
    //   _data.data.meta.code >= 200 && _data.data.meta.code < 400
    //     ? (() => {
    //         this.notifications = this.notifications.map((item) => {
    //           return item.id === _id
    //             ? {
    //                 ...item,
    //                 read_at: new Date()
    //               }
    //             : item;
    //         });
    //       })()
    //     : (() => {
    //         this.color = 'error';
    //         this.message = 'Có lỗi xảy ra.Vui lòng thử lại sau';
    //         this.snackbar = true;
    //       })();
    // }
  },
}
</script>
<style lang="scss" scoped>
.noti-header {
  font-size: 16px;
  color: #666666;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  margin-bottom: 0;
}
.notifi-card {
  width: 520px !important;
  border-radius: 8px;

  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
  &:hover::-webkit-scrollbar {
    width: 5px;
  }
  &:hover::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #cccccc;
    border-radius: 10px;
  }

  &:hover::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3d3c3d;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
  }
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #cccccc00;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3d3c3d;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
  }
  .list-item {
    background-color: #f3f7f9;
  }
  .v-listitem {
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 1px;
    overflow: hidden;
    .title-noti {
      font-size: 14px;
      color: #30373e;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
      line-height: initial;
    }
    .text-noti {
      font-size: 13px;
      color: #30373e;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
    .descript-noti {
      font-size: 12px;
      color: #8295a6;
    }
    .new-noti {
      border: 1px solid #89c3ef;
      height: 10px;
      width: 10px;
      border-radius: 20px;
      background-color: #89c3ef;
    }
    .notifi-title {
      width: calc(100% - 47px);
      .v-list__tile__title {
        word-break: normal;
        height: unset !important;
        white-space: unset !important;
        overflow: unset !important;
        line-height: unset !important;
        text-overflow: unset !important;
      }
    }
    &:hover {
      background-color: #a1c7ee3c;
    }
  }
}
.menu-notifi {
  border-radius: 8px !important;
  z-index: 99 !important;
}
</style>
<style lang="scss">
.sidebar-card-body {
  .v-badge__wrapper {
    .v-badge__badge {
      font-size: 11px !important
				;
    }
  }
}
.v-badge--tile .v-badge__badge {
  border-radius: 50% !important;
}
.readed-noti {
  background-color: #fff;
}
.unread-noti {
  background-color: #f8f8fa !important;
}
.no-round {
  border-radius: 0 !important;
}
</style>
