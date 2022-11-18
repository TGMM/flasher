export interface User {
  id: number;
  username: string;
  password: string;
  tokens?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface Subreddit {
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
