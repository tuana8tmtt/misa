const dtRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/ports`, {
          params: { ...payload, pagination: false },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getDetailData(id, payload) {
      return axios
        .get(`api/ports/${id}`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    create(payload) {
      return axios
        .post(`api/ports`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/ports/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    resetPassword(id, payload) {
      return axios
        .post(`api/ports/${id}/reset-password`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/ports/${id}`)
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
