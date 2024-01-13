import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import cors from "cors";
import authroute from "./routers/auth.route";

dotenv.config();

connectDB();

const app: Express = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authroute);

app.listen(Port, () => console.log(`listening on port ${Port}`));
