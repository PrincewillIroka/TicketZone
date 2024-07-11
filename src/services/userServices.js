const APP_BACKEND = process.env.REACT_APP_BACKEND;

const getUserEvents = (payload) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/getUserEvents`;

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

export { getUserEvents };
