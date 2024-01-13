import { Schema, model } from "mongoose";

interface userInterface {
  name: String;
  userName: String;
  email: String;
  bio: String;
  password: String;
  profileImage: String;
  coverImage: String;
  Blogs: [
    {
      type: Schema.Types.ObjectId;
      ref: "Blog";
    }
  ];
  Followers: [
    {
      type: Schema.Types.ObjectId;
      ref: "User";
    }
  ];
  Following: [
    {
      type: Schema.Types.ObjectId;
      ref: "User";
    }
  ];
  comments: [
    {
      type: Schema.Types.ObjectId;
      ref: "Comment";
    }
  ];
  likedBlogs: [
    {
      type: Schema.Types.ObjectId;
      ref: "Blog";
    }
  ];
  dislikedBlogs: [
    {
      type: Schema.Types.ObjectId;
      ref: "Blog";
    }
  ];
  likedComments: [
    {
      type: Schema.Types.ObjectId;
      ref: "Comment";
    }
  ];
  dislikedComments: [
    {
      type: Schema.Types.ObjectId;
      ref: "Comment";
    }
  ];
  topicsFollowed: [
    {
      type: Schema.Types.ObjectId;
      ref: "Topic";
    }
  ];
}

const userSchema = new Schema<userInterface>(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://utfs.io/f/a530b22b-056d-45cd-b654-321c81330e2c-psn5nt.jpeg",
    },
    coverImage: {
      type: String,
      required: true,
      default:
        "https://utfs.io/f/59dc6f5f-1fbf-4f6d-a7be-898c2aaf45ea-xs78l3.jpg",
    },
    bio: { type: String, required: true, default: "No bio yet" },
    Blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    Followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    Following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    dislikedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    likedComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    dislikedComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    topicsFollowed: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    timestamps: true,
  }
);

const User = model<userInterface>("User", userSchema);

export default User;
