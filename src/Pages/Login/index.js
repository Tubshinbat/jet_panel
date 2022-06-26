import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import myBase from "../../base";
import { toastControl } from "../../lib/toasControl";
import { useCookies } from "react-cookie";
import { requiredCheck, minLength, maxLength } from "../../lib/inputRegex";
// Style
import css from "./__.module.css";
// ACtions
import * as actions from "../../redux/actions/loginActions";

const Login = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["uatoken"]);
  // init
  useEffect(() => {
    if (cookies.uatoken) {
      document.location.href = myBase.baseUrl;
    }
  }, []);

  useEffect(() => {
    if (props.token) {
      setCookie("uatoken", props.token);
    }
  }, props.token);

  useEffect(() => {
    if (cookies.uatoken && props.userId) {
      toastControl("success", "Амжилттай нэвтэрлээ");
      document.location.replace = myBase.baseUrl;
    }
  }, [props.userId]);

  // useState's

  const [form, setForm] = useState({
    email: null,
    password: null,
  });

  //handle inputs
  const handleChange = (event) => {
    let val = event.target.value;
    if (event.target.name === "email") {
      val = val.toLowerCase();
    }
    setForm((bf) => ({
      ...bf,
      [event.target.name]: val,
    }));
  };

  // Login
  const handleLogin = () => {
    if (
      requiredCheck(form.email) === true &&
      requiredCheck(form.password) === true
    ) {
      props.login(form);
    } else {
      toastControl("error", "Талбаруудыг бөглөнө үү");
    }
  };

  const handleButtonPress = (event) => {
    if (
      event.key === "Enter" ||
      event.charCode === 13 ||
      event.keyCode === 13
    ) {
      props.login(form);
    }
  };

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна

  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
    }
  }, [props.error]);

  return (
    <body className="hold-transition login-page">
      {/* {document.cookie && <Redirect to="/" />} */}
      <div className="login-box">
        <div className={`login-logo ${css.LoginLogo}`}>
          <b>jetschool.edu.mn</b>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className={`login-box-msg ${css.LoginMsg}`}>
              Контент удирдлагын систем
            </p>

            <div className={`input-group mb-3 ${css.LoginInput}`}>
              <input
                type="email"
                className="form-control"
                placeholder="Имэйл хаягаа оруулна уу"
                name="email"
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className={`input-group mb-3 ${css.LoginInput}`}>
              <input
                type="password"
                className="form-control"
                placeholder="Нууц үгээ оруулна уу"
                name="password"
                onChange={handleChange}
                onKeyPress={handleButtonPress}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  onClick={handleLogin}
                  className={`btn btn-primary btn-block ${css.LoginBtn}`}
                >
                  Нэвтрэх
                </button>
              </div>
            </div>

            <p className={`mb-1 ${css.ForgetText}`}>
              <Link to="/forget-password">Нууц үгээ мартсан?</Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </body>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.loginReducer.error,
    userId: state.loginReducer.userId,
    token: state.loginReducer.token,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    login: (data) => dispatch(actions.loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);
