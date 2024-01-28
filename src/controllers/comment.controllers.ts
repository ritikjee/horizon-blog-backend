import { Request, Response } from "express";
import Comment from "../models/comment.model";
import User from "../models/user.model";
import Blog from "../models/blog.model";

export async function addComments(req: Request, res: Response) {
  const response = await req.body;

  // TODO jwt verification
  const { body, userId, blogId } = response;

  if (!body || !userId || !blogId) {
    return res.status(400).send("Please fill all feilds");
  }

  const user = await User.findById(userId);
  const blog = await Blog.findById(blogId);

  if (!blog || !user) {
    return res
      .status(400)
      .send("Either blog does not exist or you are unauhorized");
  }

  const comment = await Comment.create({
    body,
    user: userId,
    blog: blogId,
  });

  user?.comments.push(comment._id as any);

  await user?.save();

  blog?.comments.push(comment._id as any);

  await blog?.save();

  return res.status(201).json(comment);
}
