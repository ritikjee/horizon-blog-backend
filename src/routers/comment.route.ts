import { Router } from "express";
import { addComments } from "../controllers/comment.controllers";

const commentRouter = Router();

commentRouter.post("/addComment", addComments);

export default commentRouter;
