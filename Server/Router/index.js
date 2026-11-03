import express from "express";

import userRouter from "./user.js";
import authRouter from "./auth.routes.js";


const router = express.Router();

router.use("/user",userRouter);
router.use("/auth",authRouter);




export default router;

