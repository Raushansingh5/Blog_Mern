import { Router } from "express";
import { addCategory,getCategory,getDataByCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";  

const router=Router();

router.post("/addCategory",authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"),addCategory)
router.get("/getCategory",getCategory);

router.get("/getDataByCategory/:id",getDataByCategory);

export default router;
