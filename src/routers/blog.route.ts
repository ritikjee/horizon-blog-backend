import { Router } from "express";
import {
  addblogs,
  getBlogbyId,
  getBlogs,
} from "../controllers/blog.contollers";

const blogroute = Router();

blogroute.post("/addblog", addblogs);
blogroute.get("/getblogs", getBlogs);
blogroute.get("/getblogbyid/:id", getBlogbyId);

export default blogroute;
