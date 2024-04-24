const emailRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/users`, {
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
        .get(`api/users/${id}`, {
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
        .post(`api/users`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/users/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    resetPassword(id, payload) {
      return axios
        .post(`api/users/${id}/reset-password`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/users/${id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default emailRepo
