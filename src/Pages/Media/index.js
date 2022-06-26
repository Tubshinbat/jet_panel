import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";
import { useCookies } from "react-cookie";

// ACTIONS
import { loadMediaCategories } from "../../redux/actions/mediaCategoryActions";
import * as actions from "../../redux/actions/mediaActions";

//STYLES
import css from "./__.module.css";

// -- HTML
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Dropdown from "../../Components/General/Dropdown";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";
import Spinner2 from "../../Components/General/Spinner2";
import Model from "../../Components/General/Model";

//-- filter Image
import notfound from "../../notfound.svg";

const Media = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);

  // SEARCH STATE
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [select, setSelect] = useState(
    "status mn eng slug categories pictures type createAt"
  );

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    category: false,
    status: false,
  });

  const [selectCat, setSelectCat] = useState();
  const [selectStatus, setSelectStatus] = useState();

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
    }
  }, [props.success]);

  useEffect(() => {
    if (props.pageLast) {
      setTotal(props.pageLast.total);
      setLimit(props.pageLast.limit);
    }
  }, [props.pageLast]);

  useEffect(() => {
    props.loadMedia(
      `select=${select}&sort=${sort}&status=${status}&name=${searchText}&category=${category}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    props.clear();
    setCategory(() => null);
    setStatus(() => null);
    setSearchText(() => "");
    setSelectCat();
    setChkBox(() => []);
    props.loadCategories();
    props.loadMedia(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/media/add");
  };

  const handleShow = (data) => {
    setDropShow((beforeDrop) => ({
      ...beforeDrop,
      [data]: dropShow[data] ? false : true,
    }));
  };

  const handleClickStatus = (e) => {
    setSelectStatus(e.name);
    handleShow("status");
    setStatus(e.value);
    props.loadMedia(
      `select=${select}&sort=${sort}&status=${e.value}&name=${searchText}&category=${category}&page=${activePage}`
    );
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  // FILTER HANDLE
  const handleChange = (e) => {
    setSearchText(e.target.value);
    props.loadPagination(props.pageLast);
    props.loadMedia(
      `select=${select}&sort=${sort}&status=${status}&name=${e.target.value}&category=${category}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleClickCategory = (e = null) => {
    setSelectCat(e.name || "Бүгд");
    setCategory(e._id || null);
    handleShow("category");
    const id = e ? e._id : null;
    props.loadMedia(
      `select=${select}&sort=${sort}&status=${status}&name=${searchText}&category=${id}&page=${activePage}`
    );
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    props.deleteMultMedia(ids);
    setDeleteModel(false);
  };

  const handleChk = (e) => {
    let ch = chkBox;
    let checks = [];
    if (e.target.checked === false) {
      ch.map((el, index) => {
        if (el.id === e.target.value) {
          ch.splice(index, 1);
        }
      });
    } else {
      checks[e.target.value] = { check: e.target.checked, id: e.target.value };
      ch.push(checks[e.target.value]);
    }
    setChkBox((b) => [...b]);
  };

  // RENDERS
  const renderCategories = (categories) => {
    let myCategories = [
      <li key={`myCat_0`}>
        <p className="DropdownEl" onClick={() => handleClickCategory("*")}>
          Бүгд
        </p>
      </li>,
    ];

    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <p
            className={`DropdownEl ${
              el[cookies.language].name === undefined && `redText`
            }`}
            onClick={() => handleClickCategory(el)}
          >
            {el[cookies.language].name === undefined
              ? (cookies.language === "mn" && el.eng.name) || el.mn.name
              : el[cookies.language].name}
          </p>
          {el.children.length > 0 ? (
            <ul> {renderCategories(el.children)} </ul>
          ) : null}
        </li>
      );
    });
    return myCategories;
  };

  const renderStatus = () => {
    const statusData = [
      { name: "Бүгд", value: null },
      { name: "Идэвхтэй", value: true },
      { name: "Ноорог", value: false },
    ];
    let renderJSX = [];
    statusData.map((el) => {
      renderJSX.push(
        <li key={el.name}>
          <p className={`DropdownEl`} onClick={() => handleClickStatus(el)}>
            {el.name}
          </p>
        </li>
      );
    });

    return renderJSX;
  };

  return (
    <Section>
      <MetaTags>
        <title> Медиа | WEBR Control Panel</title>
        <meta name="description" content="Медиа | WeBR control panel" />
        <meta property="og:title" content="Медиа | web control panel" />
      </MetaTags>
      <PageTitle name={`Медиа ( ${cookies.language} )`} />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Медиа оруулах{" "}
              </button>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> Сэргээх
              </button>
              {chkBox.length > 0 && (
                <button
                  name="media"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> Устгах
                </button>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                <div className={`searchPanel`}>
                  <div className="form-group">
                    <Dropdown
                      key={"status"}
                      name={!selectStatus ? "Төлөв" : selectStatus}
                      data={renderStatus()}
                      handleClick={handleShow}
                      show={dropShow.status}
                      who="status"
                    />
                  </div>
                  <div className="form-group">
                    <Dropdown
                      key={"category"}
                      name={!selectCat ? "Медиа ангилал" : selectCat}
                      data={renderCategories(props.categories)}
                      handleClick={handleShow}
                      show={dropShow.category}
                      who="category"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="searchText"
                    className="form-control my-input searchInput"
                    placeholder="Хайлт хийх..."
                    onChange={handleChange}
                    value={searchText && searchText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {props.loading ? <Spinner /> : null}
          <CardBoby>
            <div className={`card-body`}>
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: 14 }}>
                  Сонгогдсон : {chkBox.length}
                </h3>
                <div className={`card-tools ${css.Pagination}`}>
                  {!total ? (
                    <Spinner2 />
                  ) : (
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  )}
                </div>
              </div>

              <table className={`myTable table`}>
                <thead>
                  <tr>
                    <th></th>
                    <th className="statusTh">Төлөв </th>
                    <th> Төрөл </th>
                    <th> Зураг </th>
                    <th>Гарчиг</th>
                    <th>Ангилал</th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                {props.media &&
                  props.media.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td className="statusTd">
                        {el.status == true ? (
                          <div className="activeOn"></div>
                        ) : (
                          <div className="activeOff"></div>
                        )}
                      </td>
                      <td className={css.Type}>
                        <span>
                          {(el.type === "default" && "Энгийн") ||
                            (el.type === "video" && "Видео") ||
                            (el.type === "audio" && "Аудио") ||
                            (el.type === "picture" && "Фото")}
                        </span>
                      </td>
                      <td>
                        {el.pictures.length > 0 ? (
                          <div className="tableImgBox">
                            <img
                              src={`${myBase.cdnUrl}uploads/150x150/${el.pictures[0]}`}
                              className="tableImg"
                            />
                          </div>
                        ) : (
                          "Зураг олдсонгүй "
                        )}
                      </td>
                      <td
                        className={
                          el[cookies.language] === undefined && `redText`
                        }
                      >
                        {el[cookies.language] === undefined
                          ? (cookies.language === "mn" &&
                              el.eng.name.substring(0, 20)) ||
                            el.mn.name.substring(0, 20)
                          : el[cookies.language].name.substring(0, 20)}
                        ...
                      </td>
                      <td className="categoryList">
                        {el.categories.map((el) => (
                          <Link to={`/media-category`}>
                            {" "}
                            {el[cookies.language] === undefined
                              ? (cookies.language === "eng" && el["mn"].name) ||
                                (cookies.language === "mn" && el["eng"].name)
                              : el[cookies.language].name}{" "}
                          </Link>
                        ))}
                      </td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <a
                            className={`${css.Actions} ${css.View}`}
                            href={`${myBase.siteUrl}media/${el.slug}`}
                            target="_blank"
                          >
                            <i className="fas fa-info"></i>
                          </a>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/media/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.media &&
                props.media.length < 1 && (
                  <div className={css.Notfound}>
                    <p> "Илэрц олдсонгүй" </p>
                    <img src={notfound} />
                  </div>
                )}
              <div className={css.DashboardFooter}>
                <p>
                  Нийт дата: <strong> {total} </strong>
                </p>
              </div>
            </div>
          </CardBoby>
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
      <Model
        modelName="Сошиал хаяг устгах"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> нийтлэлийг
            устгахдаа итгэлтэй байна уу ?
          </p>
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={deleteClick}>
            Устгах
          </button>
          <button className="btn btn-light btn-sm" onClick={handleClose}>
            Болих
          </button>
        </div>
      </Model>
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.mediaCategoryReducer.mediaCategories,
    media: state.mediaReducer.allMedia,
    pageLast: state.mediaReducer.paginationLast,
    loading: state.mediaReducer.loading,
    success: state.mediaReducer.success,
    error: state.mediaReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadCategories: () => dispatch(loadMediaCategories()),
    loadMedia: (query) => dispatch(actions.loadMedia(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultMedia: (ids) => dispatch(actions.deleteMultMedia(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
