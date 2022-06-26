const initialState = {
  loading: false,
  error: null,
  success: null,
  allNews: [],
  paginationLast: {},
  news: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_NEWS":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_NEWS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        allNews: [],
      };

    case "LOAD_NEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        allNews: action.loadNews,
      };

    case "LOAD_NEWS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        allNews: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // SAVE
    case "SAVE_NEWS_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "SAVE_NEWS_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "SAVE_NEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        news: action.news,
        success: "Амжилттай нэмэгдлээ",
      };
    case "SAVE_NEWS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_NEWS_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_NEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_NEWS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_NEWS_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        news: {},
      };

    case "GET_NEWS_START":
      return {
        ...state,
        loading: true,
        news: {},
        error: null,
      };

    case "GET_NEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        news: action.singleNews,
        error: null,
      };

    case "GET_NEWS_ERROR":
      return {
        ...state,
        loading: false,
        news: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_NEWS_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_NEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_NEWS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
      };

    // GET COUNT
    case "GET_COUNT_NEWS_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_NEWS_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_NEWS_ERROR":
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
