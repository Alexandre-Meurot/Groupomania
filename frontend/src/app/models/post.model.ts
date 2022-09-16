import {Comment} from "./comment.model";
import {Likes} from "./likes.model";

export class Post {
  id!: number;
  userId!: number;
  content!: string;
  media!: string;
  likes!: Likes[];
  Comments!: Comment[];
  User!: { username: string, picture: string }
  createdAt!: string;
  updatedAt!: string
}
