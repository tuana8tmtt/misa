<template>
  <div class="d-flex align-items-center h-100">
    <p
      v-if="params.data && params.data.is_active"
      class="mb-0 segment-status-code active"
    >
      Active
    </p>
    <p v-else class="mb-0 segment-status-code inactive">Inactive</p>
    <!-- <button
      @click="detailClicked(params)"
      class="d-flex align-items-center justify-content-center"
    >
      <img src="@/assets/imgs/icons/mail-icon.svg" alt="" />
    </button> -->
  </div>
</template>

<script>
export default {
  methods: {
    detailClicked(val) {
      val.detailClicked(val.data)
    },
    setFav(val) {
      val.setFav(val.data)
    },
  },
}
</script>

<style lang="scss">
.segment-status-code {
  color: rgba(102, 102, 102, 0.6);
  opacity: 1;
  letter-spacing: 0px;
  &.active {
    color: #0cb700;
  }
  &.inactive {
    color: #d11313;
  }
}
</style>
