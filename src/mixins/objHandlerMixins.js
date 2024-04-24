export default {
  methods: {
    removeNullistItem(_array = [], field = null, exception = []) {
      if (field) {
        const rslt = _array.filter((o) => {
          if (exception.length) {
            return !!o[field] && !exception.includes(o[field])
          }
          return !!o[field]
        })
        return rslt
      } else {
        const rslt = _array.filter((o) => {
          if (exception.length) {
            return !!o && !exception.includes(o)
          }
          return !!o
        })
        return rslt
      }
    },
    mergeStringFromField(
      _array = [],
      field,
      joinString = ", ",
      stringWhenEmpty = "",
      endString = "",
    ) {
      if (!_array || !Array.isArray(_array) || !_array.length) {
        return stringWhenEmpty
      }
      const n_array = _array.map((o) => o[field])
      const reducer = (previousValue, currentValue) =>
        `${previousValue + joinString + currentValue}`

      return n_array.reduce(reducer) + endString
    },
    mergeStringFromFlatArray(
      _array = [],
      joinString = ", ",
      stringWhenEmpty = "",
      endString = "",
    ) {
      if (!_array || !Array.isArray(_array) || !_array.length) {
        return stringWhenEmpty
      }
      const reducer = (previousValue, currentValue) =>
        `${previousValue + joinString + currentValue}`

      return _array.reduce(reducer) + endString
    },
    parseFieldFromArray(
      _array = [],
      field,
      matchValue,
      returnFirstMatch = true,
    ) {
      if (!_array || !Array.isArray(_array) || !_array.length) {
        return {}
      }
      const matchList = _array.filter((o) => o[field] === matchValue)

      return returnFirstMatch
        ? matchList && matchList.length
          ? matchList[0]
          : {}
        : matchList
    },
  },
}
