import axios from "../../axios-base";

export const tokenCheck = (token) => {
  return function(dispatch) {
    dispatch(tokenCheckStart());
    axios
      .post("users/checktoken", "", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        const role = response.data;
        dispatch(tokenCheckSuccess(role));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        dispatch(tokenCheckError(resError));
      });
  };
};

export const tokenCheckStart = () => {
  return {
    type: "TOKEN_CHECK_START",
  };
};

export const tokenCheckError = (error) => {
  return {
    type: "TOKEN_CHECK_ERROR",
    error,
  };
};

export const tokenCheckSuccess = (data) => {
  return {
    type: "TOKEN_CHECK_SUCCESS",
    role: data.role,
    userId: data.userId,
    avatar: data.avatar,
    name: data.name,
  };
};
