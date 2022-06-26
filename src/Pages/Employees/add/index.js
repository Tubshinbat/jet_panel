import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";
import { useCookies } from "react-cookie";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import TagInput from "@pymatech/react-tag-input";
import Dropzone from "../../../Components/General/Dropzone";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import {
  requiredCheck,
  minLength,
  maxLength,
  regEmail,
  onlyNumber,
  menuRequired,
} from "../../../lib/inputRegex";

// ACTIONS
import { loadPosition } from "../../../redux/actions/positionActions";
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/employeeActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    positions: false,
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
      props.saveInit();
      setTimeout(() => props.history.replace("/employees"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, picture: props.images }));
  }, [props.images]);

  // -- INIT FUNCTION
  const init = () => {
    props.loadPosition();
    props.removePhotos();
    props.saveInit();
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    let result;
    if (valueErrors.find((el) => checkName(el, name))) {
      if (name !== "email" || name !== "phoneNumber") {
        result = requiredCheck(val);
      }
      if (name === "name" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "about" && result === true) {
        result = minLength(val, 20);
      }
      if (name === "positions") {
        result = menuRequired(val);
      }

      if (name === "email" && result === true) result = regEmail(val);

      if (name === "phoneNumber" && result === true) result = onlyNumber(val);

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
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (index === "picture" || index === "positions") {
        for (let i = 0; i < formData[index].length; i++) {
          sendData.append([index], formData[index][i]);
        }
      } else sendData.append(index, formData[index]);
    });

    sendData.append("language", cookies.language || "mn");

    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const categoryCheck = (c) => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    clickedCategory === -1 ? all.push(c) : all.splice(clickedCategory, 1);
    checkFrom("positions", all);
    setChecked(all);
    setForm((beforeForm) => ({
      ...beforeForm,
      positions: all,
    }));
  };

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, about: event }));
    checkFrom("about", event);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };
  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();
    allCheck() === true
      ? props.saveEmployee(sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  //RENDER CATEGORIES
  const renderPosition = (positions) => {
    let myCategories = [];
    if (positions) {
      positions.map((el) => {
        myCategories.push(
          <li key={el._id}>
            <div>
              <input
                className={`categoryId`}
                value={el._id}
                type="checkbox"
                name="positions"
                onChange={() => categoryCheck(el._id)}
              />
              <span className={el[cookies.language] === undefined && `redText`}>
                {el[cookies.language] === undefined
                  ? (cookies.language === "mn" && el.eng.name) || el.mn.name
                  : el[cookies.language].name}
              </span>
            </div>
          </li>
        );
      });
    }
    return myCategories;
  };

  return (
    <Section>
      <MetaTags>
        <title> Ажилтан нэмэх | WEBR Control Panel</title>
        <meta name="description" content="Ажилтан нэмэх | WeBR control panel" />
        <meta property="og:title" content="Ажилтан нэмэх | web control panel" />
      </MetaTags>

      <PageTitle name={`Ажилтан нэмэх ( ${cookies.language} )`} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Овог нэр </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Овог нэрийг оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Зэрэг дэв </p>
                  <input
                    className="form-control"
                    type="text"
                    name="degree"
                    placeholder="Зэрэг дэв"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Утасны дугаар </p>
                  <input
                    className="form-control"
                    type="number"
                    name="phoneNumber"
                    placeholder="Утасны дугаар оруулна уу"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <span className={`litleError`}>{errors.phoneNumber}</span>
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className={`litleError`}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> дэлгэрэнгүй мэдээлэл</p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="about"
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount image media      ",
                      ],
                      toolbar:
                        "undo redo | fontselect fontsizeselect formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media ",
                      file_picker_types: "image",
                      automatic_uploads: false,
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = async function () {
                          var file = this.files[0];
                          const fData = new FormData();
                          fData.append("file", file);
                          await props.tinymceAddPhoto(fData);
                          const url =
                            `${base.cdnUrl}uploads/photo_img_` + file.name;
                          cb(url);
                        };
                        input.click();
                      },
                    }}
                    onEditorChange={textAreaChange}
                  />
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
                <i className="fas fa-list"></i> Алба, хэлтэс, тэнхим
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`categoryBox`}>
                <ul style={{ marginTop: "10px" }}>
                  {renderPosition(props.positions)}
                </ul>
              </div>
              {errors.positions && (
                <span className={`litleError`}>{errors.positions}</span>
              )}
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Зураг
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
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
    positions: state.positionReducer.positions,
    images: state.imageReducer.files,
    error: state.employeeReducer.error,
    loading: state.employeeReducer.loading,
    success: state.employeeReducer.success,
    resultNews: state.employeeReducer.posi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosition: () => dispatch(loadPosition()),
    removePhotos: () => dispatch(allRemove()),
    saveEmployee: (data) => dispatch(actions.saveEmployee(data)),
    saveInit: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
