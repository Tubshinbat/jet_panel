const initialState = {
  loading: false,
  error: null,
  success: null,
  newLink: null,
  stateData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LINK":
      state.stateData.push(action.linkData);
      return {
        ...state,
        loading: false,
        stateData: state.stateData,
      };

    case "CREATE_LINK_ERROR":
      return {
        ...state,
        loading: false,
        stateData: state.stateData,
        error: action.error,
      };

    case "DELETE_LINK_START": {
      return {
        ...state,
        loading: true,
      };
    }

    case "DELETE_LINK_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
      };
    }

    case "DELETE_LINK_ERROR": {
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    }

    case "EDIT_LINK": {
      state.stateData[action.editIndex] = action.editData;
      return {
        ...state,
        stateData: [...state.stateData],
      };
    }

    case "LOAD_LINK_START": {
      return {
        ...state,
        loading: true,
        success: null,
      };
    }

    case "LOAD_LINK_SUCCESS": {
      return {
        ...state,
        loading: false,
        stateData: [...action.resultLinks],
      };
    }

    case "LOAD_LINK_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    }

    case "CREATE_LINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_LINK_SUCCESS":
      state.stateData.unshift(action.resultNewLink);
      return {
        ...state,
        loading: false,
        stateData: [...state.stateData],
        success: "Амжилттай сошиал хаяг нэмэгдлээ",
      };

    case "CREATE_LINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    case "UPDATE_LINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "UPDATE_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай Шинэчлэгдлээ",
      };
    case "UPDATE_LINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    default:
      return state;
  }
};

export default reducer;
