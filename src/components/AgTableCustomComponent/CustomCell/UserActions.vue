<template>
  <div class="d-flex align-items-center h-100">
    <!-- <button
      @click="openDetailDataDialog(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <img
        src="@/assets/imgs/icons/table-row-info-icon.svg"
        alt=""
        height="24px"
      />
    </button> -->
    <button
      @click="openEditDataDialog(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <img
        src="@/assets/imgs/icons/table-row-edit-icon.svg"
        alt=""
        height="24px"
      />
    </button>
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
    openDetailDataDialog(val) {
      val.openDetailDataDialog(val.data)
    },
    openEditDataDialog(val) {
      val.openEditDataDialog(val.data)
    },
  },
}
</script>

<style></style>
