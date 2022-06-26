import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_EMPLOYEE",
  };
};

// SAVE EMPLOYEE
export const saveEmployeeInit = () => {
  return {
    type: "SAVE_EMPLOYEE_INIT",
  };
};

export const saveEmployee = (employee) => {
  return function (dispatch, getState) {
    dispatch(saveEmployeeStart());
    axios
      .post(`employees`, employee)
      .then((response) => {
        const result = response.data;
        dispatch(saveEmployeeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(saveEmployeeError(error.message));
      });
  };
};

export const saveEmployeeStart = () => {
  return {
    type: "SAVE_EMPLOYEE_START",
  };
};

export const saveEmployeeSuccess = (result) => {
  return {
    type: "SAVE_EMPLOYEE_SUCCESS",
    employee: result,
  };
};

export const saveEmployeeError = (error) => {
  return {
    type: "SAVE_EMPLOYEE_ERROR",
    error,
  };
};

// LOAD EMPLOYEE

export const loadEmployee = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadEmployeeStart());
    axios
      .get("employees?" + query)
      .then((response) => {
        const loadEmployee = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadEmployeeSuccess(loadEmployee, pagination));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadEmployeeError(error.message));
      });
  };
};

export const loadEmployeeStart = () => {
  return {
    type: "LOAD_EMPLOYEE_START",
  };
};

export const loadEmployeeSuccess = (loadEmployee, pagination) => {
  return {
    type: "LOAD_EMPLOYEE_SUCCESS",
    loadEmployee,
    pagination,
  };
};

export const loadEmployeeError = (error) => {
  return {
    type: "LOAD_EMPLOYEE_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultEmployee = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("employees/delete", { params: { id: ids } })
      .then((response) => {
        const deleteEmployee = response.data.data;
        dispatch(deleteEmployeeSuccess(deleteEmployee));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteEmployeeError(error.response.data.error.message));
        } else {
          dispatch(deleteEmployeeError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_EMPLOYEE_START",
  };
};

export const deleteEmployeeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_EMPLOYEE_SUCCESS",
    deleteEmployee: deleteData,
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: "DELETE_MULT_EMPLOYEE_ERROR",
    error,
  };
};

// GET EMPLOYEE

export const getInit = () => {
  return {
    type: "GET_EMPLOYEE_INIT",
  };
};

export const getEmployee = (id) => {
  return function (dispatch, getState) {
    dispatch(getEmployeeStart());
    axios
      .get("employees/" + id)
      .then((response) => {
        const employee = response.data.data;
        dispatch(getEmployeeSuccess(employee));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(getEmployeeError(error.message));
      });
  };
};

export const getEmployeeStart = () => {
  return {
    type: "GET_EMPLOYEE_START",
  };
};

export const getEmployeeSuccess = (employee) => {
  return {
    type: "GET_EMPLOYEE_SUCCESS",
    singleEmployee: employee,
  };
};

export const getEmployeeError = (error) => {
  return {
    type: "GET_EMPLOYEE_ERROR",
    error,
  };
};

//UPDATE EMPLOYEE

export const updateEmployee = (id, data) => {
  return function (dispatch) {
    dispatch(updateEmployeeStart());
    axios
      .put(`employees/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateEmployeeSuccess(result));
      })
      .catch((err) => {
        dispatch(updateEmployeeError(err.message));
      });
  };
};

export const updateEmployeeStart = () => {
  return {
    type: "UPDATE_EMPLOYEE_START",
  };
};

export const updateEmployeeSuccess = (result) => {
  return {
    type: "UPDATE_EMPLOYEE_SUCCESS",
    updateEmployee: result,
  };
};

export const updateEmployeeError = (error) => {
  return {
    type: "UPDATE_EMPLOYEE_ERROR",
    error,
  };
};

export const getCountEmployee = () => {
  return function (dispatch) {
    dispatch(getCountEmployeeStart());

    axios
      .get(`employees/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountEmployeeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountEmployeeError(error.message));
      });
  };
};

export const getCountEmployeeStart = () => {
  return {
    type: "GET_COUNT_EMPLOYEE_START",
  };
};

export const getCountEmployeeSuccess = (result) => {
  return {
    type: "GET_COUNT_EMPLOYEE_SUCCESS",
    orderCount: result,
  };
};

export const getCountEmployeeError = (error) => {
  return {
    type: "GET_COUNT_EMPLOYEE_ERROR",
    error,
  };
};
