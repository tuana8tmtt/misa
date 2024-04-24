<template>
    <DefaultLayout>
        <div class="">
            <div class="bread-crumb has-btn">
                <p class="bc-page__title">Dashboard</p>

            </div>
            <div class="page-content bg-white">
                <div>
                    <p>Hello World</p>
                </div>

            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import "ag-grid-enterprise"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"

import DefaultLayout from "@/layouts/default.vue"

export default {
    name: "dashboard",
    components: {
        DefaultLayout,
    
    },
    data() {
        return {
        }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {

    },
    computed: {

    },

}
</script>

<style lang="scss">
.page-content {
    border: 1px solid #cfd4d8;
    padding-bottom: 20px;
}
</style>