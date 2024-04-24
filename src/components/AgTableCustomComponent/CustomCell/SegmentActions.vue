<template>
  <div class="d-flex align-items-center h-100">
    <button
      @click="detailClicked(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <img src="@/assets/imgs/icons/info-circle-icon.svg" alt="" />
    </button>
    <button
      @click="setFav(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <img
        v-show="params.data && params.data.favorite"
        src="@/assets/imgs/icons/star-yellow-icon.svg"
        alt=""
        width="32px"
        height="32px"
      />
      <img
        v-show="params.data && !params.data.favorite"
        src="@/assets/imgs/icons/star-icon.svg"
        alt=""
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
    detailClicked(val) {
      val.detailClicked(val.data)
    },
    setFav(val) {
      val.setFav(val.data)
    },
  },
}
</script>

<style></style>
