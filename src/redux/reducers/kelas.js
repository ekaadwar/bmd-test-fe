const initialState = {
  data: [],
  pageInfo: {},
  msg: "",
};

const kelas = (state = initialState, action) => {
  switch (action.type) {
    case "KELAS_GET": {
      return {
        ...state,
        data: action.payload.results,
        pageInfo: action.payload.pageInfo,
      };
    }
    case "KELAS_ADD": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "KELAS_GET_NEXT": {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        pageInfo: action.payload.pageInfo,
      };
    }
    case "KELAS_CLEAR": {
      return {
        data: [],
        pageInfo: {},
        detailData: {},
        msg: "",
      };
    }
    case "KELAS_ERROR": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "KELAS_DELETE": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default kelas;
