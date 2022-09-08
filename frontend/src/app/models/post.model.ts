import {Comment} from "./comment.model";
import {Likes} from "./likes.model";

export class Post {
  id!: number;
  userId!: number;
  content!: string;
  media!: string;
  likes!: Likes[];
  comment!: Comment[];
  createdAt!: string;
  updatedAt!: string
}
