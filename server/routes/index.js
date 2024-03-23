const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const postController = require("../controllers/post_controller");
const commentController = require("../controllers/comment_controller");

router.get("/", homeController.home);
router.post("/auth", homeController.auth);
router.post("/register", homeController.register);
router.post("/login", homeController.login);
router.post("/new-post", postController.create);
router.post("/login-auth", postController.render);
router.get("/login-auth", postController.render);
router.post("/create-comment", commentController.create);
router.post("/render-comments", commentController.render);
router.post("/forgot-password", homeController.forgotPassword);
router.post("/reset-password", homeController.resetPassword);

module.exports = router;