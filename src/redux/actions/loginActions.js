import axios from "../../axios-base";

export const loginUser = (data) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    axios
      .post("/users/login", data)
      .then((result) => {
        dispatch(loginUserSuccess(result.data));
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
        dispatch(loginUserError(resError));
      });
  };
};

export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    data,
  };
};

export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const forgetPassword = (data) => {
  return function (dispatch) {
    dispatch(forgetPasswordStart());

    axios
      .post("users/forgot-password", data)
      .then((result) => {
        dispatch(forgetPasswordSuccess(result.data));
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
        dispatch(forgetPasswordError(resError));
      });
  };
};

export const forgetPasswordStart = () => {
  return {
    type: "FORGET_PASSWORD_START",
  };
};

export const forgetPasswordSuccess = (data) => {
  return {
    type: "FORGET_PASSWORD_SUCCESS",
    data: data.resetToken,
  };
};

export const forgetPasswordError = (error) => {
  return {
    type: "FORGET_PASSWORD_ERROR",
    error,
  };
};

export const changePassword = (data) => {
  return function (dispatch) {
    dispatch(changePasswordStart());

    axios
      .post("/users/reset-password", data)
      .then((res) => {
        const user = res.data.user;
        dispatch(changePasswordSuccess(user));
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
        dispatch(changePasswordError(resError));
      });
  };
};

export const changePasswordStart = () => {
  return {
    type: "CHANGE_PASSWORD_START",
  };
};

export const changePasswordError = (error) => {
  return {
    type: "CHANGE_PASSWORD_ERROR",
    error,
  };
};

export const changePasswordSuccess = (data) => {
  return {
    type: "CHANGE_PASSWORD_SUCCESS",
    user: data,
  };
};

export const sendSms = (phoneNumber) => {
  return function (dispatch) {
    dispatch(sendSmsStart());

    axios
      .post("/users/phone", phoneNumber)
      .then((result) => {
        const rndCode = Math.floor(Math.random() * 999999) + 100000;
        axios.get(
          `http://web2sms.skytel.mn/apiSend?token=af30e213f537062b6ae8c754674951ebee43a887&sendto=${parseInt(
            phoneNumber.phoneNumber
          )}&message=Batalgaajuulah code: ${rndCode}`
        );
        const user = result.data.data;
        dispatch(sendSmsSuccess(rndCode, user));
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
        dispatch(sendSmsError(resError));
      });
  };
};

export const sendSmsStart = () => {
  return {
    type: "SEND_SMS_START",
  };
};

export const sendSmsSuccess = (code, user) => {
  return {
    type: "SEND_SMS_SUCCESS",
    code,
    user,
  };
};

export const sendSmsError = (error) => {
  return {
    type: "SEND_SMS_ERROR",
    error,
  };
};
