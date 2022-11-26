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
  subforum_id: number;
  created_at: Date;
  updated_at: Date;
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
  subforum_name: string;
}

export interface Vote {
  user_id: number;
  post_id: number;
  vote_value: number;
}
