import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CONTACT",
  };
};

// SAVE CONTACT
export const saveContactInit = () => {
  return {
    type: "SAVE_CONTACT_INIT",
  };
};

export const saveContact = (contact) => {
  return function (dispatch, getState) {
    dispatch(saveContactStart());
    axios
      .post(`contacts`, contact)
      .then((response) => {
        const result = response.data;
        dispatch(saveContactSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(saveContactError(error.response.data.error.message));
        } else {
          dispatch(saveContactError(error.message));
        }
      });
  };
};

export const saveContactStart = () => {
  return {
    type: "SAVE_CONTACT_START",
  };
};

export const saveContactSuccess = (result) => {
  return {
    type: "SAVE_CONTACT_SUCCESS",
    contact: result,
  };
};

export const saveContactError = (error) => {
  return {
    type: "SAVE_CONTACT_ERROR",
    error,
  };
};

// LOAD CONTACT

export const loadContact = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadContactStart());
    axios
      .get("contacts?" + query)
      .then((response) => {
        const loadContact = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadContactSuccess(loadContact));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(loadContactError(error.message));
      });
  };
};

export const loadContactStart = () => {
  return {
    type: "LOAD_CONTACT_START",
  };
};

export const loadContactSuccess = (loadContact, pagination) => {
  return {
    type: "LOAD_CONTACT_SUCCESS",
    loadContact,
    pagination,
  };
};

export const loadContactError = (error) => {
  return {
    type: "LOAD_CONTACT_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultContact = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("contacts/delete", { params: { id: ids } })
      .then((response) => {
        const deleteContact = response.data.data;
        dispatch(deleteContactSuccess(deleteContact));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteContactError(error.response.data.error.message));
        } else {
          dispatch(deleteContactError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CONTACT_START",
  };
};

export const deleteContactSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CONTACT_SUCCESS",
    deleteContact: deleteData,
  };
};

export const deleteContactError = (error) => {
  return {
    type: "DELETE_MULT_CONTACT_ERROR",
    error,
  };
};

// GET CONTACT

export const getInit = () => {
  return {
    type: "GET_CONTACT_INIT",
  };
};

export const getContact = (id) => {
  return function (dispatch, getState) {
    dispatch(getContactStart());
    axios
      .get("contacts/" + id)
      .then((response) => {
        const contact = response.data.data;
        dispatch(getContactSuccess(contact));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getContactError(error.response.data.error.message));
        } else {
          dispatch(getContactError(error.message));
        }
      });
  };
};

export const getContactStart = () => {
  return {
    type: "GET_CONTACT_START",
  };
};

export const getContactSuccess = (contact) => {
  return {
    type: "GET_CONTACT_SUCCESS",
    singleContact: contact,
  };
};

export const getContactError = (error) => {
  return {
    type: "GET_CONTACT_ERROR",
    error,
  };
};

//UPDATE CONTACT

export const updateContact = (id, data) => {
  return function (dispatch) {
    dispatch(updateContactStart());
    axios
      .put(`contacts/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateContactSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        // if (error.response.status) {
        //   dispatch(updateContactError(error.response.data.error.message));
        // } else {
        dispatch(updateContactError(err.message));
        // }
      });
  };
};

export const updateContactStart = () => {
  return {
    type: "UPDATE_CONTACT_START",
  };
};

export const updateContactSuccess = (result) => {
  return {
    type: "UPDATE_CONTACT_SUCCESS",
    updateContact: result,
  };
};

export const updateContactError = (error) => {
  return {
    type: "UPDATE_CONTACT_ERROR",
    error,
  };
};
