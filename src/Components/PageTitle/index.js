import React from "react";
import { Link, NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

import css from "./__.module.css";

const newsById = { "6060a3b1e124f281bc371676": "aa" };

const DynamicNewsBreadcrumb = ({ match }) => (
  <span> {newsById[match.params.id]} </span>
);

const routes = [
  {
    path: "/",
    breadcrumb: "Эхлэл",
  },
  {
    path: "/news-category",
    breadcrumb: "Нийтлэлийн төрөл",
  },
  {
    path: "/news",
    breadcrumb: "Нийтлэл",
  },
  {
    path: "/news/add",
    breadcrumb: "Нийтлэл нэмэх",
  },

  {
    path: "/news/edit",
    breadcrumb: "Нийтлэл шинэчлэх",
  },
  {
    path: "/news/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/media",
    breadcrumb: "Медиа",
  },
  {
    path: "/media/add",
    breadcrumb: "Медиа нэмэх",
  },

  {
    path: "/media/edit",
    breadcrumb: "Медиа шинэчлэх",
  },
  {
    path: "/media/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/media-category",
    breadcrumb: "Медиа төрөл",
  },

  {
    path: "/banners",
    breadcrumb: "Баннер",
  },
  {
    path: "/banners/add",
    breadcrumb: "Баннер шинээр нэмэх",
  },
  {
    path: "/banners/edit",
    breadcrum: "Баннер засварлах",
  },
  {
    path: "/banners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/menu",
    breadcrumb: "Сайтын цэс",
  },
  {
    path: "/footer-menu",
    breadcrumb: "Хөлний цэс",
  },
  {
    path: "/top-links",
    breadcrumb: "ДЭЭД ТАЛЫН 3 ЦЭС",
  },
  {
    path: "/fast-links",
    breadcrumb: "ЧУХАЛ ХОЛБООСУУД ",
  },
  {
    path: "/employees",
    breadcrumb: "Ажилчид",
  },

  {
    path: "/employees/add",
    breadcrumb: "Нэмэх",
  },

  {
    path: "/employees/edit",
    breadcrumb: "Засах",
  },

  {
    path: "/employees/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/books",
    breadcrumb: "Номнууд",
  },

  {
    path: "/books/add",
    breadcrumb: "Нэмэх",
  },

  {
    path: "/books/edit",
    breadcrumb: "Засах",
  },

  {
    path: "/books/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/page",
    breadcrumb: "Хуудаснууд",
  },

  {
    path: "/page/add",
    breadcrumb: "Нэмэх",
  },

  {
    path: "/page/edit",
    breadcrumb: "Засах",
  },

  {
    path: "/page/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/contact",
    breadcrumb: "Санал хүсэлт",
  },

  {
    path: "/position",
    breadcrumb: "Алба нэгж",
  },
  {
    path: "/page/add",
    breadcrumb: "Сайтын хуудас нэмэх",
  },

  {
    path: "/about-us",
    breadcrumb: "Бидний тухай",
  },
  {
    path: "/question",
    breadcrumb: "Түгээмэл асуулт хариулт",
  },
  {
    path: "/users",
    breadcrumb: "Хэрэглэгчид",
  },
  {
    path: "/users/edit",
    breadcrumb: "Засварлах",
  },

  {
    path: "/users/add",
    breadcrumb: "Нэмэх",
  },

  {
    path: "/users/view",
    breadcrumb: "Дэлгэрэнгүй мэдээлэл",
  },
  {
    path: "/users/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/users/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/webinfo",
    breadcrumb: "Ёрөнхий тохиргоо",
  },
  {
    path: "/partners",
    breadcrumb: "Хамтрагч компани",
  },
  {
    path: "/partners/add",
    breadcrumb: "Хамтрагч нэмэх",
  },
  {
    path: "/partners/edit",
    breadcrumb: "Хамтрагч шинэчлэх",
  },
  {
    path: "/partners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
];
let lastBread = "";

// map & render your breadcrumb components however you want.
const Breadcrumbs = withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <>
    {breadcrumbs.map(({ match, breadcrumb }) => (
      // other props are available during render, such as `location`
      // and any props found in your route objects will be passed through too
      <li className={`breadcrumb-item ${css.Bitem}`} key={match.url}>
        <Link to={match.url}>{breadcrumb} </Link>
      </li>
    ))}
  </>
));

const PageTitle = (props) => {
  return (
    <div className={`container-fluid ${css.Header}`}>
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>{props.name}</h1>
        </div>
        <div className="col-sm-6">
          <ol className={`breadcrumb ${css.Breadcrumb}  float-sm-right`}>
            <Breadcrumbs />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
