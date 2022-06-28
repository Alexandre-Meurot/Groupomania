import {Injectable} from "@angular/core";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: "root"
})

export class PostsService {
  // Récupération des posts sous la forme d'un tableau
  posts: Post[] = [
    {
      id: 1,
      title: 'Premier post',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/06/23/09/46/mountain-7279430_960_720.jpg',
      location: 'Quelque part',
      description: 'contenu textuel du post',
      createdDate: new Date(),
      likes: 6
    },
    {
      id: 2,
      title: 'Deuxième post',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/06/23/09/46/mountain-7279430_960_720.jpg',
      description: 'contenu textuel du deuxième post',
      createdDate: new Date(),
      likes: 18
    },
    {
      id: 3,
      title: 'Dernier post',
      imageUrl: 'https://cdn.pixabay.com/photo/2022/06/23/09/46/mountain-7279430_960_720.jpg',
      description: 'contenu textuel du dernier post',
      createdDate: new Date(),
      likes: 4
    },
  ];

  // méthode de récupération de tous les posts
  getAllPosts(): Post[] {
    return this.posts
  }

  // méthode de récupération d'un post en fonction de son ID
  getPostById(postId: number): Post {
    const post = this.posts.find(post => post.id === postId);
    if (!post) {
      throw new Error('Post not found!');
    } else {
      return post;
    }
  }

  // méthode de like de post en fonction de son ID
  likePostById(postId: number, likeType: 'like' | 'disLike'): void {
    const post = this.getPostById(postId)
    likeType === 'like' ? post.likes++ : post.likes--
  }

  // méthode d'ajout du nouveau post avec un ID valable
  addPost(formValue: { title: string, description: string, imageUrl: string, location: string }): void {
    const post: Post = {
      ...formValue,
      createdDate: new Date(),
      likes: 0,
      id: this.posts[this.posts.length - 1].id + 1
    };
    this.posts.push(post);
  }

}
