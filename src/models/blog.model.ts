import { Schema, Types, model } from "mongoose";

interface blogInterface {
  title: String;
  slug: String;
  body: String;
  coverImage: String;
  featured: Boolean;
  author: {
    type: Types.ObjectId;
    ref: "User";
  };
  comments: [
    {
      type: Types.ObjectId;
      ref: "Comment";
    }
  ];

  likes: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];
  dislikes: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];

  topics: [
    {
      type: Types.ObjectId;
      ref: "Topic";
    }
  ];
}

const blogSchema = new Schema<blogInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
);

const Blog = model<blogInterface>("Blog", blogSchema);

export default Blog;
