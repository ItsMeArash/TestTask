export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    payload: username,
  };
};

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    payload: password,
  };
};

export const setLoggedIn = (status) => {
  return {
    type: "SET_LOGGEDIN",
    payload: status,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
