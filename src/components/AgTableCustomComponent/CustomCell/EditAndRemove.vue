<template>
  <div class="d-flex align-items-center h-100">
    <button
      @click="editClicked(params)"
      class="mr-1 d-flex align-items-center justify-content-center"
    >
      <img src="@/assets/imgs/icons/edit-data-icon.svg" alt="" />
    </button>
    <button
      @click="removeClicked(params)"
      class="d-flex align-items-center justify-content-center"
    >
      <img src="@/assets/imgs/icons/delete-data-icon.svg" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    editClicked(val) {
      val.editClicked(val.data)
      console.log("edit clicked", val)
    },
    removeClicked(val) {
      val.removeClicked(val.data)
      console.log("remove clicked", val)
    },
  },
}
</script>

<style></style>
