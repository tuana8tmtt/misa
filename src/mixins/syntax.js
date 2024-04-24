export default {
  methods: {
    returnFieldText(obj, fieldName, replaceStr) {
      if (!obj) {
        return replaceStr
      }
      if (typeof obj === "object" && !Array.isArray(obj)) {
        const pastaObj = Object.assign(obj)
        if (Object.prototype.hasOwnProperty.call(pastaObj, fieldName)) {
          return obj[fieldName]
        }
        return replaceStr
      }
      return replaceStr
    },
  },
}
