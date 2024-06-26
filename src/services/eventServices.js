const APP_BACKEND = process.env.REACT_APP_BACKEND;

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/categories`;

    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        return reject(error);
      });
  });
};

const getEvents = (payload) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/events`;

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

const getEventsCategory = (payload) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/eventsCategory`;

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

const createEvent = (payload) => {
  return new Promise((resolve, reject) => {
    const url = `${APP_BACKEND}/api/createEvent`;

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

export { getCategories, getEvents, getEventsCategory, createEvent };
