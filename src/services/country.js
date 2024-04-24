const dtRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/countries`, {
          params: { ...payload, pagination: false },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },

    update(id, payload) {
      return axios
        .put(`api/countries/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default dtRepo
