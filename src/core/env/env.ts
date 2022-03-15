export const env = {
  // API server
  API_SERVER: process.env.REACT_APP_API_SERVER ?? "",

  // authentication
  AUTH_AUTHORITY: process.env.REACT_APP_AUTH_AUTHORITY ?? "",
  AUTH_CLIENT_ID: process.env.REACT_APP_AUTH_CLIENT_ID ?? "",
  AUTH_REDIRECT_URI: process.env.REACT_APP_AUTH_REDIRECT_URI ?? "",
};
