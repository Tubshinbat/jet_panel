import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import {
  requiredCheck,
  minLength,
  maxLength,
  regEmail,
} from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/userActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  //USESTATE
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const init = () => {
    props.clear();
    props.removePhotos();
    setForm(() => ({}));
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(form).map((index) => {
      if (index === "avatar") {
        for (let i = 0; i < form[index].length; i++) {
          sendData.append([index], form[index][i]);
        }
      } else sendData.append(index, form[index]);
    });

    return sendData;
  };

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    console.log(props.error);
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setTimeout(() => props.history.replace("/users"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    if (props.avatar) setForm((bf) => ({ ...bf, avatar: props.avatar }));
  }, [props.avatar]);

  // HandleChange
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 1);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "email" && result === true) result = regEmail(val);
      if (name === "password" && result === true) result = minLength(val, 8);
      if (form.password !== val && name === "confirmPassword")
        result = "Давтан оруулсан нууц үг таарахгүй байна";

      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.createUser(sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  return (
    <>
      <Section>
        <MetaTags>
          <title> Хэрэглэгч нэмэх | WEBR Control Panel</title>
          <meta
            name="description"
            content="Хэрэглэгч нэмэх | WeBR control panel"
          />
          <meta
            property="og:title"
            content="Хэрэглэгч нэмэх | web control panel"
          />
        </MetaTags>
        <PageTitle name="Хэрэглэгч нэмэх" />
        <div className="row">
          {props.loading === true && <Spinner />}
          <div className="col-md-8">
            <CardBoby>
              <div className={`${css.AddForm} row`}>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Нэр </p>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Хэрэглэгчийн нэрийг оруулна уу"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span className={`litleError`}>{errors.name}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Имэйл хаяг </p>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Имэйл хаяг оруулна уу"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className={`litleError`}>{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Утасны дугаар </p>
                    <input
                      className="form-control"
                      type="number"
                      name="phone"
                      placeholder="Утасны дугаар оруулна уу"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <span className={`litleError`}>{errors.phone}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Хэрэглэгчийн эрх </p>
                    <select
                      className="form-select input-group-sm"
                      name="role"
                      onChange={handleChange}
                    >
                      <option value=""> Эрхийг сонгоно уу </option>
                      <option value="user"> Хэрэглэгч </option>
                      <option value="operator"> Оператор </option>
                      <option value="admin"> Админ </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}> Хэрэглэгчийн нууц үг </p>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Нууц үг оруулна уу"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span className={`litleError`}>{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group input-group-sm">
                    <p className={`${css.Title}`}>
                      нууц үгээ давтан оруулна уу{" "}
                    </p>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Нууц үгээ давтан оруулна уу"
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <span className={`litleError`}>
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className={css.Btns}>
                    <button
                      text=""
                      name="save"
                      onClick={addClick}
                      className={` btn-success btn-sm my-btn add-btn`}
                    >
                      <i className="fas fa-share"></i> Хадгалах{" "}
                    </button>
                    <button
                      name="dont"
                      onClick={backGo}
                      className=" btn-default btn-sm my-btn"
                    >
                      Болих
                    </button>
                  </div>
                </div>
              </div>
            </CardBoby>
          </div>
          <div className="col-md-4">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">ТОХИРГОО</h3>
              </div>
              <div className="card-body box-profile">
                <div className="form-group">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="newsActive"
                      name="status"
                      onChange={handleRadio}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="newsActive"
                    >
                      Хэрэглэгчийн хандах эрхийг нээх хаах
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="far fa-image"></i> Хэрэглэгчийн нүүр зураг
                </h3>
              </div>
              <div className="card-body box-profile">
                <div className={css.CategoryBox}>
                  <div className="card-body box-profile">
                    <div className="form-group">
                      <DropImage />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.userReducer.error,
    loading: state.userReducer.loading,
    success: state.userReducer.success,
    avatar: state.imageReducer.banner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    clear: () => dispatch(actions.clear()),
    createUser: (data) => dispatch(actions.createUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
