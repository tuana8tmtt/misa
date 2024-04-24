const roleRepo = (axios) => {
  return {
    getListData(payload) {
      return axios
        .get(`api/segments?include=contact_count`, {
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
        .get(`api/segments/${id}?include=contact_count`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListLog(id, payload) {
      return axios
        .get(`api/segments/${id}/logs`, {
          params: { ...payload, pagination: false },
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    getListComments(id, payload) {
      return axios
        .get(`api/segments/${id}/comments`, {
          params: payload,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeContact(id, payload) {
      return axios
        .post(`api/segments/${id}/remove-contacts`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    setFav(id, payload) {
      return axios
        .post(`api/segments/${id}/favorite`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    unFav(id, payload) {
      return axios
        .post(`api/segments/${id}/unfavorite`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    postComment(id, payload) {
      return axios
        .post(`api/segments/${id}/comment`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addContact(id, payload) {
      return axios
        .post(`api/segments/${id}/add-contacts?include=contact_count`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    create(payload) {
      return axios
        .post(`api/segments?include=contact_count`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },

    update(id, payload) {
      return axios
        .put(`api/segments/${id}?include=contact_count`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    delete(id) {
      return axios
        .post(`api/segments/${id}/deactivate`)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    addAttachment(id, payload) {
      return axios
        .post(`api/segments/${id}/add-attachments`, payload)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err.response
        })
    },
    removeAttachment(id, payload) {
      return axios
        .post(`api/segments/${id}/remove-attachment`, payload)
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
