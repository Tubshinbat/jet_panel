import react, { useEffect, Component } from "react";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../../pageStyle.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";

// Import components
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page
import Dashboard from "../Dashboard";
import News from "../News";
import Media from "../Media";
import User from "../Users";
import Contact from "../Contact";
import Comments from "../Comments";
import Banner from "../Banner";
import { default as BannerAdd } from "../Banner/Add";
import { default as BannerEdit } from "../Banner/Edit";
import About from "../About";
import { default as NewsAdd } from "../News/Add";
import { default as NewsView } from "../News/View";
import { default as NewsEdit } from "../News/Edit";
import { default as MediaAdd } from "../Media/Add";
import { default as MediaView } from "../Media/View";
import { default as MediaEdit } from "../Media/Edit";
import MediaCategory from "../MediaCategory";
import NewsCategory from "../NewsCategory";
import Question from "../Question";
import { default as LoginPage } from "../Login";
import Notfound from "../Notfound";
import Logout from "../Logout";
import { default as UserAdd } from "../Users/Add";
import { default as UserEdit } from "../Users/Edit";
import { default as UserView } from "../Users/View";
import Page from "../Page";
import { default as pageAdd } from "../Page/Add";
import { default as pageEdit } from "../Page/Edit";
import Product from "../Product";
import { default as productAdd } from "../Product/add";
import { default as productEdit } from "../Product/edit";
import Partners from "../Partners";
import { default as partnersAdd } from "../Partners/add";
import { default as partnersEdit } from "../Partners/edit";
import UserProfile from "../UserProfile";
import EditUser from "../UserProfile/edit";
import Position from "../Position/index";
import Employees from "../Employees/index";
import { default as employeeAdd } from "../Employees/add";
import { default as employeeEdit } from "../Employees/edit";
import Fact from "../Fact/index";
import { default as factAdd } from "../Fact/add";
import { default as factEdit } from "../Fact/edit";
import Book from "../Book";
import { default as bookAdd } from "../Book/add";
import { default as bookEdit } from "../Book/edit";
import FooterMenu from "../FooterMenu";
import TopLinks from "../TopLinks";
import { default as topLinkAdd } from "../TopLinks/add";
import { default as topLinkEdit } from "../TopLinks/edit";

import FastLinks from "../FastLink";
import { default as FastLinkAdd } from "../FastLink/add";
import { default as FastLinkEdit } from "../FastLink/edit";
import { default as Forget } from "../Forget";

import Statistics from "../Statistics";

import Menu from "../Menu";
// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";
import WebInfo from "../WebInfo";

function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "uatoken",
    "language",
  ]);

  useEffect(() => {
    if (cookies.uatoken) {
      const token = cookies.uatoken;
      props.checkToken(token);
    }
  }, []);

  useEffect(() => {
    if (props.tokenError) {
      removeCookie("uatoken");
      document.location.href = "/login";
    }
  }, [props.tokenError]);

  return (
    <>
      {cookies.uatoken ? (
        <>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/news" component={News} exact />
              <Route path="/news/add" component={NewsAdd} exact />
              <Route path="/news/view/:id" component={NewsView} />
              <Route path="/news/edit/:id" component={NewsEdit} />
              <Route path="/news-category" component={NewsCategory} />

              <Route path="/media" component={Media} exact />
              <Route path="/media/add" component={MediaAdd} exact />
              <Route path="/media/view/:id" component={MediaView} />
              <Route path="/media/edit/:id" component={MediaEdit} />
              <Route path="/media-category" component={MediaCategory} />

              <Route path="/webinfo" component={WebInfo} />
              <Route path="/users/add" component={UserAdd} />
              <Route path="/users/edit/:id" component={UserEdit} />
              <Route path="/users/view/:id" component={UserView} />
              <Route path="/users" component={User} />
              <Route path="/employees/add" component={employeeAdd} />
              <Route path="/employees/edit/:id" component={employeeEdit} />
              <Route path="/employees" component={Employees} />
              <Route path="/position" component={Position} />
              <Route path="/banners/add" component={BannerAdd} />
              <Route path="/banners/edit/:id" component={BannerEdit} />
              <Route path="/banners" component={Banner} />
              <Route path="/about-us" component={About} />
              <Route path="/question" component={Question} />
              <Route path="/page/add" component={pageAdd} />
              <Route path="/page/edit/:id" component={pageEdit} />
              <Route path="/page" component={Page} />
              <Route path="/product/add" component={productAdd} />
              <Route path="/product/edit/:id" component={productEdit} />
              <Route path="/product" component={Product} />
              <Route path="/partners/edit/:id" component={partnersEdit} />
              <Route path="/partners/add" component={partnersAdd} />
              <Route path="/partners" component={Partners} />
              <Route path="/menu" component={Menu} />
              <Route path="/contact" component={Contact} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/settings" component={EditUser} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/logout" component={Logout} />
              <Route path="/comments" component={Comments} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/fact/edit/:id" component={factEdit} />
              <Route path="/fact/add" component={factAdd} />
              <Route path="/fact" component={Fact} />
              <Route path="/books/add" component={bookAdd} />
              <Route path="/books/edit/:id" component={bookEdit} />
              <Route path="/books" component={Book} />
              <Route path="/footer-menu" component={FooterMenu} />

              <Route path="/top-links/edit/:id" component={topLinkEdit} />
              <Route path="/top-links/add" component={topLinkAdd} />
              <Route path="/top-links" component={TopLinks} />

              <Route path="/fast-links/edit/:id" component={FastLinkEdit} />
              <Route path="/fast-links/add" component={FastLinkAdd} />
              <Route path="/fast-links" component={FastLinks} />

              <Redirect to="/" />
              <Route path="*" component={Notfound} />
            </Switch>
            <Footer />
          </CookiesProvider>
        </>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route parh="/forget-password" exact component={Forget} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
