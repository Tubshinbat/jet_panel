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
import Dropzone from "../../../Components/General/Dropzone";
import DropAudio from "../../../Components/AudioDrop";
import DropVideo from "../../../Components/VideosDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import {
  requiredCheck,
  minLength,
  maxLength,
  menuRequired,
} from "../../../lib/inputRegex";

// ACTIONS
import { loadMediaCategories } from "../../../redux/actions/mediaCategoryActions";
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import { removeAllDatas } from "../../../redux/actions/newsUploadActions";
import * as actions from "../../../redux/actions/mediaActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({
    type: "video",
  });
  const [errors, setErrors] = useState({
    name: false,
    details: false,
    pictures: false,
    categories: false,
  });
  const [is_showType, SetIsShowType] = useState("video");

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
      setTimeout(() => props.history.replace("/media"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
    checkFrom("pictures", props.images);
  }, [props.images]);

  useEffect(() => {
    setForm((bf) => ({ ...bf, audios: props.audios }));
  }, [props.audios]);

  useEffect(() => {
    setForm((bf) => ({ ...bf, videos: props.videos }));
  }, [props.videos]);

  // -- INIT FUNCTION
  const init = () => {
    props.loadCategories();
    props.removePhotos();
    props.removeAllDatas();
    props.saveInit();
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
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 300));
      }
      if (name === "details" && result === true) {
        result = minLength(val, 20);
      }
      if (name === "categories") {
        result = menuRequired(val);
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
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (
        index === "pictures" ||
        index === "categories" ||
        index === "audios" ||
        index === "videos"
      ) {
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

    checkFrom("categories", all);

    setChecked(all);
    setForm((beforeForm) => ({
      ...beforeForm,
      categories: all,
    }));
  };

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, details: event }));
    checkFrom("details", event);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  const handleChecked = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.value }));
    props.removeAllDatas();
    SetIsShowType(event.target.value);
  };

  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();
    console.log(formData);
    allCheck() === true
      ? props.saveMedia(sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  //RENDER CATEGORIES
  const renderCategories = (categories) => {
    let myCategories = [];
    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <div>
            <input
              className={`categoryId`}
              value={el._id}
              type="checkbox"
              name="category"
              onChange={() => categoryCheck(el._id)}
            />
            <span
              className={el[cookies.language].name === undefined && `redText`}
            >
              {el[cookies.language].name === undefined
                ? (cookies.language === "mn" && el.eng.name) || el.mn.name
                : el[cookies.language].name}
            </span>
          </div>
          {el.children.length > 0 ? (
            <ul> {renderCategories(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return myCategories;
  };

  return (
    <Section>
      <MetaTags>
        <title> Медиа нэмэх | WEBR Control Panel</title>
        <meta name="description" content="Медиа нэмэх | WeBR control panel" />
        <meta property="og:title" content="Медиа нэмэх | web control panel" />
      </MetaTags>

      <PageTitle name={`Медиа нэмэх ( ${cookies.language} )`} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг {useCookies}</p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Медиа гарчиг оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Медианий хураангуй </p>
                  <textarea
                    className="form-control"
                    name="shortDetails"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}>дэлгэрэнгүй </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="details"
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount image media  code  table  ",
                      ],
                      toolbar:
                        "undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                      file_picker_types: "image",
                      automatic_uploads: false,
                      audio_template_callback: function (data) {
                        return (
                          "<audio controls>" +
                          '\n<source src="' +
                          data.source +
                          '"' +
                          (data.sourcemime
                            ? ' type="' + data.sourcemime + '"'
                            : "") +
                          " />\n" +
                          (data.altsource
                            ? '<source src="' +
                              data.altsource +
                              '"' +
                              (data.altsourcemime
                                ? ' type="' + data.altsourcemime + '"'
                                : "") +
                              " />\n"
                            : "") +
                          "</audio>"
                        );
                      },
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
                  {errors.details && (
                    <span className={`litleError`}>{errors.details}</span>
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
                    id="mediaActive"
                    name="status"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="mediaActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="starActive"
                    name="star"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="starActive">
                    Онцлох
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">Медиа төрөл</h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.RadioControl}>
                <input
                  type="radio"
                  className="form-radio"
                  name="type"
                  value="video"
                  onChange={handleChecked}
                  defaultChecked
                />
                <i className="fa fa-video"></i>
                <span> Видео</span>
              </div>
              <div className={css.RadioControl}>
                <input
                  type="radio"
                  className="form-radio"
                  name="type"
                  value="audio"
                  onChange={handleChecked}
                />

                <i className="fa fa-headphones"></i>
                <span> Аудио</span>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-list"></i> Нийтлэл ангилал
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`categoryBox`}>
                <ul style={{ marginTop: "10px" }}>
                  {renderCategories(props.categories)}
                </ul>
              </div>
              {errors.categories && (
                <span className={`litleError`}>{errors.categories}</span>
              )}
            </div>
          </div>
          <div
            className="card card-primary card-outline"
            style={{ display: is_showType === "video" ? "block" : "none" }}
          >
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Видео оруулах
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropVideo />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card card-primary card-outline"
            style={{ display: is_showType === "audio" ? "block" : "none" }}
          >
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Аудио оруулах
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropAudio />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Медиа зураг
              </h3>
            </div>

            <div className="card-body box-profile">
              <span>
                {is_showType === "picture" &&
                  "Зургууд маань харагдахдаа энгийн мэдээнээс өөрөөр харагдана"}
              </span>
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
                  </div>
                  {errors.pictures && (
                    <span className={`litleError`}>{errors.pictures}</span>
                  )}
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
    categories: state.mediaCategoryReducer.mediaCategories,
    images: state.imageReducer.files,
    videos: state.newsUploadReducer.videos,
    audios: state.newsUploadReducer.audios,
    error: state.mediaReducer.error,
    loading: state.mediaReducer.loading,
    success: state.mediaReducer.success,
    resultMedia: state.mediaReducer.resultMedia,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadMediaCategories()),
    removePhotos: () => dispatch(allRemove()),
    saveMedia: (media) => dispatch(actions.saveMedia(media)),
    saveInit: () => dispatch(actions.saveMediaInit()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
