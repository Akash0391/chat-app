import { Router } from "express";
import { registerUser, loginUser, checkEmail } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-email", checkEmail);
    
export default router;