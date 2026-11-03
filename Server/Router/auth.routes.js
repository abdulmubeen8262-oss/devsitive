import express from "express";
import authController from "../Controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register-user",authController.registerUser);
authRouter.post("/login",authController.loginUser);
authRouter.patch("/update-profile/:id",authController.updateProfile);



export default authRouter;