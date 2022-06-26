import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Pages/App/";
import reportWebVitals from "./reportWebVitals";

// Reducers a
import imageReducer from "./redux/reducer/imageReducer";
import newsCategoryReducer from "./redux/reducer/newsCategoryReducer";
import newsReducer from "./redux/reducer/newsReducer";
import bannerReducer from "./redux/reducer/bannerReducer";
import aboutReducer from "./redux/reducer/aboutReducer";
import faqReducer from "./redux/reducer/faqReducer";
import loginReducer from "./redux/reducer/loginReducer";
import tokenReducer from "./redux/reducer/tokenReducer";
import webinfoReducer from "./redux/reducer/webinfoReducer";
import userReducer from "./redux/reducer/userReducer";
import pageReducer from "./redux/reducer/pageReducer";
import commentReducer from "./redux/reducer/commentReducer";
import menuReducer from "./redux/reducer/menuReducer";
import socialLinkReducer from "./redux/reducer/socialLinkReducer";
import contactReducer from "./redux/reducer/contactReducer";
import productReducer from "./redux/reducer/productReducer";
import partnerReducer from "./redux/reducer/parentReducer";
import positionReducer from "./redux/reducer/positionReducer";
import employeeReducer from "./redux/reducer/employeeReducer";
import statisticsReducer from "./redux/reducer/statisticsReducer";
import statisticsSubReducer from "./redux/reducer/statisticsSubReducer.js";
import factReducer from "./redux/reducer/factReducer";
import bookReducer from "./redux/reducer/bookReducer";
import footerMenuReducer from "./redux/reducer/FooterMenuReducer";
import fastLinkReducer from "./redux/reducer/fastLinkReducer";
import topLinkReducer from "./redux/reducer/topLinkReducer";
import newsUploadReducer from "./redux/reducer/newsUploadReducer";
import mediaReducer from "./redux/reducer/mediaReducer";
import mediaCategoryReducer from "./redux/reducer/mediaCategoryReducer";

import "./index.css";

const loggerMiddlaware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      // console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
      const result = next(action);
      // console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  imageReducer,
  newsCategoryReducer,
  newsReducer,
  bannerReducer,
  commentReducer,
  aboutReducer,
  faqReducer,
  loginReducer,
  tokenReducer,
  webinfoReducer,
  partnerReducer,
  fastLinkReducer,
  topLinkReducer,
  contactReducer,
  menuReducer,
  footerMenuReducer,
  userReducer,
  pageReducer,
  statisticsReducer,
  productReducer,
  positionReducer,
  factReducer,
  newsUploadReducer,
  socialLinkReducer,
  bookReducer,
  employeeReducer,
  mediaReducer,
  mediaCategoryReducer,
  statisticsSubReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
