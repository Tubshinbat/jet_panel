import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_POSITION",
  };
};

// SAVE POSITION
export const savePositionInit = () => {
  return {
    type: "SAVE_POSITION_INIT",
  };
};

export const savePosition = (positions) => {
  return function (dispatch, getState) {
    dispatch(savePositionStart());
    axios
      .post(`positions`, positions)
      .then((response) => {
        const result = response.data;
        dispatch(savePositionSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(savePositionError(error.message));
      });
  };
};

export const savePositionStart = () => {
  return {
    type: "SAVE_POSITION_START",
  };
};

export const savePositionSuccess = (result) => {
  return {
    type: "SAVE_POSITION_SUCCESS",
    positions: result,
  };
};

export const savePositionError = (error) => {
  return {
    type: "SAVE_POSITION_ERROR",
    error,
  };
};

// LOAD POSITION

export const loadPosition = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadPositionStart());
    axios
      .get("positions?" + query)
      .then((response) => {
        const positions = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadPositionSuccess(positions));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadPositionError(error.message));
      });
  };
};

export const loadPositionStart = () => {
  return {
    type: "LOAD_POSITION_START",
  };
};

export const loadPositionSuccess = (positions) => {
  return {
    type: "LOAD_POSITION_SUCCESS",
    positions,
  };
};

export const loadPositionError = (error) => {
  return {
    type: "LOAD_POSITION_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

// DELETE

export const deletePosition = (id) => {
  return function (dispatch) {
    dispatch(deleteStart());
    axios
      .delete(`positions/${id}`)
      .then((response) => {
        const deletedPosition = response.data;
        dispatch(deleteSuccess(deletedPosition));
      })
      .catch((error) => {
        dispatch(deleteError(error.message));
      });
  };
};

export const deleteStart = () => {
  return {
    type: "DELETE_POSITION_START",
  };
};

export const deleteSuccess = (data) => {
  return {
    type: "DELETE_POSITION_SUCCESS",
  };
};

export const deleteError = (error) => {
  return {
    type: "DELETE_POSITION_ERROR",
    error,
  };
};

// DELETE MULT

export const deleteMultPosition = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("positions/delete", { params: { id: ids } })
      .then((response) => {
        const deletePosition = response.data.data;
        dispatch(deletePositionSuccess(deletePosition));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deletePositionError(error.response.data.error.message));
        } else {
          dispatch(deletePositionError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_POSITION_START",
  };
};

export const deletePositionSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_POSITION_SUCCESS",
    deletePosition: deleteData,
  };
};

export const deletePositionError = (error) => {
  return {
    type: "DELETE_MULT_POSITION_ERROR",
    error,
  };
};

// GET POSITION

export const getInit = () => {
  return {
    type: "GET_POSITION_INIT",
  };
};

export const getPosition = (id) => {
  return function (dispatch, getState) {
    dispatch(getPositionStart());
    axios
      .get("positions/" + id)
      .then((response) => {
        const position = response.data.data;
        dispatch(getPositionSuccess(position));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getPositionError(error.response.data.error.message));
        } else {
          dispatch(getPositionError(error.message));
        }
      });
  };
};

export const getPositionStart = () => {
  return {
    type: "GET_POSITION_START",
  };
};

export const getPositionSuccess = (position) => {
  return {
    type: "GET_POSITION_SUCCESS",
    position,
  };
};

export const getPositionError = (error) => {
  return {
    type: "GET_POSITION_ERROR",
    error,
  };
};

//UPDATE POSITION

export const updatePosition = (id, data) => {
  return function (dispatch) {
    dispatch(updatePositionStart());
    axios
      .put(`positions/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updatePositionSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updatePositionError(err.message));
      });
  };
};

export const updatePositionStart = () => {
  return {
    type: "UPDATE_POSITION_START",
  };
};

export const updatePositionSuccess = (result) => {
  return {
    type: "UPDATE_POSITION_SUCCESS",
    updatePosition: result,
  };
};

export const updatePositionError = (error) => {
  return {
    type: "UPDATE_POSITION_ERROR",
    error,
  };
};

export const getCountPosition = () => {
  return function (dispatch) {
    dispatch(getCountPositionStart());

    axios
      .get(`positions/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountPositionSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountPositionError(error));
      });
  };
};

export const getCountPositionStart = () => {
  return {
    type: "GET_COUNT_POSITION_START",
  };
};

export const getCountPositionSuccess = (result) => {
  return {
    type: "GET_COUNT_POSITION_SUCCESS",
    orderCount: result,
  };
};

export const getCountPositionError = (error) => {
  return {
    type: "GET_COUNT_POSITION_ERROR",
    error,
  };
};
