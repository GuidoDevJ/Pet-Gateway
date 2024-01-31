import dotenv from "dotenv";
dotenv.config();
export default {
  urls: {
    authService: process.env.URL_AUTH_SERVICE,
    permited: process.env.URL_PERMITTED,
  },
};
