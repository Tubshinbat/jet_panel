import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_FASTLINK",
  };
};

// SAVE FASTLINK

export const saveFastLink = (data) => {
  return function (dispatch, getState) {
    dispatch(saveFastLinkStart());
    axios
      .post(`fastlinks`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(saveFastLinkSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(saveFastLinkError(error.response.data.error.message));
        } else {
          dispatch(saveFastLinkError(error.message));
        }
      });
  };
};

export const saveFastLinkStart = () => {
  return {
    type: "SAVE_FASTLINK_START",
  };
};

export const saveFastLinkSuccess = (result) => {
  return {
    type: "SAVE_FASTLINK_SUCCESS",
    fastlink: result,
  };
};

export const saveFastLinkError = (error) => {
  return {
    type: "SAVE_FASTLINK_ERROR",
    error,
  };
};

// LOAD FASTLINKS

export const loadFastLink = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadFastLinkStart());
    axios
      .get("fastlinks?" + query)
      .then((response) => {
        const loadFastLink = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadFastLinkSuccess(loadFastLink));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadFastLinkError(error.message));
      });
  };
};

export const loadFastLinkStart = () => {
  return {
    type: "LOAD_FASTLINK_START",
  };
};

export const loadFastLinkSuccess = (fastLinks, pagination) => {
  return {
    type: "LOAD_FASTLINK_SUCCESS",
    fastLinks,
    pagination,
  };
};

export const loadFastLinkError = (error) => {
  return {
    type: "LOAD_FASTLINK_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultFastLink = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("fastlinks/delete", { params: { id: ids } })
      .then((response) => {
        const deleteFastLinks = response.data.data;
        dispatch(deleteFastLinkSuccess(deleteFastLinks));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(deleteFastLinkError(error.message));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_FASTLINK_START",
  };
};

export const deleteFastLinkSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_FASTLINK_SUCCESS",
    deleteFastLinks: deleteData,
  };
};

export const deleteFastLinkError = (error) => {
  return {
    type: "DELETE_MULT_FASTLINK_ERROR",
    error,
  };
};

// GET FASTLINKS

export const getFastLink = (id) => {
  return function (dispatch, getState) {
    dispatch(getFastLinkStart());
    axios
      .get("fastlinks/" + id)
      .then((response) => {
        const fastlink = response.data.data;
        dispatch(getFastLinkSuccess(fastlink));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(getFastLinkError(error.message));
      });
  };
};

export const getFastLinkStart = () => {
  return {
    type: "GET_FASTLINK_START",
  };
};

export const getFastLinkSuccess = (fastLink) => {
  return {
    type: "GET_FASTLINK_SUCCESS",
    fastLink,
  };
};

export const getFastLinkError = (error) => {
  return {
    type: "GET_FASTLINK_ERROR",
    error,
  };
};

//UPDATE FASTLINKS

export const updateFastLink = (id, data) => {
  return function (dispatch) {
    dispatch(updateFastLinkStart());
    axios
      .put(`fastlinks/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateFastLinkSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(updateFastLinkError(error.message));
      });
  };
};

export const updateFastLinkStart = () => {
  return {
    type: "UPDATE_FASTLINK_START",
  };
};

export const updateFastLinkSuccess = (result) => {
  return {
    type: "UPDATE_FASTLINK_SUCCESS",
    updateFastLink: result,
  };
};

export const updateFastLinkError = (error) => {
  return {
    type: "UPDATE_FASTLINK_ERROR",
    error,
  };
};
