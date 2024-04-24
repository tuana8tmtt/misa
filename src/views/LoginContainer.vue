<template>
  <div>
    <LoginTA v-if="currentTheme === 'TRUSTANA'" />
    <Login v-else />
  </div>
</template>

<script>
import Login from "./Login.vue"
import LoginTA from "./LoginTA.vue"
export default {
  components: { Login, LoginTA },
  data() {
    return {
      currentTheme: process.env.VUE_APP_THEME,
    }
  },
}
</script>

<style></style>
