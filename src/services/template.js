const emailRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/email-templates`, {
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
        .get(`api/email-templates/${id}`, {
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
        .post(`api/email-templates`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/email-templates/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/email-templates/${id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addAttachment(id, payload) {
      return axios
        .post(`api/email-templates/${id}/add-attachments`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeAttachment(id, payload) {
      return axios
        .post(`api/email-templates/${id}/remove-attachment`, payload)
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
