import axios from "../../axios-base";

export const loadNewsCategories = () => {
  return function (dispatch, getState) {
    dispatch(loadNewsCategoriesStart());
    axios
      .get("news-categories")
      .then((response) => {
        const result = response.data.data.reverse();
        dispatch(loadNewsCategoriesSuccess(result));
      })
      .catch((error) => {
        dispatch(loadNewsCategoriesError(error));
      });
  };
};
export const loadNewsCategoriesStart = () => {
  return {
    type: "LOAD_NEWS_CATEGORIES_START",
  };
};

export const loadNewsCategoriesSuccess = (result) => {
  return {
    type: "LOAD_NEWS_CATEGORIES_SUCCESS",
    categories: result,
  };
};

export const loadNewsCategoriesError = (error) => {
  return {
    type: "LOAD_NEWS_CATEGORIES_ERROR",
    error,
  };
};

// SINGLE CATEGORY

export const loadNewsCategory = (newsCategoryId) => {
  return function (dispatch, getState) {
    dispatch(loadNewsCategoryStart());
    axios
      .get(`news-categories/${newsCategoryId}`)
      .then((response) => {
        const loadedNewsCategory = response.data.data;
        dispatch(loadNewsCategorySuccess(loadedNewsCategory));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.response.data.error.message) {
          resError = error.response.data.error.message;
        } else if (error.response.status) {
          resError = error.response.status;
        }
        dispatch(loadNewsCategoryError(resError));
      });
  };
};

export const loadNewsCategoryStart = () => {
  return {
    type: "LOAD_NEWS_CATEGORY_START",
  };
};

export const loadNewsCategorySuccess = (result) => {
  return {
    type: "LOAD_NEWS_CATEGORY_SUCCESS",
    newsCategory: result,
  };
};

export const loadNewsCategoryError = (error) => {
  return {
    type: "LOAD_NEWS_CATEGORY_ERROR",
    error,
  };
};

// DELETE CATEGORY

export const deleteNewsCategory = (categoryId) => {
  return function (dispatch, getState) {
    dispatch(deleteNewsCategoryStart());

    axios
      .delete(`news-categories/${categoryId}`)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
        dispatch(loadNewsCategory());
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(deleteNewsCategoryError(error.response.data.error.message));
        } else {
          dispatch(deleteNewsCategoryError(error.message));
        }
      });
  };
};

export const deleteNewsCategoryStart = () => {
  return {
    type: "DELETE_NEWS_CATEGORY_START",
  };
};

export const deleteNewsCategorySuccess = (result) => {
  return {
    type: "DELETE_NEWS_CATEGORY_SUCCESS",
    dlNews: result,
  };
};

export const deleteNewsCategoryError = (error) => {
  return {
    type: "DELETE_NEWS_CATEGORY_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveNewsCategory = (category) => {
  return function (dispatch, getState) {
    dispatch(saveNewsCategoryStart());
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
      .post(`news-categories`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(saveNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
        dispatch(loadNewsCategory(resultCategory._id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(saveNewsCategoryError(error.response.data.error.message));
        } else {
          dispatch(saveNewsCategoryError(error.message));
        }
      });
  };
};

export const saveNewsCategoryStart = () => {
  return {
    type: "SAVE_NEWS_CATEGORY_START",
  };
};

export const saveNewsCategorySuccess = (resultCategory) => {
  return {
    type: "SAVE_NEWS_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const saveNewsCategoryError = (error) => {
  return {
    type: "SAVE_NEWS_CATEGORY_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateNewsCategory = (category, id) => {
  return function (dispatch) {
    dispatch(updateNewsCategoryStart());
    const data = {
      name: category.name,
    };

    axios
      .put(`news-categories/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(updateNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
        dispatch(loadNewsCategory(category.id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(updateNewsCategoryError(error.response.data.error.message));
        } else {
          dispatch(updateNewsCategoryError(error.message));
        }
      });
  };
};

export const updateNewsCategoryStart = () => {
  return {
    type: "UPDATE_NEWS_CATEGORY_START",
  };
};

export const updateNewsCategorySuccess = (resultCategory) => {
  return {
    type: "UPDATE_NEWS_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const updateNewsCategoryError = (error) => {
  return {
    type: "UPDATE_NEWS_CATEGORY_ERROR",
    error: error,
  };
};
