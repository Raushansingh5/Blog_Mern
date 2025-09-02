import { Router } from "express";
import {fetchAllBlog,fetchRecentBlog,getCurrentBlog,addToFav, removeToFav} from "../controllers/blogController.js"
import authMiddleware from "../middlewares/authMiddleware.js";
const router=Router();

router.get("/fetchAllBlog",fetchAllBlog)
router.get("/fetchRecentBlog",fetchRecentBlog)
router.get("/getCurrentBlog/:id",getCurrentBlog)
router.put("/addToFav/:id",authMiddleware.verifyToken,authMiddleware.authorizeRole("user"),addToFav)
router.put("/removeToFav/:id",authMiddleware.verifyToken,authMiddleware.authorizeRole("user"),removeToFav)



export default router;
