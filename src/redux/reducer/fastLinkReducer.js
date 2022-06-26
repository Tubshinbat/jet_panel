const initialState = {
  loading: false,
  error: null,
  success: null,
  fastLink: {},
  fastLinks: [],
  paginationLast: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FASTLINK": {
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        fastLink: {},
        fastLinks: [],
      };
    }

    case "LOAD_FASTLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        fastLinks: [],
      };

    case "LOAD_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        fastLinks: action.fastLinks,
      };

    case "LOAD_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        fastLinks: [],
      };

    case "SAVE_FASTLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "SAVE_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "SAVE_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_FASTLINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_MULT_FASTLINK_ERROR":
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

    case "GET_FASTLINK_START":
      return {
        ...state,
        loading: true,
        fastLink: {},
        error: null,
      };

    case "GET_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        fastLink: action.fastLink,
        error: null,
      };

    case "GET_FASTLINK_ERROR":
      return {
        ...state,
        loading: false,
        fastLink: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_FASTLINK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_FASTLINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_FASTLINK_ERROR":
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
