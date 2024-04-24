const roleRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/companies`, {
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
        .get(`api/companies/${id}`, {
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
        .post(`api/companies`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/companies/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/companies/${id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addContact(id, payload) {
      return axios
        .post(`api/companies/${id}/add-contacts`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addAttachment(id, payload) {
      return axios
        .post(`api/companies/${id}/add-attachments`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeAttachment(id, payload) {
      return axios
        .post(`api/companies/${id}/remove-attachment`, payload)
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
