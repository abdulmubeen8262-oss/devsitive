import express from "express";
import userController from "../Controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/",userController.getAllUser);
userRouter.delete("/:id",userController.deleteUser);


export default userRouter;
