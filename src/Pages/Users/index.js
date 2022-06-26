import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import base from "../../base";
import ModelFooter from "../../Components/General/Model/ModelFooter";

// ACTIONS
import * as actions from "../../redux/actions/userActions";

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
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [select, setSelect] = useState(
    "status name email avatar role createAt"
  );
  const [sort, setSort] = useState(`"createAt": -1`);
  const [resetPassword, setResetPassword] = useState({
    id: null,
    name: null,
  });

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState();
  const [selectStatus, setSelectStatus] = useState();

  // RESET PASSWORD
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassowrd: "",
  });

  const [resetPasswordError, setResetPasswordError] = useState({
    password: null,
    confirmPassowrd: null,
  });

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    category: false,
    status: false,
  });

  // MODEL
  const [resetPasswordModel, setResetPasswordModel] = useState(false);

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    toastControl("success", props.success);
    init();
  }, [props.success]);

  useEffect(() => {
    setTotal(props.pageLast.total);
    setLimit(props.pageLast.limit);
  }, [props.pageLast]);

  useEffect(() => {
    props.getUsers(
      `select=${select}&status=${status}&sort=${sort}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    props.clear();
    setStatus(() => null);
    setSearchText(() => "");
    setChkBox(() => []);
    props.getUsers(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/users/add");
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
    props.getUsers(
      `select=${select}&sort=${sort}&status=${e.value}&name=${searchText}&page=${activePage}`
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
    props.getUsers(
      `select=${select}&sort=${sort}&status=${status}&name=${e.target.value}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });
    init();
    props.deleteUsers(ids);
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

  const handleMDPassword = (id = null, name = null) => {
    props.resetPasswordControlInit();
    setResetPassword((bp) => ({ id: id, name: name }));
    setResetPasswordData((rpbf) => ({
      ...rpbf,
      password: "",
      confirmPassowrd: "",
    }));

    setResetPasswordError((be) => ({ password: null, confirmPassowrd: null }));

    resetPasswordModel === false
      ? setResetPasswordModel(true)
      : setResetPasswordModel(false);
  };

  // reset password check functions

  const handlePasswordInput = (event) => {
    setResetPasswordData((brf) => ({
      ...brf,
      [event.target.name]: event.target.value,
    }));
  };

  const checkResetPassword = () => {
    let erCount = 0;
    if (
      resetPasswordData.password === "" ||
      resetPasswordData.password === null
    ) {
      setResetPasswordError((be) => ({
        ...be,
        password: "Уучлаарай нууц үг оруулна уу",
      }));
      erCount++;
    } else {
      setResetPasswordError((be) => ({
        ...be,
        password: null,
      }));
    }
    if (resetPasswordData.password !== resetPasswordData.confirmPassowrd) {
      setResetPasswordError((be) => ({
        ...be,
        confirmPassowrd: "Уучлаарай нууц үг таарахгүй байна",
      }));
      erCount++;
    } else {
      setResetPasswordError((be) => ({
        ...be,
        confirmPassowrd: "",
      }));
    }
    if (erCount === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleResetClick = () => {
    if (checkResetPassword()) {
      const data = {
        password: resetPasswordData.password,
      };
      props.resetPasswordControl(resetPassword.id, data);
      handleMDPassword();
    }
  };

  useEffect(() => {
    if (props.resetIs === true) {
      toastControl("success", "Амжилттай нууц үг шинэчлэгдлээ");

      handleMDPassword();
    }
  }, [props.resetIs]);

  // RENDERS
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
        <title> Хэрэглэгч| WEBR Control Panel</title>
        <meta name="description" content="Хэрэглэгч | WeBR control panel" />
        <meta property="og:title" content="Хэрэглэгч | web control panel" />
      </MetaTags>
      <PageTitle name="Хэрэглэгч" />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Хэрэглэгч нэмэх
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
                  name="news"
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
                    <th>Нэр</th>
                    <th> Имэйл</th>
                    <th>Эрх</th>
                    <th>Нууц үг</th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                {props.users &&
                  props.users.map((el) => (
                    <tr key={el._id}>
                      <td>
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td>
                        {el.status == true ? (
                          <div className="activeOn"></div>
                        ) : (
                          <div className="activeOff"></div>
                        )}
                      </td>
                      <td>
                        {el.avatar ? (
                          <img
                            src={`${base.cdnUrl}uploads/150x150/${el.avatar}`}
                            style={{ width: 50 }}
                          />
                        ) : (
                          "Зураггүй"
                        )}
                      </td>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.role}</td>
                      <td>
                        <button
                          className={css.PasswordBtn}
                          onClick={() => handleMDPassword(el._id, el.name)}
                        >
                          Нууц үг солих
                        </button>
                      </td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.View}`}
                            to={`/users/view/${el._id}`}
                          >
                            <i className="fas fa-info"></i>
                          </Link>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/users/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>

              {props.loading === false &&
                props.users &&
                props.users.length < 1 && (
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
        show={resetPasswordModel}
        handleToggle={handleMDPassword}
        modelName="Нууц үгийг шинэчлэхдээ итгэлтэй байна уу?"
      >
        <div className="row">
          <div className="col-md-12">
            <p>
              {resetPassword.name} - ын нууц үгийг шинэчлэхдээ итгэлтэй байна
              уу?
            </p>
            <div className={`input-group ${css.ResetInput}`}>
              <input
                type="password"
                name="password"
                value={resetPasswordData.password}
                className="form-control"
                onChange={handlePasswordInput}
                placeholder="Нууц үгээ оруулна уу."
              />
            </div>
            <p className={css.LitleError}>
              {resetPasswordError.password && resetPasswordError.password}
            </p>
            <div className={`input-group ${css.ResetInput}`}>
              <input
                type="password"
                className="form-control"
                name="confirmPassowrd"
                placeholder="Нууц үгээ давтан оруулна уу."
                value={resetPasswordData.confirmPassowrd}
                onChange={handlePasswordInput}
              />
            </div>
            <p className={css.LitleError}>
              {resetPasswordError.confirmPassowrd &&
                resetPasswordError.confirmPassowrd}
            </p>
          </div>
        </div>
        <div className={css.BtnGroup}>
          <button
            className={`btn btn-danger btn-sm `}
            onClick={handleResetClick}
          >
            Тийм
          </button>
          <button className="btn btn-light btn-sm" onClick={handleMDPassword}>
            Болих
          </button>
        </div>
      </Model>

      <Model
        modelName="Хэрэглэгч устгах"
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
    users: state.userReducer.users,
    pageLast: state.userReducer.paginationLast,
    loading: state.userReducer.loading,
    success: state.userReducer.success,
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    getUsers: (query) => dispatch(actions.getUsers(query)),
    loadPagination: (pageLast) =>
      dispatch(actions.loadUserPagination(pageLast)),
    deleteUsers: (ids) => dispatch(actions.deleteMultUsers(ids)),
    resetPasswordControlInit: () =>
      dispatch(actions.resetPasswordControlInit()),
    resetPasswordControl: (id, data) =>
      dispatch(actions.resetPasswordControl(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
