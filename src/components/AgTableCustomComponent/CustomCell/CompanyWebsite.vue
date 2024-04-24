<template>
  <div class="d-flex align-items-center h-100">
    <button
      @click="detailClicked(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <a
        v-show="params.value"
        :href="params.value"
        target="_blank"
        class="external-link"
      >
        <img
          src="@/assets/imgs/icons/bx-link-external.svg"
          alt=""
          height="14px"
        />
        Website
      </a>
    </button>
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

<style>
.external-link {
  color: #0a71bc;
  font-size: 14px;
}
</style>
