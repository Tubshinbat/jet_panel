import axios from "../../axios-base";

export const saveLink = (linkData) => {
  return {
    type: "CREATE_LINK",
    linkData: linkData,
  };
};

export const editLink = (index, data) => {
  return {
    type: "EDIT_LINK",
    editIndex: index,
    editData: data,
  };
};

export const deleteLink = (id) => {
  return function(dispatch) {
    dispatch(deleteLinkStart());
    axios
      .delete(`slinks/${id}`)
      .then((response) => {
        const deleteResult = response.data.data;
        dispatch(deleteLinkSuccess(deleteResult));
        dispatch(loadLinks());
      })
      .catch((error) => {
        dispatch(deleteLinkError(error.message));
      });
  };
};

const deleteLinkStart = () => {
  return {
    type: "DELETE_LINK_START",
  };
};

const deleteLinkSuccess = (result) => {
  return {
    type: "DELETE_LINK_SUCCESS",
    deleteResult: result,
  };
};

const deleteLinkError = (error) => {
  return {
    type: "DELETE_LINK_ERROR",
    error: error,
  };
};

export const createLink = (data) => {
  return function(dispatch) {
    dispatch(createLinkStart());
    axios
      .post(`slinks`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(createLinkSuccess(result));
      })
      .catch((error) => {
        dispatch(createLinkError(error.message));
      });
  };
};

const createLinkStart = () => {
  return {
    type: "CREATE_LINK_START",
  };
};

const createLinkSuccess = (result) => {
  return {
    type: "CREATE_LINK_SUCCESS",
    resultNewLink: result,
  };
};

const createLinkError = (error) => {
  return {
    type: "CREATE_LINK_ERROR",
    error,
  };
};

export const loadLinks = () => {
  return function(dispatch) {
    dispatch(loadLinkStart());
    axios
      .get(`slinks`)
      .then((response) => {
        const result = response.data.data;
        dispatch(loadLinkSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(loadLinkError(error));
      });
  };
};

export const loadLinkStart = () => {
  return {
    type: "LOAD_LINK_START",
  };
};

export const loadLinkSuccess = (result) => {
  return {
    type: "LOAD_LINK_SUCCESS",
    resultLinks: result,
  };
};

export const loadLinkError = (error) => {
  return {
    type: "LOAD_LINK_ERROR",
    error,
  };
};

export const updateLink = (id, data) => {
  return function(dispatch) {
    dispatch(updateLinkStart());
    axios
      .put(`slinks/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateLinkSuccess(result));
        dispatch(loadLinks());
      })
      .catch((error) => {
        dispatch(updateLinkError(error));
      });
  };
};

export const updateLinkStart = () => {
  return {
    type: "UPADTE_LINK_START",
  };
};

export const updateLinkSuccess = (result) => {
  return {
    type: "UPDATE_LINK_SUCCESS",
    updateResult: result,
  };
};

export const updateLinkError = (error) => {
  return {
    type: "UPDATE_LINK_ERROR",
    error,
  };
};
