const APP_BACKEND = process.env.REACT_APP_BACKEND;

const userLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/login`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

const userSignUp = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/signUp`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

export { userLogin, userSignUp };
