import { Router } from "express";
import { addBlog,editBlog,deleteBlog} from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";  
import { upload, } from "../middlewares/imageUpload.js";

const router=Router();

router.post("/addBlog",authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"),upload.single("image"),addBlog)
router.put("/editBlog/:id",authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"),upload.single("image"),editBlog)
router.put("/deleteBlog/:id",authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"),deleteBlog)

export default router;