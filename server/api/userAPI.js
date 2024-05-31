const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateUser,
  getUsers,
  deleteUser,
} = require("../controllers/user/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/update-password").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router
  .route("/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);

router
  .route("/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
