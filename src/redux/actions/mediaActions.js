import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_MEDIA",
  };
};

// SAVE MEDIA
export const saveMediaInit = () => {
  return {
    type: "SAVE_MEDIA_INIT",
  };
};

export const saveMedia = (media) => {
  return function (dispatch, getState) {
    dispatch(saveMediaStart());
    axios
      .post(`media`, media)
      .then((response) => {
        const result = response.data;
        dispatch(saveMediaSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(saveMediaError(resError));
      });
  };
};

export const saveMediaStart = () => {
  return {
    type: "SAVE_MEDIA_START",
  };
};

export const saveMediaSuccess = (result) => {
  return {
    type: "SAVE_MEDIA_SUCCESS",
    media: result,
  };
};

export const saveMediaError = (error) => {
  return {
    type: "SAVE_MEDIA_ERROR",
    error,
  };
};

// LOAD MEDIA

export const loadMedia = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadMediaStart());
    axios
      .get("media?" + query)
      .then((response) => {
        const loadMedia = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadMediaSuccess(loadMedia));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(loadMediaError(resError));
      });
  };
};

export const loadMediaStart = () => {
  return {
    type: "LOAD_MEDIA_START",
  };
};

export const loadMediaSuccess = (loadMedia, pagination) => {
  return {
    type: "LOAD_MEDIA_SUCCESS",
    loadMedia,
    pagination,
  };
};

export const loadMediaError = (error) => {
  return {
    type: "LOAD_MEDIA_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultMedia = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("media/delete", { params: { id: ids } })
      .then((response) => {
        const deleteMedia = response.data.data;
        dispatch(deleteMediaSuccess(deleteMedia));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(deleteMediaError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_MEDIA_START",
  };
};

export const deleteMediaSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_MEDIA_SUCCESS",
    deleteMedia: deleteData,
  };
};

export const deleteMediaError = (error) => {
  return {
    type: "DELETE_MULT_MEDIA_ERROR",
    error,
  };
};

// GET MEDIA

export const getInit = () => {
  return {
    type: "GET_MEDIA_INIT",
  };
};

export const getMedia = (id) => {
  return function (dispatch, getState) {
    dispatch(getMediaStart());
    axios
      .get("media/" + id)
      .then((response) => {
        const media = response.data.data;
        dispatch(getMediaSuccess(media));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(getMediaError(resError));
      });
  };
};

export const getMediaStart = () => {
  return {
    type: "GET_MEDIA_START",
  };
};

export const getMediaSuccess = (media) => {
  return {
    type: "GET_MEDIA_SUCCESS",
    singleMedia: media,
  };
};

export const getMediaError = (error) => {
  return {
    type: "GET_MEDIA_ERROR",
    error,
  };
};

//UPDATE MEDIA

export const updateMedia = (id, data) => {
  return function (dispatch) {
    dispatch(updateMediaStart());
    axios
      .put(`media/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateMediaSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(updateMediaError(resError));
      });
  };
};

export const updateMediaStart = () => {
  return {
    type: "UPDATE_MEDIA_START",
  };
};

export const updateMediaSuccess = (result) => {
  return {
    type: "UPDATE_MEDIA_SUCCESS",
    updateMedia: result,
  };
};

export const updateMediaError = (error) => {
  return {
    type: "UPDATE_MEDIA_ERROR",
    error,
  };
};

export const getCountMedia = () => {
  return function (dispatch) {
    dispatch(getCountMediaStart());

    axios
      .get(`media/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountMediaSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountMediaError(error));
      });
  };
};

export const getCountMediaStart = () => {
  return {
    type: "GET_COUNT_MEDIA_START",
  };
};

export const getCountMediaSuccess = (result) => {
  return {
    type: "GET_COUNT_MEDIA_SUCCESS",
    orderCount: result,
  };
};

export const getCountMediaError = (error) => {
  return {
    type: "GET_COUNT_MEDIA_ERROR",
    error,
  };
};
