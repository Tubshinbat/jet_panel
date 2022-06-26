const initialState = {
  loading: false,
  success: null,
  error: null,
  banners: [],
  paginationLast: {},
  banner: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BANNER":
      return {
        ...state,
        error: null,
        success: null,
        banner: {},
      };

    case "LOAD_BANNERS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        banners: [],
      };

    case "LOAD_BANNERS_SUCCESS":
      return {
        ...state,
        loading: false,
        banners: action.loadBanners,
      };

    case "LOAD_BANNERS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        banners: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE BANNER

    case "CREATE_BANNER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        banner: null,
      };
    case "CREATE_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "CREATE_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_BANNER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET BANNER

    case "GET_BANNER_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        banner: {},
      };

    case "GET_BANNER_START":
      return {
        ...state,
        loading: true,
        banner: {},
        error: null,
      };

    case "GET_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        banner: action.banner,
        error: null,
      };

    case "GET_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        banner: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_BANNER_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: " Амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BANNER_ERROR":
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
    case "GET_COUNT_BANNER_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BANNER_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BANNER_ERROR":
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
