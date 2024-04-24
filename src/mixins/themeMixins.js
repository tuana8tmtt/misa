export default {
  methods: {
    returnThemeColor() {
      const currentTheme = process.env.VUE_APP_THEME
      switch (currentTheme) {
        case "TRUSTANA":
          return "#7030a0"

        default:
          return "#E04038"
      }
    },
    returnThemeColorBtnSC() {
      const currentTheme = process.env.VUE_APP_THEME
      switch (currentTheme) {
        case "TRUSTANA":
          return "#7030a0"

        default:
          return "#1F916A"
      }
    },
  },
}
