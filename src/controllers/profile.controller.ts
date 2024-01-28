import { Request, Response } from "express";
import User from "../models/user.model";

export async function getProfile(req: Request, res: Response) {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ userName: userId })
      .select("-password")
      .populate("Blogs")
      .populate("comments")
      .populate("Followers")
      .populate("Following");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
