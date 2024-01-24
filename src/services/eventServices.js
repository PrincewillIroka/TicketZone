const APP_BACKEND = process.env.REACT_APP_BACKEND;

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/categories`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

export { getCategories };
