const initialState = {
  loading: false,
  error: null,
  success: null,
  allMedia: [],
  paginationLast: {},
  media: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_MEDIA":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_MEDIA_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        allMedia: [],
      };

    case "LOAD_MEDIA_SUCCESS":
      return {
        ...state,
        loading: false,
        allMedia: action.loadMedia,
      };

    case "LOAD_MEDIA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        allMedia: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // SAVE
    case "SAVE_MEDIA_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "SAVE_MEDIA_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "SAVE_MEDIA_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        media: action.media,
        success: "Амжилттай нэмэгдлээ",
      };
    case "SAVE_MEDIA_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_MEDIA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_MEDIA_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_MEDIA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_MEDIA_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        media: {},
      };

    case "GET_MEDIA_START":
      return {
        ...state,
        loading: true,
        media: {},
        error: null,
      };

    case "GET_MEDIA_SUCCESS":
      return {
        ...state,
        loading: false,
        media: action.singleMedia,
        error: null,
      };

    case "GET_MEDIA_ERROR":
      return {
        ...state,
        loading: false,
        media: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_MEDIA_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_MEDIA_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_MEDIA_ERROR":
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
    case "GET_COUNT_MEDIA_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_MEDIA_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_MEDIA_ERROR":
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
