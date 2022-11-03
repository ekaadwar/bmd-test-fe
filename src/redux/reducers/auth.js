const initialState = {
  token: null,
  userId: "",
  role: "",
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN": {
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        msg: action.payload.message,
        photo: action.payload.photo,
      };
    }
    case "AUTH_LOGIN_FAILED": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "AUTH_REGISTER": {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case "AUTH_LOGOUT": {
      return {
        ...state,
        token: null,
        userId: "",
        msg: "",
      };
    }
    case "AUTH_CLEAR": {
      return {
        ...state,
        token: null,
        userId: "",
        msg: "",
        photo: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
