const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  // isLoggedIn: localStorage.getItem("userLogin")
  //   ? JSON.parse(localStorage.getItem("userLogin")).isLoggedIn
  //   : false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };

    case "SET_LOGGEDIN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "LOG_OUT":
      return {
        username: "",
        password: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
