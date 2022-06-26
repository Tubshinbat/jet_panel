import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BOOK",
  };
};

// CREATE BOOK

export const createBook = (data) => {
  return function (dispatch) {
    dispatch(createBookStart());
    axios
      .post("books", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createBookSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(createBookError(error.message));
      });
  };
};

const createBookStart = () => {
  return {
    type: "CREATE_BOOK_START",
  };
};

const createBookSuccess = () => {
  return {
    type: "CREATE_BOOK_SUCCESS",
  };
};

const createBookError = (error) => {
  return {
    type: "CREATE_BOOK_ERROR",
    error,
  };
};

// LOAD BOOKS

export const loadBook = (query = "") => {
  return function (dispatch) {
    dispatch(loadBookStart());
    axios
      .get("books?" + query)
      .then((response) => {
        const books = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBookSuccess(books));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadBookError(error.message));
      });
  };
};

export const loadBookStart = () => {
  return {
    type: "LOAD_BOOK_START",
  };
};

export const loadBookSuccess = (books, pagination) => {
  return {
    type: "LOAD_BOOK_SUCCESS",
    books,
    pagination,
  };
};

export const loadBookError = (error) => {
  return {
    type: "LOAD_BOOK_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

// DELETE MULT

export const deleteMultBook = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("books/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBook = response.data.data;
        dispatch(deleteBookSuccess(deleteBook));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(deleteBookError(error.message));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BOOK_START",
  };
};

export const deleteBookSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BOOK_SUCCESS",
    deleteBook: deleteData,
  };
};

export const deleteBookError = (error) => {
  return {
    type: "DELETE_MULT_BOOK_ERROR",
    error,
  };
};

// GET BOOK

export const getBook = (id) => {
  return function (dispatch) {
    dispatch(getBookStart());
    axios
      .get("books/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getBookSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getBookError(error.message));
      });
  };
};

export const getBookStart = () => {
  return {
    type: "GET_BOOK_START",
  };
};

export const getBookSuccess = (result) => {
  return {
    type: "GET_BOOK_SUCCESS",
    book: result,
  };
};

export const getBookError = (error) => {
  return {
    type: "GET_BOOK_ERROR",
    error,
  };
};

//UPDATE BOOK

export const updateBook = (id, data) => {
  return function (dispatch) {
    dispatch(updateBookStart());
    axios
      .put(`books/${id}`, data)
      .then((response) => {
        const result = response.data.data;
        dispatch(updateBookSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updateBookError(err.message));
      });
  };
};

export const updateBookStart = () => {
  return {
    type: "UPDATE_BOOK_START",
  };
};

export const updateBookSuccess = (result) => {
  return {
    type: "UPDATE_BOOK_SUCCESS",
    updateBook: result,
  };
};

export const updateBookError = (error) => {
  return {
    type: "UPDATE_BOOK_ERROR",
    error,
  };
};
