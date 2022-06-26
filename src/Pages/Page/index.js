import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS
import { loadMenus } from "../../redux/actions/menuActions";
import * as actions from "../../redux/actions/pageActions";
import { useCookies } from "react-cookie";

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

const News = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [menu, setMenu] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [select, setSelect] = useState("status name menu pictures createAt");

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    menu: false,
    status: false,
  });

  const [selectMenu, setSelectMenu] = useState();
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
    setTotal(props.pageLast.total);
    setLimit(props.pageLast.limit);
  }, [props.pageLast]);

  useEffect(() => {
    props.loadPages(
      `select=${select}&status=${status}&name=${searchText}&menu=${menu}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    // props.clear();
    setMenu(() => null);
    setStatus(() => null);
    setSearchText(() => "");
    setSelectMenu();
    setChkBox(() => []);
    props.loadMenus();
    props.loadPages(`select=${select}`);
  };
  const addClick = () => {
    props.history.push("/page/add");
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
    props.loadPages(
      `select=${select}&status=${e.value}&name=${searchText}&menu=${menu}&page=${activePage}`
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
    props.loadPages(
      `select=${select}&status=${status}&name=${e.target.value}&menu=${menu}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleClickCategory = (e = null) => {
    setSelectMenu(
      e[cookies.language].name === undefined
        ? (cookies.language === "mn" && e.eng.name) || e.mn.name
        : e[cookies.language].name || "Бүгд"
    );
    setMenu(e._id || null);
    handleShow("menu");
    const id = e ? e._id : null;
    props.loadPages(
      `select=${select}&status=${status}&name=${searchText}&menu=${id}&page=${activePage}`
    );
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });
    props.deleteMultPage(ids);
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
          <p className={`DropdownEl`} onClick={() => handleClickCategory(el)}>
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
        <title> Сайтын хуудас | WEBR Control Panel</title>
        <meta name="description" content="Нийтлэл | WeBR control panel" />
        <meta property="og:title" content="Нийтлэл | web control panel" />
      </MetaTags>
      <PageTitle name="Сайтын хуудас" />
      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Сайтын хуудас
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
                  name="sitePage"
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
                      name={!selectMenu ? "Сайтын цэс" : selectMenu}
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
                    <th> Зураг </th>
                    <th>Гарчиг</th>
                    <th>Цэс</th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                {props.pages &&
                  props.pages.map((el) => (
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
                        {el.menu.map((el) => (
                          <Link to={`/menu`}>
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
                          <Link
                            className={`${css.Actions} ${css.View}`}
                            to={`/page/${el._id}`}
                          >
                            <i className="fas fa-info"></i>
                          </Link>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/page/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.pages &&
                props.pages.length < 1 && (
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
      <Model
        modelName="Сошиал хаяг устгах"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> хуудсыг
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
    categories: state.menuReducer.menus,
    pages: state.pageReducer.pages,
    pageLast: state.pageReducer.paginationLast,
    loading: state.pageReducer.loading,
    success: state.pageReducer.success,
    error: state.pageReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // clear: () => dispatch(actions.clear()),
    loadMenus: () => dispatch(loadMenus()),
    loadPages: (query) => dispatch(actions.loadPage(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultPage: (ids) => dispatch(actions.deleteMultPage(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
