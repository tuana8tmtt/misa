const notiRepo = (axios) => {
  return {
    getAllNoti(_id, _params = {}) {
      return axios
        .get(`/api/notifications`, _params)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    updateRead(_id, _params = {}) {
      return axios
        .post(`/api/notifications/${_id}/read`, _params)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    updateReceived(_params = {}) {
      return axios
        .post(`api/notifications/receive`, _params)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}
export default notiRepo
