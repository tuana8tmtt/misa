const roleRepo = (axios) => {
    return {
      getListData(payload) {
        console.log(payload)
        return axios
          .get(`api/customer`, {
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
          .get(`api/customer/${id}`, {
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
          .post(`api/customer`, payload)
          .then((res) => {
            return res
          })
          .catch((err) => {
            return err.response
          })
      },
      update(id, payload) {
        return axios
          .put(`api/customer/${id}`, payload)
          .then((res) => {
            return res
          })
          .catch((err) => {
            return err.response
          })
      },
      delete(id) {
        return axios
          .delete(`api/customer/${id}`)
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
  