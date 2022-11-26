export interface User {
  id: number;
  username: string;
  password: string;
  tokens?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface Subforum {
  id: number;
  name: string;
  description: string;
  created_at?: Date;
}

export interface Moderator {
  user_id: number;
  subforum_id: number;
  created_at?: Date;
}

export interface ForumPost {
  id: number;
  type: 'text' | 'link';
  title: string;
  body: string;
  author_id: number;
  subreddit_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface PublicForumPost {
  id: number;
  type: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  votes: number;
  has_voted?: any;
  number_of_comments: number;
  author_name: string;
  subreddit_name: string;
}

export interface Comment {
  id: number;
  body: string;
  author_id: number;
  post_id: number;
  parent_comment_id: number;
  created_at: Date;
  updated_at: Date;
  // TODO: Check this
  subreddit_name: string;
}

export interface PublicComment {
  id: number;
  body: string;
  post_id: number;
  parent_comment_id?: any;
  created_at: Date;
  updated_at: Date;
  author_name: string;
  votes: number;
  has_voted?: any;
}

export interface Vote {
  user_id: number;
  post_id: number;
  vote_value: number;
}
