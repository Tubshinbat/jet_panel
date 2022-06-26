import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { useCookies } from "react-cookie";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import EditImage from "../../../Components/General/EditImage";
import EditAudio from "../../../Components/General/EditAudio";
import EditVideo from "../../../Components/General/EditVideo";
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
import * as actions from "../../../redux/actions/mediaActions";
import { removeAllDatas } from "../../../redux/actions/newsUploadActions";

// STYLE CSS
import css from "./__.module.css";

const Edit = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    details: false,
    pictures: false,
    categories: false,
  });
  const [is_showType, SetIsShowType] = useState(null);

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
      props.getInit();
      setTimeout(() => props.history.replace("/media"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    if (props.images.length >= 1) {
      setForm((bf) => ({ ...bf, pictures: props.images }));
    } else {
      checkFrom("pictures", props.images);
    }
  }, [props.images]);

  useEffect(() => {
    if (props.videos.length >= 1) {
      setForm((bf) => ({ ...bf, videos: props.videos }));
    }
  }, [props.videos]);

  useEffect(() => {
    if (props.audios.length >= 1) {
      setForm((bf) => ({ ...bf, audios: props.audios }));
    }
  }, [props.audios]);

  useEffect(() => {
    allCheck();
  }, [formData]);

  useEffect(() => {
    if (props.media) {
      if (props.media[cookies.language] !== undefined) {
        setForm(() => ({
          ...props.media,
          ...props.media[cookies.language],
        }));
      } else {
        Object.keys(formData).forEach((key) => {
          formData[key] = " ";
        });

        setForm(() => ({}));
        setForm(() => ({
          ...props.media,
          name: "",
          shortDetails: "",
          details: "",
        }));
      }

      if (props.media.pictures) {
        setPhotos(props.media.pictures);
        setForm((bf) => ({ ...bf, pictures: props.media.pictures }));
        setErrors((bf) => ({ ...bf, pictures: true }));
      }

      if (props.media.videos) {
        setVideos(props.media.videos);
        setForm((bf) => ({ ...bf, videos: props.media.videos }));
      }

      if (props.media.audios) {
        setForm((bf) => ({ ...bf, audios: props.media.audios }));
        setAudios(props.media.audios);
      }

      SetIsShowType(props.media.type);

      let c = [];
      props.media.categories &&
        props.media.categories.map((el) => c.push(el._id));
      setForm((bf) => ({ ...bf, categories: c }));
      checkFrom("categories", c);
      setChecked(c);
    }
  }, [props.media, cookies.language]);

  useEffect(() => {
    setForm((bf) => ({
      ...bf,
      oldPicture: photos,
    }));
  }, [photos]);

  useEffect(() => {
    setForm((bf) => ({
      ...bf,
      oldVideos: videos,
    }));
  }, [videos]);

  useEffect(() => {
    setForm((bf) => ({
      ...bf,
      oldAudios: audios,
    }));
  }, [audios]);

  // -- INIT FUNCTION
  const init = () => {
    setForm(() => {});
    props.getInit();
    props.getMedia(props.match.params.id);
    props.removeAllDatas();
    props.loadCategories();
    props.removePhotos();
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

  const is_check = (id) => {
    let result = false;
    checked.map((el) => {
      if (el === id) return (result = true);
    });
    return result;
  };

  const oldPictureRemove = (key) => {
    let allFile = photos;
    allFile.splice(key, 1);
    setPhotos([...allFile]);
    allFile.length < 1 && checkFrom("pictures", props.images);
  };

  const oldAudioRemove = (key) => {
    let allFile = audios;
    allFile.splice(key, 1);
    setAudios([...allFile]);
  };

  const oldVideoRemove = (key) => {
    let allFile = videos;
    allFile.splice(key, 1);
    setVideos([...allFile]);
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const handleChecked = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.value }));
    props.removeAllDatas();
    SetIsShowType(event.target.value);
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
  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = new FormData();

    Object.keys(formData).map((index) => {
      if (
        index === "oldPicture" ||
        index === "pictures" ||
        index === "categories" ||
        index === "videos" ||
        index === "audios" ||
        index === "oldVideos" ||
        index === "oldAudios"
      ) {
        if (formData[index])
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });

    allCheck() === true
      ? props.updateMedia(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  const draftClick = () => {
    const formData = new FormData();
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
              checked={is_check(el._id)}
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
        <title> Нийтлэл засах | WEBR Control Panel</title>
        <meta name="description" content="Нийтлэл засах | WeBR control panel" />
        <meta property="og:title" content="Нийтлэл засах | web control panel" />
      </MetaTags>
      {props.loading === true && <Spinner />}
      <PageTitle name="Нийтлэл засах" />
      <div className="row">
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
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
                  <p className={`${css.Title}`}> Мэдээний хураангуй </p>
                  <textarea
                    className="form-control"
                    name="shortDetails"
                    onChange={handleChange}
                    value={formData.shortDetails}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Мэдээллийн дэлгэрэнгүй </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="details"
                    value={formData.details}
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
                            "${base.cdnUrl}uploads/photo_img_" + file.name;
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
                    checked={formData.status}
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
                    checked={formData.star}
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
                  checked={is_showType === "video"}
                  onChange={handleChecked}
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
                  checked={is_showType === "audio"}
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
                  <div className={css.Thumb}>
                    {videos &&
                      videos.map((el, key) => (
                        <EditVideo
                          file={`${el}`}
                          index={`${key}`}
                          click={oldVideoRemove}
                        />
                      ))}
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
                  <div className={css.Thumb}>
                    {audios &&
                      audios.map((el, key) => (
                        <EditAudio
                          file={`${el}`}
                          index={`${key}`}
                          click={oldAudioRemove}
                        />
                      ))}
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
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <Dropzone />
                  </div>
                  <div className={css.Thumb}>
                    {photos &&
                      photos.map((el, key) => (
                        <EditImage
                          file={`${el}`}
                          index={`${key}`}
                          click={oldPictureRemove}
                        />
                      ))}
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
    media: state.mediaReducer.media,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadMediaCategories()),
    removePhotos: () => dispatch(allRemove()),
    getMedia: (id) => dispatch(actions.getMedia(id)),
    updateMedia: (id, data) => dispatch(actions.updateMedia(id, data)),
    getInit: () => dispatch(actions.getInit()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removeAllDatas: () => dispatch(removeAllDatas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
