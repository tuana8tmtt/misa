const roleRepo = (axios) => {
  return {
    getListDataAbleSelect(payload) {
      return axios
        .get(`api/contacts/select-all`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListDataAbleSelectWithStringQuery(stringQuery, payload) {
      return axios
        .get(`api/contacts/select-all${stringQuery}`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListData(payload) {
      return axios
        .get(`api/contacts`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListDataWithStringQuery(stringQuery, payload) {
      return axios
        .get(`api/contacts${stringQuery}`, {
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
        .get(`api/contacts/${id}`, {
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
        .post(`api/contacts`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    update(id, payload) {
      return axios
        .put(`api/contacts/${id}`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .delete(`api/contacts/${id}`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListLog(id, payload) {
      return axios
        .get(`api/contacts/${id}/logs`, {
          params: { ...payload, pagination: false },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addAttachment(id, payload) {
      return axios
        .post(`api/contacts/${id}/add-attachments`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeAttachment(id, payload) {
      return axios
        .post(`api/contacts/${id}/remove-attachment`, payload)
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
