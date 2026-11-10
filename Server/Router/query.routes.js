import express from "express";

import {
  createQuery,getQueries} from "../Controller/query.controller.js";

const router = express.Router();

router.post("/", createQuery);
router.get("/", getQueries);

export default router;