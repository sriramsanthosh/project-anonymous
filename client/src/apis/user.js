const { BASE_URL } = require("./client");

const HOME = BASE_URL+"/";
const REGISTER = BASE_URL+"/register";
const LOGIN = BASE_URL+"/login";
const AUTH = BASE_URL+"/auth";
const NEWPOST = BASE_URL+"/new-post";
const RENDERPOST = BASE_URL+"/login-auth";
const CREATE_COMMENT = BASE_URL+"/create-comment"
const RENDER_COMMENTS = BASE_URL+"/render-comments"
const FORGOT_PASSWORD = BASE_URL+"/forgot-password"
const RESET_PASSWORD = BASE_URL+"/reset-password"

export {HOME, REGISTER , LOGIN, AUTH, NEWPOST, RENDERPOST, CREATE_COMMENT, RENDER_COMMENTS, FORGOT_PASSWORD, RESET_PASSWORD};