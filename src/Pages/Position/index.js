import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";

// HTML COMPONENTS
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import CategoryList from "../../Components/MenuList";
import CardBoby from "../../Components/General/CardBody";
import Model from "../../Components/General/Model";
import Spinner from "../../Components/General/Spinner";

// MODELS
import Add from "./add";
import Delete from "./delete";
import Change from "./change";

// LIB
import { toastControl } from "../../lib/toasControl";

// ACTIONS
import * as actions from "../../redux/actions/positionActions";

// STYLES
import css from "./__.module.css";
import PositionList from "../../Components/PositionList";

const NewsCategory = (props) => {
  // USESTATE
  const [activeMenu, setActiveMenu] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);

  // MODEL's status
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

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

  //FUNCTIONS
  const init = () => {
    props.loadPosition();
  };

  // -- click functions
  const toggleAddModel = () => {
    addModel ? setAddModel(false) : setAddModel(true);
  };

  const toggleDeleteModel = () => {
    deleteModel ? setDeleteModel(false) : setDeleteModel(true);
  };

  const toggleEditModel = () => {
    editModel ? setEditModel(false) : setEditModel(true);
  };

  return (
    <Section>
      <PageTitle name={`НЭГЖ, АЛБА, ТЭНХИМ  (${cookies.language})`} />
      {props.loading ? <Spinner /> : null}
      <div className={`PanelTabelHeader`}>
        <button
          name="mainCtgry"
          className="bg-success myButton addBtn btn"
          onClick={toggleAddModel}
        >
          <i className="fas fa-plus-circle"></i>Нэмэх
        </button>
      </div>
      <div className="row">
        <div className="col-md-8">
          <CardBoby>
            <PositionList
              positions={props.positions}
              // active={activeMenu ? activeMenu : null}
            />
          </CardBoby>
        </div>
        <div className="col-md-4">
          <CardBoby>
            <div className={css.selectData}>
              <h5>
                <p> Сонгогдсон :</p>
              </h5>
              <span>
                {props.position &&
                  (props.position[cookies.language] !== undefined
                    ? props.position[cookies.language].name
                    : `${cookies.language} хэл дээр нэр байхгүй байна`)}
              </span>
            </div>
            <div className={css.ControlBtn}>
              <button
                className={`btn myButton editBtn ${
                  props.position && props.position._id === "" && "disabled"
                }`}
                onClick={toggleEditModel}
              >
                <i className="far fa-edit"></i> Өөрчлөх
              </button>
              <button
                className={`btn myButton deleteBtn ${
                  props.position && props.position._id === "" && "disabled"
                }`}
                onClick={toggleDeleteModel}
              >
                <i className="far fa-trash-alt"></i> Устгах
              </button>
            </div>
          </CardBoby>
        </div>
      </div>
      <Model
        modelName="Ангилал шинээр нэмэх"
        show={addModel}
        handleToggle={toggleAddModel}
      >
        <Add handleToggle={toggleAddModel} />
      </Model>

      <Model
        modelName="Ангилал устгах"
        show={deleteModel}
        handleToggle={toggleDeleteModel}
      >
        <Delete handleToggle={toggleDeleteModel} />
      </Model>

      <Model
        modelName="Өөрчлөлт хийх"
        show={editModel}
        handleToggle={toggleEditModel}
      >
        <Change handleToggle={toggleEditModel} />
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
    positions: state.positionReducer.positions,
    loading: state.positionReducer.loading,
    error: state.positionReducer.error,
    success: state.positionReducer.success,
    position: state.positionReducer.position,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadPosition: () => dispatch(actions.loadPosition()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategory);
