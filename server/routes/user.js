import { Router } from "express";
import {
  signup,
  login,
  checkCookie,
  logoutUser,
  getProfileData,
  changeUserPassword,
  changeAvatar,
  fetchFavouriteBlog,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/imageUpload.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/checkCookie", authMiddleware.verifyToken, checkCookie);

router.post("/logout", logoutUser);

router.get(
  "/getProfileData",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user", "admin"), 
  getProfileData
);

router.patch(
  "/changePassword",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  changeUserPassword
);

router.put(
  "/changeAvatar",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  upload.single("image"),
  changeAvatar
);

router.get(
  "/fetchFavouriteBlog",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  fetchFavouriteBlog
);

export default router;
