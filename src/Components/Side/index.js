import React from "react";
import Brand from "./Components/Brand";
import MultipleList from "./Components/MultipleList";
import Nav from "./Components/Nav";
import NavItem from "./Components/NavItem";
import PackList from "./Components/PackList";
import SideBar from "./Components/SideBar";
import UserInfo from "./Components/UserInfo";

import css from "./__.module.css";
import "./style.css";

const Side = () => {
  return (
    <>
      <aside
        className={`main-sidebar sidebar-dark-primary elevation-4 ${css.SideBar}`}
      >
        <Brand />
        <SideBar>
          <UserInfo />
          <Nav>
            <PackList>
              <NavItem exact link="/">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Хянах самар</p>
              </NavItem>
            </PackList>
            <PackList name="Үндсэн удирдлагууд">
              <MultipleList name="Нийтлэл" icon="nav-icon fas fa-newspaper">
                <NavItem exact link="/news">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Нийтлэл</p>
                </NavItem>
                <NavItem exact link="/news-category">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Нийтлэлийн төрөл</p>
                </NavItem>
              </MultipleList>

              <MultipleList
                name="Медиа контент"
                icon="nav-icon fas fa-newspaper"
              >
                <NavItem exact link="/media">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Медиа</p>
                </NavItem>
                <NavItem exact link="/media-category">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Медиа ангилал</p>
                </NavItem>
              </MultipleList>

              <NavItem exact link="/users">
                <i className="nav-icon fas fa-user-friends"></i>
                <p>Хэрэглэгчид</p>
              </NavItem>

              <MultipleList name="Ажилчид" icon="nav-icon fas fa-suitcase">
                <NavItem exact link="/employees">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Ажилчид</p>
                </NavItem>
                <NavItem exact link="/position">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Нэгж, алба, тэнхим</p>
                </NavItem>
              </MultipleList>
              {/* 
              <MultipleList name="Статистик" icon="nav-icon fas fa-chart-bar">
                <NavItem exact link="/statistics">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Тоон баримт</p>
                </NavItem>
                <NavItem exact link="/fact">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Факт баримт</p>
                </NavItem>
              </MultipleList> */}
              <NavItem exact link="/books">
                <i className="nav-icon fas fa-book"></i>
                <p>Номын сан</p>
              </NavItem>
              <NavItem exact link="/partners">
                <i className="nav-icon fas fa-suitcase"></i>
                <p>Хамтрагчид</p>
              </NavItem>
            </PackList>
            <PackList name="Форм">
              {/* <NavItem exact link="/admission">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Элсэлт</p>
              </NavItem> */}
              <NavItem exact link="/contact">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Санал хүсэлт</p>
              </NavItem>
              <NavItem exact link="/question">
                <i className="nav-icon far fa-question-circle"></i>
                <p>Нийтлэг асуулт</p>
              </NavItem>
            </PackList>
            <PackList name="Вэб сайт">
              <NavItem exact link="/page">
                <i className="nav-icon fas fa-file-alt"></i>
                <p>Сайтын хуудас</p>
              </NavItem>
              <MultipleList name="Сайтын цэс" icon="nav-icon fas fa-compass">
                <NavItem exact link="/menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Сайтын цэс</p>
                </NavItem>
                <NavItem exact link="/footer-menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Хөлөнд байрлах цэс</p>
                </NavItem>
                {/* <NavItem exact link="/top-links">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Тусгай 3 линк</p>
                </NavItem>
                <NavItem exact link="/fast-links">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Чухал холбоосууд</p>
                </NavItem> */}
              </MultipleList>
              <NavItem exact link="/banners">
                <i className="nav-icon fas fa-images"></i>
                <p>Баннер</p>
              </NavItem>
            </PackList>
          </Nav>
        </SideBar>
      </aside>
    </>
  );
};

export default Side;
