import { Router } from "express";
import { getUserDetail, login, register } from "../controllers/auth.controller";

const authroute = Router();

authroute.post("/sign-up", register);
authroute.post("/sign-in", login);
authroute.get("/user/me", getUserDetail);

export default authroute;
