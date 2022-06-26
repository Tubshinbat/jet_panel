const initialState = {
  loading: false,
  error: null,
  success: null,
  page: {},
  pages: [],
  paginationLast: {},

  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PAGES_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        pages: [],
      };

    case "LOAD_PAGES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        pages: action.pages,
      };

    case "LOAD_PAGES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        pages: [],
      };

    case "LOAD_PAGE_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    case "SAVE_PAGE_INIT":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        pages: {},
      };
    case "SAVE_PAGE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай хуудас нэмэгдлээ",
        error: null,
      };
    case "SAVE_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_PAGE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсийг устгалаа",
      };
    case "DELETE_MULT_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_PAGE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        page: {},
      };

    case "GET_PAGE_START":
      return {
        ...state,
        loading: true,
        page: {},
        error: null,
      };

    case "GET_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        page: action.page,
        error: null,
      };

    case "GET_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        page: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_PAGE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "GET_COUNT_PAGE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PAGE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PAGE_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
