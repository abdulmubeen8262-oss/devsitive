import express from "express";

import productRouter from "./product.routes.js";
import categoryRouter from "./category.routes.js";
import queryRouter from "./query.routes.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/queries", queryRouter);

export default router;































//import express from "express";

 //import userRouter from "./user.routes.js";
//import authRouter from "./auth.routes.js";

//const router = express.Router();

//router.use("/user",userRouter);
//router.use("/auth",authRouter);



//export default router;

