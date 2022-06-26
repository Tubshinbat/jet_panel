const initialState = {
  loading: false,
  error: null,
  success: null,
  topLink: {},
  topLinks: [],
  paginationLast: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_TOPLINK": {
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        topLink: {},
        topLinks: [],
      };
    }

    case "LOAD_TOPLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        topLinks: [],
      };

    case "LOAD_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        topLinks: action.topLinks,
      };

    case "LOAD_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        topLinks: [],
      };

    case "SAVE_TOPLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "SAVE_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_TOPLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_MULT_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    //GET

    case "GET_TOPLINK_START":
      return {
        ...state,
        loading: true,
        topLink: {},
        error: null,
      };

    case "GET_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        topLink: action.toplink,
        error: null,
      };

    case "GET_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        topLink: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_TOPLINK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_TOPLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_TOPLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
