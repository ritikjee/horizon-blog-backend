import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";

const profileRouter = Router();

profileRouter.get("/getProfile/:id", getProfile);

export default profileRouter;
