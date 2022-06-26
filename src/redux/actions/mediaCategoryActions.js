import axios from "../../axios-base";

export const loadMediaCategories = () => {
  return function (dispatch, getState) {
    dispatch(loadMediaCategoriesStart());
    axios
      .get("media-categories")
      .then((response) => {
        const result = response.data.data.reverse();
        dispatch(loadMediaCategoriesSuccess(result));
      })
      .catch((error) => {
        dispatch(loadMediaCategoriesError(error));
      });
  };
};
export const loadMediaCategoriesStart = () => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_START",
  };
};

export const loadMediaCategoriesSuccess = (result) => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_SUCCESS",
    categories: result,
  };
};

export const loadMediaCategoriesError = (error) => {
  return {
    type: "LOAD_MEDIA_CATEGORIES_ERROR",
    error,
  };
};

// SINGLE CATEGORY

export const loadMediaCategory = (mediaCategoryId) => {
  return function (dispatch, getState) {
    dispatch(loadMediaCategoryStart());
    axios
      .get(`media-categories/${mediaCategoryId}`)
      .then((response) => {
        const loadedMediaCategory = response.data.data;
        dispatch(loadMediaCategorySuccess(loadedMediaCategory));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.response.data.error.message) {
          resError = error.response.data.error.message;
        } else if (error.response.status) {
          resError = error.response.status;
        }
        dispatch(loadMediaCategoryError(resError));
      });
  };
};

export const loadMediaCategoryStart = () => {
  return {
    type: "LOAD_MEDIA_CATEGORY_START",
  };
};

export const loadMediaCategorySuccess = (result) => {
  return {
    type: "LOAD_MEDIA_CATEGORY_SUCCESS",
    mediaCategory: result,
  };
};

export const loadMediaCategoryError = (error) => {
  return {
    type: "LOAD_MEDIA_CATEGORY_ERROR",
    error,
  };
};

// DELETE CATEGORY

export const deleteMediaCategory = (categoryId) => {
  return function (dispatch, getState) {
    dispatch(deleteMediaCategoryStart());

    axios
      .delete(`media-categories/${categoryId}`)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
        dispatch(loadMediaCategory());
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(deleteMediaCategoryError(error.response.data.error.message));
        } else {
          dispatch(deleteMediaCategoryError(error.message));
        }
      });
  };
};

export const deleteMediaCategoryStart = () => {
  return {
    type: "DELETE_MEDIA_CATEGORY_START",
  };
};

export const deleteMediaCategorySuccess = (result) => {
  return {
    type: "DELETE_MEDIA_CATEGORY_SUCCESS",
    dlMedia: result,
  };
};

export const deleteMediaCategoryError = (error) => {
  return {
    type: "DELETE_MEDIA_CATEGORY_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveMediaCategory = (category) => {
  return function (dispatch, getState) {
    dispatch(saveMediaCategoryStart());
    let data = {
      name: category.name,
      status: category.status,
    };

    if (category.parentId !== null) {
      data = {
        name: category.name,
        parentId: category.parentId,
      };
    }

    data.language = category.language;
    data.status = category.status;

    axios
      .post(`media-categories`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(saveMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
        dispatch(loadMediaCategory(resultCategory._id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(saveMediaCategoryError(error.response.data.error.message));
        } else {
          dispatch(saveMediaCategoryError(error.message));
        }
      });
  };
};

export const saveMediaCategoryStart = () => {
  return {
    type: "SAVE_MEDIA_CATEGORY_START",
  };
};

export const saveMediaCategorySuccess = (resultCategory) => {
  return {
    type: "SAVE_MEDIA_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const saveMediaCategoryError = (error) => {
  return {
    type: "SAVE_MEDIA_CATEGORY_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateMediaCategory = (category, id) => {
  return function (dispatch) {
    dispatch(updateMediaCategoryStart());
    const data = {
      name: category.name,
    };

    axios
      .put(`media-categories/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(updateMediaCategorySuccess(resultCategory));
        dispatch(loadMediaCategories());
        dispatch(loadMediaCategory(category.id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(updateMediaCategoryError(error.response.data.error.message));
        } else {
          dispatch(updateMediaCategoryError(error.message));
        }
      });
  };
};

export const updateMediaCategoryStart = () => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_START",
  };
};

export const updateMediaCategorySuccess = (resultCategory) => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const updateMediaCategoryError = (error) => {
  return {
    type: "UPDATE_MEDIA_CATEGORY_ERROR",
    error: error,
  };
};
