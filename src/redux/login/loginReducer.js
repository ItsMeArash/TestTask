const initialState = {
  username: "",
  password: "",
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

    default:
      return state;
  }
};

export default loginReducer;