const initialState = {
  loading: false,
  error: null,
  success: null,
  book: {},
  books: [],
  paginationLast: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BOOK": {
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        book: {},
        books: [],
      };
    }

    case "LOAD_BOOK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        books: [],
      };

    case "LOAD_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        books: action.books,
      };

    case "LOAD_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        books: [],
      };

    case "CREATE_BOOK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "CREATE_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "DELETE_MULT_BOOK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    case "DELETE_MULT_BOOK_ERROR":
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

    case "GET_BOOK_START":
      return {
        ...state,
        loading: true,
        book: {},
        error: null,
      };

    case "GET_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        book: action.book,
        error: null,
      };

    case "GET_BOOK_ERROR":
      return {
        ...state,
        loading: false,
        book: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_BOOK_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BOOK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BOOK_ERROR":
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
