const initialState = {
  data: [],
  pageInfo: {},
  msg: "",
};

const siswa = (state = initialState, action) => {
  switch (action.type) {
    case "SISWA_GET": {
      return {
        ...state,
        data: action.payload.results,
        pageInfo: action.payload.pageInfo,
      };
    }
    case "SISWA_ADD": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "SISWA_GET_NEXT": {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        pageInfo: action.payload.pageInfo,
      };
    }
    case "SISWA_CLEAR": {
      return {
        data: [],
        pageInfo: {},
        detailData: {},
        msg: "",
      };
    }
    case "SISWA_ERROR": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "SISWA_DELETE": {
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

export default siswa;
