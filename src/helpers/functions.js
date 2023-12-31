export const validate = (data) => {
  const errors = {};

  // Patterns
  const usernameLengthRegex = /^.{3,20}$/;
  const usernameCharacterRegex = /^[a-zA-Z0-9_-]+$/;

  const passwordLengthRegex = /^.{8,32}$/;
  const containsUpperCaseRegex = /^(?=.*[A-Z])/;


  // Check username
  if (!data.username) {
    errors.username = "Username is required";
  } else if (!usernameLengthRegex.test(data.username)) {
    errors.username = "Username must be between 3 and 20 characters";
  } else if (!usernameCharacterRegex.test(data.username)) {
    errors.username = "Username can only contain letters, numbers, and underscores";
  }

  // Check password
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!passwordLengthRegex.test(data.password)) {
    errors.password = "Password must be between 8 and 32 characters";
  } else if (!containsUpperCaseRegex.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  }

  return errors;
};

export const fetchQuote = (setQuote) => {
  fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(`${data.content} - ${data.author}`);
      })
      .catch((error) => console.log(error));
}