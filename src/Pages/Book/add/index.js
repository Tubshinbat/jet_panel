import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/bookActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    picture: false,
    link: false,
    about: true,
  });

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      init();
      setTimeout(() => props.history.replace("/books"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, picture: props.picture }));
    checkFrom("picture", props.picture);
  }, [props.picture]);

  //CHECK FORM FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    setForm(() => ({}));
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 500));
      }

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

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(form).map((index) => {
      if (index === "picture") {
        if (form[index])
          for (let i = 0; i < form[index].length; i++) {
            sendData.append([index], form[index][i]);
          }
      } else sendData.append(index, form[index]);
    });

    return sendData;
  };

  // HANDLE CHANGE

  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const checkName = (el, name) => {
    return name === el;
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  // CLICK
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    if (allCheck() === true) {
      const sendData = convertFromdata();
      props.saveBook(sendData);
    } else {
      toastControl(
        "error",
        "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
      );
    }
  };

  return (
    <Section>
      <PageTitle name={`Номын сан (${cookies.language})`} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <div className={`${css.AddForm} row`}>
            <CardBoby>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Номны нэр оруулна уу"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Холбох холбоос </p>
                  <input
                    className="form-control"
                    type="text"
                    name="link"
                    placeholder="Номтой холбох линк"
                    onChange={handleChange}
                  />
                  {errors.link && (
                    <span className={`litleError`}>{errors.link}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Агуулга </p>
                  <textarea
                    className="form-control"
                    name="about"
                    onChange={handleChange}
                  ></textarea>
                  {errors.about && (
                    <span className={`litleError`}>{errors.about}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="save"
                    onClick={addClick}
                    className={` btn-success btn-sm my-btn add-btn`}
                  >
                    <i className="fas fa-share"></i> Хадгалах
                  </button>

                  <button
                    name="dont"
                    className=" btn-default btn-sm my-btn"
                    onClick={backGo}
                  >
                    Болих
                  </button>
                </div>
              </div>
            </CardBoby>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch  ">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="newsActive"
                    name="status"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Номны зураг
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className="card-body box-profile">
                <div className={css.CategoryBox}>
                  <div className="card-body box-profile">
                    <div className="form-group">
                      <DropImage />
                    </div>
                    {errors.picture && (
                      <span className={`litleError`}>{errors.picture}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.bookReducer.error,
    loading: state.bookReducer.loading,
    success: state.bookReducer.success,
    picture: state.imageReducer.banner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    clear: () => dispatch(actions.clear()),
    saveBook: (data) => dispatch(actions.createBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
