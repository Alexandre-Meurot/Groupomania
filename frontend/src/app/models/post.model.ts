import {Comment} from "./comment.model";

export class Post {
  id!: number;
  userId!: number;
  content!: string;
  media?: string;
  likes!: number;
  Comments!: Comment[];
  User!: { username: string, picture: string }
  createdAt!: string;
  updatedAt!: string
}
