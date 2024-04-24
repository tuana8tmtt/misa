const roleRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/calendar`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListUpcoming(payload) {
      return axios
        .get(`api/upcoming-calendar`, {
          params: payload,
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
        .get(`api/calendar/${id}`, {
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
        .post(`api/calendar`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    createEvents(payload) {
      return axios
        .post(`api/events`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/calendar/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/calendar/${id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addAttachment(id, payload) {
      return axios
        .post(`api/calendar/${id}/add-attachments`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeAttachment(id, payload) {
      return axios
        .post(`api/calendar/${id}/remove-attachment`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
  }
}

export default roleRepo
