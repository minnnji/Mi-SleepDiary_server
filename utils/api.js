const axios = require("axios").default;
const api = axios.create({
  headers: {
    "Client-ID": process.env.GOOGLE_CLIENT_ID
  }
});

const getAll = async() => {
  try {
    const { session } = await api.get("https://www.googleapis.com/fitness/v1/users/me/sessions");
    console.log(session);
  } catch(error) {
    console.log(error);
  }
};

module.exports = getAll;
