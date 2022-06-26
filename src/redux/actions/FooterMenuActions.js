import axios from "../../axios-base";

// LOAD FOOTER_MENUS

export const loadMenus = () => {
  return function (dispatch, getState) {
    dispatch(loadMenusStart());
    axios
      .get("footermenu")
      .then((response) => {
        const result = response.data.data.reverse();
        dispatch(loadMenusSuccess(result));
      })
      .catch((error) => {
        dispatch(loadMenusError(error));
      });
  };
};
export const loadMenusStart = () => {
  return {
    type: "LOAD_FOOTER_MENUS_START",
  };
};

export const loadMenusSuccess = (result) => {
  return {
    type: "LOAD_FOOTER_MENUS_SUCCESS",
    menus: result,
  };
};

export const loadMenusError = (error) => {
  return {
    type: "LOAD_FOOTER_MENUS_ERROR",
    error,
  };
};

export const getMenu = (newsCategoryId) => {
  return function (dispatch, getState) {
    dispatch(getMenuStart());
    axios
      .get(`footermenu/${newsCategoryId}`)
      .then((response) => {
        const loadedNewsCategory = response.data.data;
        dispatch(getMenuSuccess(loadedNewsCategory));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        if (error.response.data.error.message) {
          resError = error.response.data.error.message;
        } else if (error.message) {
          resError = error.message;
        }
        dispatch(getMenuError(resError));
      });
  };
};

export const getMenuStart = () => {
  return {
    type: "GET_FOOTER_MENU_START",
  };
};

export const getMenuSuccess = (result) => {
  return {
    type: "GET_FOOTER_MENU_SUCCESS",
    menu: result,
  };
};

export const getMenuError = (error) => {
  return {
    type: "GET_FOOTER_MENU_ERROR",
    error,
  };
};

// DELETE CATEGORY

export const deleteMenu = (categoryId) => {
  return function (dispatch, getState) {
    dispatch(deleteMenuStart());

    axios
      .delete(`footermenu/${categoryId}`)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteMenuSuccess(resultCategory));
        dispatch(loadMenus());
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(deleteMenuError(error.response.data.error.message));
        } else {
          dispatch(deleteMenuError(error.message));
        }
      });
  };
};

export const deleteMenuStart = () => {
  return {
    type: "DELETE_FOOTER_MENU_START",
  };
};

export const deleteMenuSuccess = (result) => {
  return {
    type: "DELETE_FOOTER_MENU_SUCCESS",
    dlMenu: result,
  };
};

export const deleteMenuError = (error) => {
  return {
    type: "DELETE_FOOTER_MENU_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveMenu = (category) => {
  return function (dispatch, getState) {
    dispatch(saveMenuStart());
    let data = {
      name: category.name,
      status: category.status,
      isModel: category.isModel,
      isDirect: category.isDirect,
      direct: category.direct,
    };

    if (category.parentId !== null) {
      data = {
        name: category.name,
        parentId: category.parentId,
        status: category.status,
        isModel: category.isModel,
        isDirect: category.isDirect,
        direct: category.direct,
      };
    }

    if (category.model != null || category.model != "") {
      data.model = category.model;
    }
    axios
      .post(`footermenu`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(saveMenuSuccess(resultCategory));
        dispatch(loadMenus());
        dispatch(getMenu(resultCategory._id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(saveMenuError(error.response.data.error.message));
        } else {
          dispatch(saveMenuError(error.message));
        }
      });
  };
};

export const saveMenuStart = () => {
  return {
    type: "SAVE_FOOTER_MENU_START",
  };
};

export const saveMenuSuccess = (resultCategory) => {
  return {
    type: "SAVE_FOOTER_MENU_SUCCESS",
    menu: resultCategory,
  };
};

export const saveMenuError = (error) => {
  return {
    type: "SAVE_FOOTER_MENU_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateMenu = (category, id) => {
  return function (dispatch) {
    dispatch(updateMenuStart());
    const data = {
      name: category.name,
      status: category.status,
      isModel: category.isModel,
      isDirect: category.isDirect,
      direct: category.direct,
    };
    if (category.model != null || category.model != "") {
      data.model = category.model;
    }
    axios
      .put(`footermenu/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(updateMenuSuccess(resultCategory));
        dispatch(loadMenus());
        dispatch(getMenu(id));
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch(updateMenuError(error.response.data.error.message));
        } else {
          dispatch(updateMenuError(error.message));
        }
      });
  };
};

export const updateMenuStart = () => {
  return {
    type: "UPDATE_FOOTER_MENU_START",
  };
};

export const updateMenuSuccess = (resultCategory) => {
  return {
    type: "UPDATE_FOOTER_MENU_SUCCESS",
    menu: resultCategory,
  };
};

export const updateMenuError = (error) => {
  return {
    type: "UPDATE_FOOTER_MENU_ERROR",
    error: error,
  };
};

// Count Menu
export const getCountMenu = () => {
  return function (dispatch) {
    dispatch(getCountMenuStart());

    axios
      .get(`footermenu/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountMenuSuccess(result));
      })
      .catch((error) => {
        dispatch(getCountMenuError(error));
      });
  };
};

export const getCountMenuStart = () => {
  return {
    type: "GET_COUNT_FOOTER_MENU_START",
  };
};

export const getCountMenuSuccess = (result) => {
  return {
    type: "GET_COUNT_FOOTER_MENU_SUCCESS",
    orderCount: result,
  };
};

export const getCountMenuError = (error) => {
  return {
    type: "GET_COUNT_FOOTER_MENU_ERROR",
    error,
  };
};
