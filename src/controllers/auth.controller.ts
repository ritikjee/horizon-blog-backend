import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model";

export async function register(req: Request, res: Response) {
  const response = await req.body;
  const { email, name, username, password, profileImage } = response;
  if (!email || !name || !username || !password) {
    return res.status(500).send("Please fill all details");
  }

  try {
    const duplicateData = await User.find({ email: email });

    const duplicateUsername = await User.find({ userName: username });

    if (duplicateData.length != 0 || duplicateUsername.length != 0) {
      return res.status(409).send("Username or email already taken");
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      userName: username,
      email: email,
      password: hashedPassword,
      profileImage: profileImage,
    });

    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
}

export const login = async (req: Request, res: Response) => {
  const response = await req.body;

  const { identifier, password } = response;

  if (!identifier || !password) {
    return res.status(500).send("Please fill all details");
  }

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jsonwebtoken.sign(
      { id: user._id, username: user.userName },
      process.env.JWT_SECRET as string
    );

    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  const response = req.headers.authorization;

  const token = response as string;

  if (!token) {
    return res.status(403).send("Unauthorized");
  }

  const jwt: string = token.split(" ")[1];

  try {
    var decoded: any = undefined;

    try {
      decoded = jsonwebtoken.verify(jwt, process.env.JWT_SECRET as string);
    } catch (err) {
      return res.status(403).send("Unauthorized");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send({
      name: user.name,
      username: user.userName,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
