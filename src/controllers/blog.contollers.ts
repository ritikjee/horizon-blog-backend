import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import Blog from "../models/blog.model";
import User from "../models/user.model";

export async function addblogs(req: Request, res: Response) {
  const response = await req.body;
  const userName = req.query.username;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || !userName) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const userToken: any = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (userToken.username !== userName) {
      return res.status(403).send("Unauthorized");
    }

    const blog = await Blog.create({
      title: response.title,
      slug: response.slug,
      body: response.blog,
      coverImage: response.profileImage as string,
      author: userToken.id,
    });

    await blog.save();
    const blogId = blog._id;

    const user = await User.findById(userToken.id);

    user?.Blogs.push(blogId as any);

    await user?.save();

    return res.status(201).send(blog);
  } catch (error) {
    console.log(error);

    return res.status(403).send("Unauthorized");
  }
}

export async function getBlogs(req: Request, res: Response) {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return res.status(200).send(blogs);
}

export async function getBlogbyId(req: Request, res: Response) {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId)
      .populate("author")
      .populate("comments");

    return res.status(200).send(blog);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Blog not found");
  }
}
