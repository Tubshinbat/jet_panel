import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_TOPLINK",
  };
};

// SAVE TOPLINKS

export const saveTopLink = (data) => {
  return function (dispatch, getState) {
    dispatch(saveTopLinkStart());
    axios
      .post(`toplinks`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveTopLinkSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(saveTopLinkError(error.response.data.error.message));
        } else {
          dispatch(saveTopLinkError(error.message));
        }
      });
  };
};

export const saveTopLinkStart = () => {
  return {
    type: "SAVE_TOPLINK_START",
  };
};

export const saveTopLinkSuccess = (result) => {
  return {
    type: "SAVE_TOPLINK_SUCCESS",
    toplink: result,
  };
};

export const saveTopLinkError = (error) => {
  return {
    type: "SAVE_TOPLINK_ERROR",
    error,
  };
};

// LOAD TOPLINKS

export const loadTopLink = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadTopLinkStart());
    axios
      .get("toplinks?" + query)
      .then((response) => {
        const loadTopLink = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadTopLinkSuccess(loadTopLink));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadTopLinkError(error.message));
      });
  };
};

export const loadTopLinkStart = () => {
  return {
    type: "LOAD_TOPLINK_START",
  };
};

export const loadTopLinkSuccess = (topLinks, pagination) => {
  return {
    type: "LOAD_TOPLINK_SUCCESS",
    topLinks,
    pagination,
  };
};

export const loadTopLinkError = (error) => {
  return {
    type: "LOAD_TOPLINK_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultTopLink = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("toplinks/delete", { params: { id: ids } })
      .then((response) => {
        const deleteTopLinks = response.data.data;
        dispatch(deleteTopLinkSuccess(deleteTopLinks));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(deleteTopLinkError(error.message));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_TOPLINK_START",
  };
};

export const deleteTopLinkSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_TOPLINK_SUCCESS",
    deleteTopLinks: deleteData,
  };
};

export const deleteTopLinkError = (error) => {
  return {
    type: "DELETE_MULT_TOPLINK_ERROR",
    error,
  };
};

// GET TOPLINKS

export const getTopLink = (id) => {
  return function (dispatch, getState) {
    dispatch(getTopLinkStart());
    axios
      .get("toplinks/" + id)
      .then((response) => {
        const data = response.data.data;
        dispatch(getTopLinkSuccess(data));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(getTopLinkError(error.message));
      });
  };
};

export const getTopLinkStart = () => {
  return {
    type: "GET_TOPLINK_START",
  };
};

export const getTopLinkSuccess = (toplink) => {
  return {
    type: "GET_TOPLINK_SUCCESS",
    toplink,
  };
};

export const getTopLinkError = (error) => {
  return {
    type: "GET_TOPLINK_ERROR",
    error,
  };
};

//UPDATE TOPLINKS

export const updateTopLink = (id, data) => {
  return function (dispatch) {
    dispatch(updateTopLinkStart());
    axios
      .put(`toplinks/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateTopLinkSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(updateTopLinkError(err.message));
      });
  };
};

export const updateTopLinkStart = () => {
  return {
    type: "UPDATE_TOPLINK_START",
  };
};

export const updateTopLinkSuccess = (result) => {
  return {
    type: "UPDATE_TOPLINK_SUCCESS",
    updateTopLink: result,
  };
};

export const updateTopLinkError = (error) => {
  return {
    type: "UPDATE_TOPLINK_ERROR",
    error,
  };
};
