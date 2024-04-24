export default {
  methods: {
    parseDateString(date, format = "dmy", splitChar = "/") {
      if (!date || !new Date(date).getDate()) {
        return ""
      }
      const firstPart = date.split(" ")[0]
      const lastPart = date.split(" ")[1]
      const sortFirstPart = firstPart.split("-")
      switch (format) {
        case "dmy":
          return splitChar === "/"
            ? `${sortFirstPart[2]}/${sortFirstPart[1]}/${sortFirstPart[0]}`
            : `${sortFirstPart[2]}-${sortFirstPart[1]}-${sortFirstPart[0]}`
        case "hms":
          return lastPart
        case "hm dmy":
          return `${lastPart.slice(0, 5)} ${sortFirstPart[2]}-${
            sortFirstPart[1]
          }-${sortFirstPart[0]}`
        default:
          return date
      }
    },
  },
}
